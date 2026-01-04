 
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

 
 export function PaymentHistory() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>SHRAM!</Text>
        <Ionicons name="person-circle" size={42} color="#E53935" />
      </View>

      {/* Search */}
      <View style={styles.searchRow}>
        <View style={styles.searchBar} />
        <View style={styles.filterBtn}>
          <Ionicons name="options" size={20} color="#fff" />
        </View>
      </View>

      <Text style={styles.pageTitle}>Payment History</Text>

      <ScrollView showsVerticalScrollIndicator={false}>
        {[1, 2, 3, 4, 5].map((_, i) => (
          <View key={i} style={styles.paymentCard}>
            <View>
              <Text style={styles.paidTo}>Paid To</Text>
              <Text style={styles.name}>Name</Text>
              <Text style={styles.date}>21/12/2025</Text>
            </View>

            <Text style={styles.amount}>2000</Text>
          </View>
        ))}
      </ScrollView>

      {/* <BottomNav /> */}
    </View>
  );
}
const COLORS = {
  bg: "#EEDADA",
  card: "#FFF6F6",
  primary: "#E53935",
  textDark: "#111",
  textLight: "#777",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
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
    fontWeight: "800",
    color: COLORS.primary,
  },

  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 15,
  },

  searchBar: {
    flex: 1,
    height: 45,
    backgroundColor: "#fff",
    borderRadius: 25,
  },

  filterBtn: {
    width: 45,
    height: 45,
    backgroundColor: COLORS.primary,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },

  pageTitle: {
    fontSize: 26,
    fontWeight: "800",
    color: COLORS.textDark,
    marginBottom: 10,
  },

  card: {
    backgroundColor: COLORS.card,
    borderRadius: 20,
    padding: 15,
    marginBottom: 15,
  },

  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },

  taskTitle: {
    fontSize: 16,
    fontWeight: "700",
  },

  update: {
    color: COLORS.primary,
    fontWeight: "700",
  },

  progressRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  stepActive: {
    backgroundColor: COLORS.primary,
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 14,
  },

  step: {
    borderWidth: 2,
    borderColor: COLORS.primary,
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 14,
  },

  stepTextActive: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "700",
  },

  stepText: {
    color: COLORS.primary,
    fontSize: 10,
    fontWeight: "700",
  },

  line: {
    height: 2,
    flex: 1,
    backgroundColor: COLORS.primary,
  },

  paymentCard: {
    backgroundColor: COLORS.card,
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  paidTo: {
    color: COLORS.textLight,
    fontSize: 12,
  },

  name: {
    fontSize: 18,
    fontWeight: "800",
  },

  date: {
    fontSize: 12,
    color: COLORS.textLight,
  },

  amount: {
    fontSize: 22,
    fontWeight: "800",
    color: COLORS.primary,
  },

  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 14,
    backgroundColor: COLORS.card,
    borderRadius: 30,
    marginBottom: 10,
  },
});
