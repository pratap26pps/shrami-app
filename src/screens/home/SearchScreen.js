
//new
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  TextInput,
  Dimensions,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";

const { width } = Dimensions.get("window");

export default function WorkerListScreen({ navigation }) {
  const route = useRoute();
  const { job } = route.params || {};

  const [workers, setWorkers] = useState([]);
  const [search, setSearch] = useState("");

  const getusersdata = async () => {
    try {
      const res = await fetch(
        "https://shrami-backend.onrender.com/api/worker/getWorkers"
      );
      const result = await res.json();
      setWorkers(result.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getusersdata();
  }, []);

  // 🔍 Filter by job + search
  const filteredWorkers = workers.filter((worker) => {
    const matchesJob =
      worker.skills?.toLowerCase() === job?.toLowerCase();

    const matchesSearch =
      worker.name?.toLowerCase().includes(search.toLowerCase()) ||
      worker.skills?.toLowerCase().includes(search.toLowerCase());

    return matchesJob && matchesSearch;
  });

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
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
      {/* Search Row */}
      <View style={styles.searchRow}>
        <TextInput
          placeholder="Search workers..."
          placeholderTextColor="#aaa"
          style={styles.searchBox}
          value={search}
          onChangeText={setSearch}
        />

        <TouchableOpacity style={styles.filterBtn}>
          <Text style={styles.filterIcon}>≡</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.heading}>{job}</Text>

      {filteredWorkers.map((item, index) => (
        <View key={index} style={styles.card}>
          <Image
            source={
              item.image
                ? { uri: item.image }
                : require("../../assets/redlogo.png")
            }
            style={styles.avatar}
          />

          <View style={styles.info}>
            <Text style={styles.name}>{item.name || "Worker"}</Text>
            <Text style={styles.sub}>
              {item.skills || "Skilled Worker"}
            </Text>
            <Text style={styles.rating}>⭐ {item.rating || 4.8}</Text>
          </View>

          <TouchableOpacity
            onPress={() =>
              navigation.navigate("WorkerScreen", { worker: item })
            }
          >
            <Text style={styles.details}>DETAILS</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5DDDD",
    padding: 16,
  },

    header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    marginTop:25
  },
  logo: {
    width: 140,
    height: 60,
    alignSelf: "center",
    marginBottom: 3
  },

  profileIcon: {
    width: 54,
    height: 57,
    backgroundColor: "#FDECEC",
    borderRadius: 21,
    borderWidth: 1.5,
    borderColor: "#E53935",
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,          // Android shadow
    shadowColor: "#000",   // iOS shadow
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
  },

  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
    
  },

  searchBox: {
    flex: 1,
    height: 48,
    backgroundColor: "#FFF",
    borderRadius: 30,
    paddingHorizontal: 20,
    fontSize: 14,
    elevation: 3,
  },

  filterBtn: {
    marginLeft: 10,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#E53935",
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
  },

  filterIcon: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "bold",
  },

  heading: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 14,
    color: "#000",
  },

  card: {
    flexDirection: "row",
    backgroundColor: "#FFF0F0",
    borderRadius: 22,
    padding: 14,
    alignItems: "center",
    marginBottom: 14,
    elevation: 3,
  },

  avatar: {
    width: width * 0.16,
    height: width * 0.16,
    borderRadius: width * 0.08,
    borderWidth: 3,
    borderColor: "#E53935",
    marginRight: 14,
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
    color: "#999",
    fontSize: 13,
    marginVertical: 2,
  },

  rating: {
    color: "#E53935",
    fontWeight: "bold",
    fontSize: 14,
  },

  details: {
    color: "#E53935",
    fontWeight: "bold",
    fontSize: 13,
  },
});
