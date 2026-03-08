import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import RazorpayCheckout from "react-native-razorpay";
import { API_BASE } from "../config/api";

const RazorpayPayment = ({
  amount,
  orderData,
  onSuccess,
  onFailure,
  onClose,
  customerInfo,
  visible,
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("pending");

  const handlePayment = async () => {
    try {
      const amt = Number(amount) || 0;
      if (amt < 1) {
        Alert.alert("Invalid Amount", "Amount must be at least ₹1");
        return;
      }
      setIsProcessing(true);
      setPaymentStatus("processing");

      const payload = {
        amount: amt,
        receipt: `order_${Date.now()}`,
        notes: {
          orderId: orderData?.orderId,
          customerId: customerInfo?.id || customerInfo?._id,
          customerName: customerInfo?.fullName,
        },
      };
      console.log("[CreateOrder] API URL:", `${API_BASE}/api/worker/CreateOrder`);
      console.log("[CreateOrder] Request payload:", payload);

      const orderResponse = await fetch(
        `${API_BASE}/api/worker/CreateOrder`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      console.log("[CreateOrder] Response status:", orderResponse.status);

      let orderResult;
      try {
        orderResult = await orderResponse.json();
      } catch (_) {
        console.error("[CreateOrder] BUG: Response is not valid JSON");
        throw new Error("Invalid response from server. Check if backend is running.");
      }
      console.log("[CreateOrder] Response body:", orderResult);

      if (!orderResult.success) {
        const errMsg = orderResult.razorpayError || orderResult.error || orderResult.message || "Order creation failed";
        console.warn("[CreateOrder] BUG - Failed:", errMsg);
        console.warn("[CreateOrder] BUG - Full response:", JSON.stringify(orderResult));
        console.warn("[CreateOrder] BUG - razorpayError:", orderResult.razorpayError);
        console.warn("[CreateOrder] BUG - error:", orderResult.error);
        console.warn("[CreateOrder] BUG - razorpayStatusCode:", orderResult.razorpayStatusCode);
        Alert.alert("Order Error", errMsg);
        throw new Error(errMsg);
      }

      const options = {
        description: "Shrami Payment",
        currency: orderResult.data.currency,
        key: orderResult.data.key_id,
        amount: orderResult.data.amount,
        order_id: orderResult.data.orderId,
        name: "Shrami",
        prefill: {
          name: customerInfo?.fullName || customerInfo?.name || "Customer",
          contact: String(customerInfo?.ContactNumber || customerInfo?.phone || "9999999999"),
        },
        theme: { color: "#059669" },
      };

      RazorpayCheckout.open(options)
        .then(async (response) => {
          try {
            const verifyResponse = await fetch(
              `${API_BASE}/api/worker/VerifyPayments`,
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                  order_id: orderData?._id || orderData?.id || response.razorpay_order_id,
                  amount: orderResult.data.amount,
                  customerName: customerInfo?.fullName || customerInfo?.name || "Customer",
                  customerMobile: String(customerInfo?.ContactNumber || customerInfo?.phone || "0000000000"),
                }),
              }
            );

            let verifyResult;
            try {
              verifyResult = await verifyResponse.json();
            } catch (_) {
              throw new Error("Invalid response from server during verification.");
            }

            if (!verifyResponse.ok) {
              throw new Error(verifyResult.message || "Verification request failed.");
            }

            if (verifyResult.success) {
              setIsProcessing(false);
              setPaymentStatus("success");
              Alert.alert("Success", "Payment Successful!");
              onSuccess({
                ...response,
                orderId: orderData?._id || orderData?.id,
                amount,
              });
            } else {
              throw new Error(verifyResult.message);
            }
          } catch (err) {
            setPaymentStatus("failed");
            Alert.alert("Error", "Verification failed!");
            onFailure(err);
          }
        })
        .catch((error) => {
          setIsProcessing(false);
          setPaymentStatus("failed");
          Alert.alert("Payment Cancelled", error.description || "User cancelled payment");
          onFailure(error);
        });
    } catch (err) {
      setPaymentStatus("failed");
      setIsProcessing(false);
      Alert.alert("Error", err.message || "Payment initiation failed");
      onFailure(err);
    }
  };

  const renderStatusIcon = () => {
    if (paymentStatus === "processing")
      return <ActivityIndicator size="large" color="#3b82f6" />;
    if (paymentStatus === "success")
      return (
        <View style={{ alignItems: "center" }}>
          <Text>Processing</Text>
        </View>
      );
    if (paymentStatus === "failed")
      return (
        <View style={{ alignItems: "center" }}>
          <Text>Failed</Text>
        </View>
      );
    return (
      <View style={{ alignItems: "center" }}>
        <Text>Loading</Text>
      </View>
    );
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.card}>
          <View style={styles.header}>
            {renderStatusIcon()}
            <Text style={styles.title}>
              {paymentStatus === "success" ? "Payment Successful" : "Secure Payment"}
            </Text>
            <Text style={styles.subtitle}>
              {paymentStatus === "pending"
                ? "Ready to process your payment"
                : paymentStatus === "processing"
                ? "Processing your payment..."
                : paymentStatus === "success"
                ? "Payment completed successfully!"
                : "Payment failed. Try Again."}
            </Text>
          </View>

          {paymentStatus === "pending" && (
            <View style={styles.details}>
              <Text>Amount: ₹{amount}</Text>
              <Text>Order ID: {orderData?.orderId}</Text>
              <Text>Customer: {customerInfo?.fullName}</Text>
        
              <Text>Phone: {customerInfo?.ContactNumber}</Text>
            </View>
          )}

          <View style={styles.actions}>
            {paymentStatus === "pending" && (
              <>
                <TouchableOpacity
                  style={styles.cancelBtn}
                  onPress={() => {
                    onClose();
                  }}
                >
                  <Text style={styles.cancelText}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.payBtn, isProcessing && { opacity: 0.7 }]}
                  onPress={handlePayment}
                  disabled={isProcessing}
                >
                  <Text style={styles.payText}>
                    {isProcessing ? "Processing..." : "Pay Now"}
                  </Text>
                </TouchableOpacity>
              </>
            )}

            {paymentStatus === "success" && (
              <TouchableOpacity style={styles.successBtn} onPress={() => onSuccess({ amount })}>
                <Text style={styles.successText}>Continue</Text>
              </TouchableOpacity>
            )}

            {paymentStatus === "failed" && (
              <>
                <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
                  <Text style={styles.cancelText}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.payBtn}
                  onPress={() => {
                    setPaymentStatus("pending");
                    setIsProcessing(false);
                  }}
                >
                  <Text style={styles.payText}>Try Again</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default RazorpayPayment;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 20,
    width: "100%",
    maxWidth: 400,
  },
  header: { alignItems: "center", marginBottom: 16 },
  title: { fontSize: 20, fontWeight: "bold", marginTop: 8 },
  subtitle: { color: "gray", textAlign: "center", marginTop: 4 },
  details: { marginVertical: 12, gap: 4 },
  actions: { flexDirection: "row", justifyContent: "space-between", marginTop: 12, gap: 10 },
  cancelBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
  },
  cancelText: { color: "gray" },
  payBtn: {
    flex: 1,
    backgroundColor: "#059669",
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
  },
  payText: { color: "white", fontWeight: "bold" },
  successBtn: {
    flex: 1,
    backgroundColor: "green",
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
  },
  successText: { color: "white", fontWeight: "bold" },
});
