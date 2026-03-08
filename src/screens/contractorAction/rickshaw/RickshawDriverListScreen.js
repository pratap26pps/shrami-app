import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Platform,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

const DUMMY_DRIVERS = [
  {
    id: 1,
    name: "Ramesh Kumar",
    type: "rickshaw",
    skills: "Rickshaw Driver",
    experience: 7,
    rating: 4.8,
    price: 50,
    age: 35,
    gender: "Male",
    photo: "https://randomuser.me/api/portraits/men/1.jpg",
    latitude: 28.62,
    longitude: 77.21,
  },
  {
    id: 2,
    name: "Suresh Singh",
    type: "taxi",
    skills: "Taxi Driver",
    experience: 5,
    rating: 4.6,
    price: 80,
    age: 42,
    gender: "Male",
    photo: "https://randomuser.me/api/portraits/men/2.jpg",
    latitude: 28.61,
    longitude: 77.22,
  },
  {
    id: 3,
    name: "Amit Sharma",
    type: "rickshaw",
    skills: "Rickshaw Driver",
    experience: 3,
    rating: 4.9,
    price: 45,
    age: 28,
    gender: "Male",
    photo: "https://randomuser.me/api/portraits/men/3.jpg",
    latitude: 28.615,
    longitude: 77.215,
  },
  {
    id: 4,
    name: "Rahul Verma",
    type: "tempo",
    skills: "Tempo Driver",
    experience: 10,
    rating: 4.7,
    price: 120,
    age: 45,
    gender: "Male",
    photo: "https://randomuser.me/api/portraits/men/4.jpg",
    latitude: 28.618,
    longitude: 77.225,
  },
  {
    id: 5,
    name: "Vikas Yadav",
    type: "rickshaw",
    skills: "Rickshaw Driver",
    experience: 4,
    rating: 4.5,
    price: 55,
    age: 32,
    gender: "Male",
    photo: "https://randomuser.me/api/portraits/men/5.jpg",
    latitude: 28.623,
    longitude: 77.205,
  },
  {
    id: 6,
    name: "Deepak Patel",
    type: "taxi",
    skills: "Taxi Driver",
    experience: 8,
    rating: 4.8,
    price: 90,
    age: 38,
    gender: "Male",
    photo: "https://randomuser.me/api/portraits/men/6.jpg",
    latitude: 28.61,
    longitude: 77.21,
  },
];

const TYPE_LABELS = {
  rickshaw: "Rickshaw",
  taxi: "Taxi",
  tempo: "Tempo",
};

export default function RickshawDriverListScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { job } = route.params || {};

  const filteredDrivers = job
    ? DUMMY_DRIVERS.filter((d) => {
        const j = (job || "").toLowerCase();
        if (j.includes("rickshaw")) return d.type === "rickshaw";
        if (j.includes("taxi")) return d.type === "taxi";
        if (j.includes("tempo")) return d.type === "tempo";
        return true;
      })
    : DUMMY_DRIVERS;

  const openDriverDetail = (driver) => {
    navigation.navigate("WorkerScreen", {
      worker: { ...driver, isRickshawDriver: true },
    });
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
        <Text style={styles.title}>
          {job || "Rickshaw Drivers"}
        </Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.count}>
          {filteredDrivers.length} driver{filteredDrivers.length !== 1 ? "s" : ""} available
        </Text>
        {filteredDrivers.map((driver) => (
          <TouchableOpacity
            key={driver.id}
            style={styles.card}
            onPress={() => openDriverDetail(driver)}
            activeOpacity={0.8}
          >
            <Image
              source={{ uri: driver.photo }}
              style={styles.avatar}
            />
            <View style={styles.info}>
              <Text style={styles.name}>{driver.name}</Text>
              <View style={[styles.typeBadge, styles[`type_${driver.type}`]]}>
                <Text style={styles.typeText}>
                  {TYPE_LABELS[driver.type] || driver.type}
                </Text>
              </View>
              <Text style={styles.skills}>{driver.skills}</Text>
              <View style={styles.meta}>
                <Text style={styles.exp}>{driver.experience}+ yrs</Text>
                <Text style={styles.rating}>⭐ {driver.rating}</Text>
                <Text style={styles.price}>₹{driver.price}/km</Text>
              </View>
            </View>
            <Feather name="chevron-right" size={24} color="#9CA3AF" />
          </TouchableOpacity>
        ))}
      </ScrollView>
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
    width: 64,
    height: 64,
    borderRadius: 32,
    marginRight: 16,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 17,
    fontWeight: "700",
    color: "#1F2937",
  },
  typeBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginTop: 4,
  },
  type_rickshaw: {
    backgroundColor: "#FFF4E5",
  },
  type_taxi: {
    backgroundColor: "#E8F5E9",
  },
  type_tempo: {
    backgroundColor: "#E3F2FD",
  },
  typeText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#1F2937",
  },
  skills: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 4,
  },
  meta: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  exp: {
    fontSize: 13,
    color: "#6B7280",
    marginRight: 12,
  },
  rating: {
    fontSize: 13,
    color: "#6B7280",
    marginRight: 12,
  },
  price: {
    fontSize: 15,
    fontWeight: "700",
    color: "#E53935",
  },
});
