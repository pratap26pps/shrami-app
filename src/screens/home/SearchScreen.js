
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  TextInput,
  Dimensions,
  ActivityIndicator,
  Platform,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { useEffect, useState, useMemo } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";

const { width } = Dimensions.get("window");
const API_WORKERS = "https://shrami-backend.onrender.com/api/worker/getWorkers";

export default function WorkerListScreen({ navigation }) {
  const route = useRoute();
  const { job } = route.params || {};

  const [workers, setWorkers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        const res = await fetch(API_WORKERS);
        const result = await res.json();
        setWorkers(result.data || []);
      } catch (err) {
        console.log("Fetch workers failed", err?.message);
      } finally {
        setLoading(false);
      }
    };
    fetchWorkers();
  }, []);

  const filteredWorkers = useMemo(() => {
    const q = (search || "").trim().toLowerCase();
    return workers.filter((worker) => {
      const matchesJob = !job || worker.skills?.toLowerCase() === job.toLowerCase();
      const matchesSearch =
        !q ||
        worker.name?.toLowerCase().includes(q) ||
        worker.skills?.toLowerCase().includes(q);
      return matchesJob && matchesSearch;
    });
  }, [workers, search, job]);

  const openWorkerDetails = (worker) => {
    navigation.navigate("WorkerScreen", { worker });
  };

  return (
    <SafeAreaView style={styles.wrapper} edges={["top"]}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Image
            source={require("../../assets/redlogo.png")}
            resizeMode="contain"
            style={styles.logo}
          />
          <TouchableOpacity
            style={styles.profileIcon}
            onPress={() => navigation.navigate("Profile")}
          >
            <Image
              source={require("../../assets/images/profile.png")}
              resizeMode="contain"
              style={styles.profileImage}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.searchRow}>
          <View style={styles.searchBox}>
            <TextInput
              placeholder="Search by name or skill..."
              placeholderTextColor="#000"
              style={styles.searchInput}
              value={search}
              onChangeText={setSearch}
            />
          </View>
          
        </View>

        <View style={styles.headingRow}>
          <Text style={styles.heading}>
            {job ? job : "All Workers"}
          </Text>
          <Text style={styles.subheading}>
            {job
              ? "Search within this category"
              : "Tap a worker for more details"}
          </Text>
        </View>

        {loading ? (
          <View style={styles.loader}>
            <ActivityIndicator size="large" color="#E53935" />
          </View>
        ) : filteredWorkers.length === 0 ? (
          <View style={styles.empty}>
            <Feather name="search" size={48} color="#ccc" />
            <Text style={styles.emptyText}>No workers found</Text>
            <Text style={styles.emptySub}>
              {search ? `Try a different search for "${search}"` : "No workers in this category"}
            </Text>
          </View>
        ) : (
          filteredWorkers.map((item, index) => (
            <TouchableOpacity
              key={item._id || item.id || index}
              style={styles.card}
              onPress={() => openWorkerDetails(item)}
              activeOpacity={0.8}
            >
              <Image
                source={
                  item.image
                    ? { uri: item.image }
                    : require("../../assets/images/profile.png")
                }
                style={styles.avatar}
              />
              <View style={styles.info}>
                <Text style={styles.name}>{item.name || "Worker"}</Text>
                <Text style={styles.sub}>{item.skills || "Skilled Worker"}</Text>
                <Text style={styles.rating}>⭐ {item.rating ?? 4.8}</Text>
                {item.price != null && (
                  <Text style={styles.price}>₹ {item.price} / day</Text>
                )}
              </View>
              <Feather name="chevron-right" size={24} color="#E53935" />
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#F5E3E3",
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    width: 140,
    height: 60,
    alignSelf: "center",
  },
  profileIcon: {
    width: 54,
    height: 54,
    backgroundColor: "#FDECEC",
    borderRadius: 21,
    borderWidth: 1.5,
    borderColor: "#E53935",
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
  },
  profileImage: {
    width: 28,
    height: 28,
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    gap: 12,
  },
  searchBox: {
    flex: 1,
    minHeight: 48,
    backgroundColor: "#fff",
    borderRadius: 24,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderColor: "#333",
    justifyContent: "center",
    elevation: 2,
    ...(Platform.OS === "ios" && {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
    }),
  },
  searchInput: {
    paddingVertical: Platform.OS === "ios" ? 12 : 8,
    fontSize: 16,
    color: "#000",
  },
  filterBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#E53935",
    alignItems: "center",
    justifyContent: "center",
  },
  headingRow: {
    marginBottom: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
  },
  subheading: {
    fontSize: 13,
    color: "#666",
    marginTop: 4,
  },
  loader: {
    paddingVertical: 48,
    alignItems: "center",
  },
  empty: {
    alignItems: "center",
    paddingVertical: 48,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#555",
    marginTop: 12,
  },
  emptySub: {
    fontSize: 14,
    color: "#999",
    marginTop: 6,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 14,
    alignItems: "center",
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "rgba(229, 57, 53, 0.15)",
    elevation: 2,
    ...(Platform.OS === "ios" && {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.06,
      shadowRadius: 3,
    }),
  },
  avatar: {
    width: width * 0.18,
    height: width * 0.18,
    borderRadius: width * 0.09,
    borderWidth: 2,
    borderColor: "#E53935",
    marginRight: 14,
    backgroundColor: "#F5E3E3",
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#000",
  },
  sub: {
    color: "#666",
    fontSize: 13,
    marginTop: 2,
  },
  rating: {
    color: "#E53935",
    fontWeight: "600",
    fontSize: 14,
    marginTop: 4,
  },
  price: {
    fontSize: 13,
    color: "#333",
    marginTop: 2,
  },
});
