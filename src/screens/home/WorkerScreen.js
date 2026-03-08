import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import { useContext } from "react";
import { HireContext } from "../../context/HireContext";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

export default function WorkerScreen({ route }) {
  const navigation = useNavigation();
  const { hireWorker, removeWorker, isWorkerHired } = useContext(HireContext);
  const { worker } = route.params;

  const isHired = isWorkerHired(worker);

  const handleHireToggle = () => {
    if (isHired) removeWorker(worker);
    else hireWorker(worker);
  };

  const avatarSource =
    worker?.profilePhoto && (worker.profilePhoto.startsWith("http") || worker.profilePhoto.startsWith("https"))
      ? { uri: worker.profilePhoto }
      : require("../../assets/redlogo.png");

  const stats = [
    { label: "Experience", value: `${worker?.experience || 0}+`, sub: "EXP." },
    { label: "Profile", icon: "user" },
    { label: "ID", icon: "credit-card" },
    { label: "Rating", value: worker?.rating ? `⭐ ${worker.rating}` : "—", icon: "star" },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={require("../../assets/redlogo.png")} style={styles.logo} resizeMode="contain" />
        <TouchableOpacity
          style={styles.profileIcon}
          onPress={() => navigation.navigate("Profile")}
          activeOpacity={0.8}
        >
          <Feather name="user" size={22} color="#E53935" />
        </TouchableOpacity>
      </View>

      {/* Profile Card */}
      <View style={styles.profileCard}>
        <Image source={avatarSource} style={styles.avatar} />
        <Text style={styles.name}>{worker?.name || "Worker"}</Text>
        <Text style={styles.role}>{worker?.skills || "—"}</Text>
        <TouchableOpacity
          style={[styles.hireBtn, { backgroundColor: isHired ? "#22C55E" : "#E53935" }]}
          onPress={handleHireToggle}
          activeOpacity={0.8}
        >
          <Text style={styles.hireText}>{isHired ? "HIRED" : "HIRE"}</Text>
        </TouchableOpacity>
      </View>

      {/* Stats Row */}
      <View style={styles.statsRow}>
        {stats.map((item, i) => (
          <View key={i} style={styles.statItem}>
            <View style={styles.statCircle}>
              {item.value ? (
                <>
                  <Text style={styles.statText}>{item.value}</Text>
                  {item.sub && <Text style={styles.statSub}>{item.sub}</Text>}
                </>
              ) : (
                <Feather name={item.icon || "star"} size={24} color="#fff" />
              )}
            </View>
            <Text style={styles.statLabel}>{item.label}</Text>
          </View>
        ))}
      </View>

      {/* Info Card */}
      <View style={styles.infoCard}>
        <View style={styles.infoSection}>
          <Text style={styles.infoLabel}>Age</Text>
          <Text style={styles.infoValue}>{worker?.age ? `${worker.age} years` : "—"}</Text>
        </View>
        <View style={styles.infoSection}>
          <Text style={styles.infoLabel}>Gender</Text>
          <Text style={styles.infoValue}>{worker?.gender || "—"}</Text>
        </View>
        {worker?.education ? (
          <View style={styles.infoSection}>
            <Text style={styles.infoLabel}>Education</Text>
            <Text style={styles.infoValue}>{worker.education}</Text>
          </View>
        ) : null}
        <View style={styles.infoSection}>
          <Text style={styles.infoLabel}>Experience</Text>
          <Text style={styles.infoValue}>{worker?.experience ? `${worker.experience} years of field experience` : "—"}</Text>
        </View>

        <View style={styles.priceSection}>
          <Text style={styles.priceLabel}>Price</Text>
          <Text style={styles.priceValue}>₹{worker?.price ?? "—"}</Text>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.infoLabel}>Skills</Text>
          <Text style={styles.infoValue}>• {worker?.skills || "—"}</Text>
        </View>
        <View style={styles.infoSection}>
          <Text style={styles.infoLabel}>Work Type</Text>
          <Text style={styles.infoValue}>{worker?.workType || "—"}</Text>
        </View>
        <View style={styles.infoSection}>
          <Text style={styles.infoLabel}>Working Hours</Text>
          <Text style={styles.infoValue}>{worker?.workingHours || "—"}</Text>
        </View>
        <View style={styles.infoSection}>
          <Text style={styles.infoLabel}>Physical Ability</Text>
          <Text style={styles.infoValue}>{worker?.physicalAbility || "—"}</Text>
        </View>
        <View style={styles.infoSection}>
          <Text style={styles.infoLabel}>Languages</Text>
          <Text style={styles.infoValue}>{worker?.language || "—"}</Text>
        </View>
      </View>
    </ScrollView>
  );
}
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
    marginBottom: 24,
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
  profileCard: {
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 24,
    alignItems: "center",
    marginBottom: 20,
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
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: "#E53935",
    marginBottom: 12,
  },
  name: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 4,
  },
  role: {
    fontSize: 15,
    color: "#6B7280",
    marginBottom: 16,
  },
  hireBtn: {
    width: "100%",
    paddingVertical: 14,
    borderRadius: 28,
    alignItems: "center",
  },
  hireText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "700",
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  statItem: {
    alignItems: "center",
    flex: 1,
  },
  statCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#E53935",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  statText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  statSub: {
    color: "rgba(255,255,255,0.9)",
    fontSize: 10,
    fontWeight: "600",
  },
  statLabel: {
    fontSize: 11,
    color: "#6B7280",
    fontWeight: "500",
  },
  infoCard: {
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 24,
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
  infoSection: {
    marginBottom: 16,
  },
  infoLabel: {
    fontSize: 12,
    color: "#9CA3AF",
    fontWeight: "600",
    marginBottom: 4,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  infoValue: {
    fontSize: 15,
    color: "#1F2937",
  },
  priceSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 20,
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: "#FFF5F5",
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#E53935",
  },
  priceLabel: {
    fontSize: 14,
    color: "#6B7280",
    fontWeight: "600",
  },
  priceValue: {
    fontSize: 22,
    fontWeight: "700",
    color: "#E53935",
  },
});



