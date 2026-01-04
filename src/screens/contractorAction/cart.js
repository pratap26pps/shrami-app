import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";

export default function CheckoutScreen() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>SHRAM!</Text>
        <Ionicons name="person-circle" size={42} color="#E53935" />
      </View>

      {/* Checkout Title */}
      <View style={styles.checkoutBar}>
        <Ionicons name="arrow-back" size={22} color="#000" />
        <Text style={styles.checkoutText}>Checkout</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Cart Card */}
        <View style={styles.card}>
          <View style={styles.cartTitle}>
            <Feather name="shopping-cart" size={16} color="#E53935" />
            <Text style={styles.cartText}>Items In Cart</Text>
          </View>

          {[1, 2].map((_, i) => (
            <View key={i} style={styles.cartItem}>
              <View style={styles.avatar} />

              <View style={{ flex: 1 }}>
                <Text style={styles.category}>Category Name</Text>
                <Text style={styles.details}>see details...</Text>
              </View>

              <View style={styles.qtyBox}>
                <Text style={styles.qtyBtn}>-</Text>
                <Text style={styles.qty}>1</Text>
                <Text style={styles.qtyBtn}>+</Text>
              </View>
            </View>
          ))}

          <Text style={styles.hire}>HIRE</Text>
        </View>

        {/* Bill Details */}
        <View style={styles.card}>
          <Text style={styles.billTitle}>Bill Details</Text>

          <View style={styles.billRow}>
            <Text>Items total</Text>
            <Text>5458</Text>
          </View>

          <View style={styles.billRow}>
            <Text>Platform Fees</Text>
            <Text>45</Text>
          </View>

          <View style={styles.billRow}>
            <Text>GST</Text>
            <Text>300</Text>
          </View>

          <View style={styles.totalBar}>
            <View>
              <Text style={styles.totalAmount}>₹300</Text>
              <Text style={styles.totalLabel}>Total</Text>
            </View>

            <TouchableOpacity style={styles.placeOrder}>
              <Text style={styles.placeOrderText}>Place Order →</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
 
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
