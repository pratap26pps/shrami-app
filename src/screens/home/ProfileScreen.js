import { View, Text, Image, TouchableOpacity, StyleSheet, Platform } from "react-native";
import { Alert } from "react-native";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

export default function ProfileScreen() {
  const { logout, user, loading } = useContext(AuthContext);
  const navigation = useNavigation();
  const logouthandler = async () => {
    try {
      // Optional backend logout (recommended)
      // await fetch(
      //   "https://shrami-backend.onrender.com/api/auth/LogoutHandler",
      //   {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //   }
      // );

      // ✅ Clear token from SecureStore + Context
      await logout();

      Alert.alert("Logged out", "You have been logged out successfully");
    } catch (error) {
      console.log("LOGOUT ERROR 👉", error.message);
      Alert.alert("Error", "Logout failed");
    }
  };
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={require("../../assets/redlogo.png")}
          resizeMode="contain"
          style={styles.logo}
        />
        <TouchableOpacity style={styles.profileIcon} onPress={logouthandler} activeOpacity={0.8}>
          <Feather name="log-out" size={20} color="#E53935" />
        </TouchableOpacity>
      </View>

      {/* Profile */}
      <View style={styles.profileSection}>
        <View style={styles.avatarWrap}>
          <Image
            source={
              user?.profilePhoto && (user.profilePhoto.startsWith("http") || user.profilePhoto.startsWith("https"))
                ? { uri: user.profilePhoto }
                : require("../../assets/images/profile.png")
            }
            style={styles.avatar}
          />
          <View style={styles.verifiedBadge}>
            <Feather name="check" size={12} color="#fff" />
          </View>
        </View>
        {loading ? (
          <Text style={styles.name}>Loading...</Text>
        ) : (
          <>
            <Text style={styles.name}>{user?.fullName ?? "User"}</Text>
            {(user?.ContactNumber || user?.email) && (
              <Text style={styles.contact}>{user?.ContactNumber || user?.email}</Text>
            )}
            <View style={styles.verifiedRow}>
              <Feather name="shield" size={14} color="#0D9488" />
              <Text style={[styles.verifiedText, { marginLeft: 6 }]}>Verified</Text>
            </View>
          </>
        )}
      </View>

      {/* Cards */}
      <View style={styles.cardsRow}>
        {[
          { id: 1, label: "Cart", icon: require("../../assets/images/cart.png"), screen: "CheckoutScreen" },
          { id: 2, label: "Payments", icon: require("../../assets/images/payments.png"), screen: "Payment" },
          { id: 3, label: "About Us", icon: require("../../assets/images/workstatus.png"), screen: "AboutUs" },
          { id: 4, label: "Hired", icon: require("../../assets/images/hired.png"), screen: "HiredWorkers" },
        ].map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.card}
            onPress={() => navigation.navigate(item.screen)}
            activeOpacity={0.7}
          >
            <View style={styles.cardIconWrap}>
              <Image source={item.icon} resizeMode="contain" style={styles.cardIcon} />
            </View>
            <Text style={styles.cardText}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const CARD_GAP = 14;
const CARD_WIDTH = "48%";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDF2F2",
    padding: 20,
    paddingTop: 48,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 32,
  },
  logo: {
    width: 100,
    height: 36,
  },
  profileIcon: {
    width: 48,
    height: 48,
    backgroundColor: "#FFF5F5",
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: "#E53935",
    alignItems: "center",
    justifyContent: "center",
    ...Platform.select({
      android: { elevation: 3 },
      ios: {
        shadowColor: "#E53935",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.12,
        shadowRadius: 4,
      },
    }),
  },
  profileSection: {
    alignItems: "center",
    marginBottom: 36,
  },
  avatarWrap: {
    position: "relative",
    marginBottom: 14,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: "#E53935",
  },
  verifiedBadge: {
    position: "absolute",
    bottom: 4,
    right: 4,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#0D9488",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#fff",
  },
  name: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 4,
  },
  contact: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 6,
  },
  verifiedRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  verifiedText: {
    fontSize: 13,
    color: "#0D9488",
    fontWeight: "600",
  },
  cardsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: CARD_WIDTH,
    minHeight: 140,
    marginBottom: CARD_GAP,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    ...Platform.select({
      android: {
        elevation: 4,
      },
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
      },
    }),
  },
  cardIconWrap: {
    width: 52,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  cardIcon: {
    width: 48,
    height: 48,
  },
  cardText: {
    fontWeight: "600",
    fontSize: 15,
    color: "#1F2937",
  },
});
