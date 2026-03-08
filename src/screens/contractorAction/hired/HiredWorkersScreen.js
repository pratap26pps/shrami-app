import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Platform,
} from "react-native";
import { useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { Feather, Ionicons } from "@expo/vector-icons";
import { HireContext } from "../../../context/HireContext";

export default function HiredWorkersScreen() {
  const navigation = useNavigation();
  const { hiredWorkers, removeWorker } = useContext(HireContext);

  const openWorkerDetails = (worker) => {
    navigation.navigate("WorkerScreen", { worker });
  };

  const handleRemove = (worker, e) => {
    e?.stopPropagation?.();
    removeWorker(worker);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backBtn}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        >
          <Feather name="arrow-left" size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text style={styles.title}>Hired Workers</Text>
        <View style={styles.placeholder} />
      </View>

      {hiredWorkers.length === 0 ? (
        <View style={styles.empty}>
          <Feather name="users" size={56} color="#D1D5DB" />
          <Text style={styles.emptyTitle}>No hired workers</Text>
          <Text style={styles.emptySub}>
            Add workers from Home or Make Labour Team to see them here
          </Text>
          <TouchableOpacity
            style={styles.emptyBtn}
            onPress={() => navigation.navigate("Tabs")}
          >
            <Text style={styles.emptyBtnText}>Go to Home</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.count}>{hiredWorkers.length} worker{hiredWorkers.length !== 1 ? "s" : ""} hired</Text>
          {hiredWorkers.map((worker, index) => (
            <TouchableOpacity
              key={worker._id || worker.id || index}
              style={styles.card}
              onPress={() => openWorkerDetails(worker)}
              activeOpacity={0.8}
            >
              <Image
                source={
                  (worker.profilePhoto || worker.image) &&
                  (String(worker.profilePhoto || worker.image).startsWith("http") ||
                    String(worker.profilePhoto || worker.image).startsWith("https"))
                    ? { uri: worker.profilePhoto || worker.image }
                    : require("../../../assets/images/profile.png")
                }
                style={styles.avatar}
                resizeMode="cover"
              />
              <View style={styles.info}>
                <Text style={styles.name}>{worker.name || "Worker"}</Text>
                <Text style={styles.skills}>{worker.skills || "—"}</Text>
                {worker.price != null && (
                  <Text style={styles.price}>₹{worker.price}</Text>
                )}
              </View>
              <TouchableOpacity
                style={styles.removeBtn}
                onPress={(e) => handleRemove(worker, e)}
                hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
              >
                <Ionicons name="trash-outline" size={22} color="#E53935" />
              </TouchableOpacity>
              <Feather name="chevron-right" size={22} color="#9CA3AF" />
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDF2F2",
    paddingTop: 48,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginBottom: 8,
  },
  backBtn: {
    padding: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1F2937",
  },
  placeholder: {
    width: 32,
  },
  empty: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1F2937",
    marginTop: 16,
  },
  emptySub: {
    fontSize: 15,
    color: "#6B7280",
    textAlign: "center",
    marginTop: 8,
    lineHeight: 22,
  },
  emptyBtn: {
    marginTop: 24,
    backgroundColor: "#E53935",
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 24,
  },
  emptyBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 32,
  },
  count: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 16,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    ...Platform.select({
      android: { elevation: 3 },
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
      },
    }),
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 2,
    borderColor: "#E53935",
    marginRight: 14,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 17,
    fontWeight: "700",
    color: "#1F2937",
  },
  skills: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 2,
  },
  price: {
    fontSize: 15,
    fontWeight: "600",
    color: "#E53935",
    marginTop: 4,
  },
  removeBtn: {
    padding: 8,
    marginRight: 4,
  },
});
