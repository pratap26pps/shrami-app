import { useState}  from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import RazorpayPayment from "../../components/RazorpayPayment";
import { useContext } from "react";
import { HireContext } from "../../context/HireContext";
import { AuthContext } from "../../context/AuthContext";
export default function CheckoutScreen() {
  const navigation = useNavigation();
  const [showPay, setShowPay] = useState(false);
  const { hiredWorkers, clearCart, removeWorkerAt } = useContext(HireContext);
  const { user } = useContext(AuthContext);

  const itemsTotal = hiredWorkers.reduce((sum, w) => sum + (Number(w.price) || 0), 0);
  const platformFees = 45;
  const gst = Math.round(itemsTotal * 0.05) || 0;
  const totalAmount = itemsTotal + platformFees + gst;

  const orderData = {
    orderId: "TEMP1234567",
    id: "TEMP1234567",
  };

  const handlePaymentSuccess = () => {
    setShowPay(false);
    clearCart();
    navigation.navigate("Payment");
  };

  if (hiredWorkers.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.logo}>SHRAM!</Text>
          <Ionicons name="person-circle" size={42} color="#E53935" />
        </View>
        <View style={styles.checkoutBar}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={22} color="#000" />
          </TouchableOpacity>
          <Text style={styles.checkoutText}>Checkout</Text>
        </View>
        <View style={[styles.card, { alignItems: "center", paddingVertical: 40 }]}>
          <Feather name="shopping-cart" size={48} color="#ccc" />
          <Text style={styles.cartText}>Your cart is empty</Text>
          <Text style={{ color: "#777", marginTop: 8 }}>Add labour from Home or Make Labour Team</Text>
          <TouchableOpacity
            style={{ marginTop: 20, paddingVertical: 12, paddingHorizontal: 24, backgroundColor: "#E53935", borderRadius: 24 }}
            onPress={() => navigation.navigate("Tabs")}
          >
            <Text style={{ color: "#fff", fontWeight: "bold" }}>Go to Home</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>SHRAM!</Text>
        <Ionicons name="person-circle" size={42} color="#E53935" />
      </View>

      {/* Checkout Title */}
      <View style={styles.checkoutBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color="#000" />
        </TouchableOpacity>
        <Text style={styles.checkoutText}>Checkout</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Cart Card */}
        <View style={styles.card}>
          <View style={styles.cartTitle}>
            <Feather name="shopping-cart" size={16} color="#E53935" />
            <Text style={styles.cartText}>Items In Cart</Text>
          </View>
            {hiredWorkers.map((w, i) => (
              <View key={w._id || w.id || i} style={styles.cartItem}>
                <View style={styles.avatar} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.category}>{w.name}</Text>
                  <Text style={styles.details}>{w.skills || "—"} · ₹{w.price ?? "—"}</Text>
                </View>
                <Text style={styles.qty}>1</Text>
                <TouchableOpacity
                  style={styles.removeBtn}
                  onPress={() => removeWorkerAt(i)}
                  hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
                >
                  <Ionicons name="trash-outline" size={22} color="#E53935" />
                </TouchableOpacity>
              </View>
            ))}

          <Text style={styles.hire}>HIRE</Text>
        </View>

        {/* Bill Details */}
        <View style={styles.card}>
          <Text style={styles.billTitle}>Bill Details</Text>

          <View style={styles.billRow}>
            <Text>Items total ({hiredWorkers.length})</Text>
            <Text>₹ {itemsTotal}</Text>
          </View>

          <View style={styles.billRow}>
            <Text>Platform Fees</Text>
            <Text>₹ {platformFees}</Text>
          </View>

          <View style={styles.billRow}>
            <Text>GST</Text>
            <Text>₹ {gst}</Text>
          </View>

          <View style={styles.totalBar}>
            <View>
              <Text style={styles.totalAmount}>₹ {totalAmount}</Text>
              <Text style={styles.totalLabel}>Total</Text>
            </View>

            <TouchableOpacity
              style={styles.placeOrder}
              onPress={() => setShowPay(true)}
            >
              <Text style={styles.placeOrderText}>Place Order →</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <RazorpayPayment
        visible={showPay}
        amount={totalAmount}
        orderData={orderData}
        customerInfo={{ ...user }}
        onSuccess={(data) => {
          console.log("paid", data);
          handlePaymentSuccess();
        }}
        onFailure={(err) => {
          console.log("err", err);
          setShowPay(false);
        }}
        onClose={() => setShowPay(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EEDADA",
    paddingHorizontal: 16,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 50,
  },

  logo: {
    fontSize: 26,
    fontWeight: "900",
    color: "#E53935",
  },

  checkoutBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginVertical: 15,
  },

  checkoutText: {
    fontSize: 18,
    fontWeight: "800",
    marginLeft: 10,
  },

  card: {
    backgroundColor: "#FFF6F6",
    borderRadius: 20,
    padding: 16,
    marginBottom: 15,
  },

  cartTitle: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },

  cartText: {
    fontWeight: "700",
    marginLeft: 8,
  },

  cartItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },

  avatar: {
    width: 50,
    height: 50,
    backgroundColor: "#DDD",
    borderRadius: 12,
    marginRight: 10,
  },

  category: {
    fontSize: 14,
    fontWeight: "700",
  },

  details: {
    fontSize: 12,
    color: "#E53935",
  },

  qtyBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E53935",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },

  qtyBtn: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "800",
    marginHorizontal: 6,
  },

  qty: {
    color: "#FFF",
    fontWeight: "800",
    marginRight: 8,
  },

  removeBtn: {
    padding: 8,
    marginLeft: 4,
  },

  hire: {
    textAlign: "center",
    color: "#E53935",
    fontSize: 20,
    fontWeight: "900",
    marginTop: 10,
  },

  billTitle: {
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 10,
  },

  billRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 4,
  },

  totalBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#4F8A2B",
    borderRadius: 15,
    padding: 14,
    marginTop: 15,
  },

  totalAmount: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "900",
  },

  totalLabel: {
    color: "#FFF",
    fontSize: 12,
  },

  placeOrder: {
    backgroundColor: "#3E7320",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 12,
  },

  placeOrderText: {
    color: "#FFF",
    fontWeight: "700",
  },

  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#FFF6F6",
    borderRadius: 30,
    paddingVertical: 12,
    marginBottom: 10,
  },
});
