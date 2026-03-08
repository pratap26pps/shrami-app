import { useEffect, useState } from "react";
import axios from "axios";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
  TextInput,
} from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { API_BASE } from "../../config/api";

function formatDate(dateStr) {
  if (!dateStr) return "—";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function truncateId(str, len = 12) {
  if (!str || str.length <= len) return str || "—";
  return str.slice(0, 6) + "..." + str.slice(-6);
}

function formatAmount(amount) {
  if (amount == null) return "—";
  const num = Number(amount);
  const rupees = num >= 100 ? num / 100 : num;
  return `₹${Math.round(rupees).toLocaleString("en-IN")}`;
}

function filterOrders(orders, query) {
  if (!query || !query.trim()) return orders;
  const q = query.trim().toLowerCase();
  return orders.filter(
    (o) =>
      (o.customerName && o.customerName.toLowerCase().includes(q)) ||
      (o.customerMobile && o.customerMobile.includes(q)) ||
      (o.razorpayOrderId && o.razorpayOrderId.toLowerCase().includes(q)) ||
      (o.razorpayPaymentId && o.razorpayPaymentId.toLowerCase().includes(q)) ||
      (o.amount != null && String(o.amount).includes(q)) ||
      (formatAmount(o.amount).toLowerCase().includes(q))
  );
}

export function PaymentHistory() {
  const navigation = useNavigation();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getOrders();
  }, []);

  const filteredOrders = filterOrders(orders, searchQuery);

  const getOrders = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/worker/getOrders`);
      setOrders(res.data?.orders || []);
    } catch (err) {
      console.log("Failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const toggleExpand = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("../../assets/redlogo.png")}
          resizeMode="contain"
          style={styles.logo}
        />
        <TouchableOpacity
          style={styles.profileIcon}
          onPress={() => navigation.navigate("Profile")}
          activeOpacity={0.8}
        >
          <Feather name="user" size={22} color="#E53935" />
        </TouchableOpacity>
      </View>

      <View style={styles.searchRow}>
        <View style={styles.searchBar}>
          <Feather name="search" size={18} color="#9CA3AF" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by name, mobile, amount..."
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={setSearchQuery}
            returnKeyType="search"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity
              onPress={() => setSearchQuery("")}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              style={styles.clearBtn}
            >
              <Feather name="x" size={18} color="#9CA3AF" />
            </TouchableOpacity>
          )}
        </View>
       
      </View>

      <Text style={styles.pageTitle}>Payment History</Text>

      {loading ? (
        <View style={styles.centerBox}>
          <ActivityIndicator size="large" color="#E53935" />
          <Text style={styles.loadingText}>Loading payments...</Text>
        </View>
      ) : orders.length === 0 ? (
        <View style={styles.centerBox}>
          <Feather name="credit-card" size={48} color="#ccc" />
          <Text style={styles.emptyText}>No payments yet</Text>
        </View>
      ) : filteredOrders.length === 0 ? (
        <View style={styles.centerBox}>
          <Feather name="search" size={48} color="#ccc" />
          <Text style={styles.emptyText}>No matching payments</Text>
          <Text style={styles.emptyHint}>Try a different search term</Text>
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
          {filteredOrders.map((order) => {
            const isExpanded = expandedId === order._id;
            const status = order.paymentStatus || "pending";
            return (
              <TouchableOpacity
                key={order._id}
                style={styles.paymentCard}
                onPress={() => toggleExpand(order._id)}
                activeOpacity={0.9}
              >
                <View style={styles.cardMain}>
                  <View style={styles.cardLeft}>
                    <Text style={styles.paidTo}>Paid To</Text>
                    <Text style={styles.name}>{order.customerName || "Guest User"}</Text>
                    <Text style={styles.date}>{formatDate(order.createdAt)}</Text>
                    {order.customerMobile ? (
                      <Text style={styles.mobile}>📱 {order.customerMobile}</Text>
                    ) : null}
                  </View>
                  <View style={styles.cardRight}>
                    <View style={[styles.statusBadge, styles[`status_${status}`]]}>
                      <Text
                        style={[
                          styles.statusText,
                          {
                            color:
                              status === "completed"
                                ? "#15803D"
                                : status === "failed"
                                ? "#B91C1C"
                                : "#B45309",
                          },
                        ]}
                      >
                        {status}
                      </Text>
                    </View>
                    <Text style={styles.amount}>{formatAmount(order.amount)}</Text>
                  </View>
                </View>

                {isExpanded && (
                  <View style={styles.detailSection}>
                    <View style={styles.detailDivider} />
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Customer Mobile</Text>
                      <Text style={styles.detailValue}>{order.customerMobile || "—"}</Text>
                    </View>
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Payment Status</Text>
                      <Text
                        style={[
                          styles.detailValue,
                          {
                            color:
                              status === "completed"
                                ? "#16A34A"
                                : status === "failed"
                                ? "#DC2626"
                                : "#D97706",
                          },
                        ]}
                      >
                        {status}
                      </Text>
                    </View>
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Razorpay Order ID</Text>
                      <Text style={styles.detailValue} numberOfLines={1}>
                        {truncateId(order.razorpayOrderId)}
                      </Text>
                    </View>
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Razorpay Payment ID</Text>
                      <Text style={styles.detailValue} numberOfLines={1}>
                        {truncateId(order.razorpayPaymentId)}
                      </Text>
                    </View>
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Signature</Text>
                      <Text style={styles.detailValueSmall} numberOfLines={1}>
                        {truncateId(order.razorpaySignature, 16)}
                      </Text>
                    </View>
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Created</Text>
                      <Text style={styles.detailValue}>{formatDate(order.createdAt)}</Text>
                    </View>
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Updated</Text>
                      <Text style={styles.detailValue}>{formatDate(order.updatedAt)}</Text>
                    </View>
                  </View>
                )}

                <View style={styles.expandHint}>
                  <Feather
                    name={isExpanded ? "chevron-up" : "chevron-down"}
                    size={18}
                    color="#9CA3AF"
                  />
                  <Text style={styles.expandText}>
                    {isExpanded ? "Less" : "More details"}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      )}
    </View>
  );
}
const COLORS = {
  bg: "#FDF2F2",
  card: "#fff",
  primary: "#E53935",
  textDark: "#1F2937",
  textLight: "#6B7280",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
    paddingHorizontal: 20,
    paddingTop: 48,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    width: 110,
    height: 40,
  },
  profileIcon: {
    width: 48,
    height: 48,
    backgroundColor: "#FFF5F5",
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    ...Platform.select({
      android: { elevation: 3 },
      ios: {
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.12,
        shadowRadius: 4,
      },
    }),
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  searchBar: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    height: 48,
    backgroundColor: COLORS.card,
    borderRadius: 24,
    paddingHorizontal: 16,
    ...Platform.select({
      android: { elevation: 2 },
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.06,
        shadowRadius: 4,
      },
    }),
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: COLORS.textDark,
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  clearBtn: {
    padding: 4,
  },
  filterBtn: {
    width: 48,
    height: 48,
    backgroundColor: COLORS.primary,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 12,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: COLORS.textDark,
    marginBottom: 20,
  },
  centerBox: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  loadingText: {
    marginTop: 12,
    color: COLORS.textLight,
    fontSize: 15,
  },
  emptyText: {
    marginTop: 12,
    color: COLORS.textLight,
    fontSize: 16,
  },
  emptyHint: {
    marginTop: 6,
    color: "#9CA3AF",
    fontSize: 14,
  },
  scroll: {
    flex: 1,
  },
  paymentCard: {
    backgroundColor: COLORS.card,
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    ...Platform.select({
      android: { elevation: 4 },
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
      },
    }),
  },
  cardMain: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  cardLeft: {
    flex: 1,
  },
  cardRight: {
    alignItems: "flex-end",
  },
  paidTo: {
    color: COLORS.textLight,
    fontSize: 12,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  name: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.textDark,
    marginBottom: 4,
  },
  date: {
    fontSize: 13,
    color: COLORS.textLight,
    marginBottom: 4,
  },
  mobile: {
    fontSize: 13,
    color: COLORS.textLight,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 8,
  },
  status_completed: {
    backgroundColor: "#DCFCE7",
  },
  status_pending: {
    backgroundColor: "#FEF3C7",
  },
  status_failed: {
    backgroundColor: "#FEE2E2",
  },
  statusText: {
    fontSize: 11,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  amount: {
    fontSize: 22,
    fontWeight: "800",
    color: COLORS.primary,
  },
  detailSection: {
    marginTop: 16,
    paddingTop: 16,
  },
  detailDivider: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  detailLabel: {
    fontSize: 12,
    color: "#9CA3AF",
    fontWeight: "600",
    flex: 1,
  },
  detailValue: {
    fontSize: 13,
    color: COLORS.textDark,
    fontWeight: "500",
    flex: 1,
    textAlign: "right",
  },
  detailValueSmall: {
    fontSize: 11,
    color: "#6B7280",
    flex: 1,
    textAlign: "right",
  },
  expandHint: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
  },
  expandText: {
    fontSize: 13,
    color: "#9CA3AF",
    marginLeft: 6,
    fontWeight: "500",
  },
});
