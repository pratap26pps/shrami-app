import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

export default function WorkerScreen() {
  return (
    <ScrollView style={detail.container}>
      <View style={detail.profileCard}>
        <Image
          source={require("../../assets/redlogo.png")}
          style={detail.profileImg}
        />

        <Text style={detail.name}>Name</Text>
        <Text style={detail.sub}>Qualities</Text>

        <TouchableOpacity style={detail.hireBtn}>
          <Text style={detail.hireText}>HIRE</Text>
        </TouchableOpacity>
      </View>

      {/* Stats */}
   <View style={detail.statsRow}>
  <View style={detail.statCircle}>
    <Text style={detail.statText}>7+</Text>
    <Text style={detail.statSub}>EXP.</Text>
  </View>

  <View style={detail.statCircle}>
    <Text style={detail.statText}>👤</Text>
  </View>

  <View style={detail.statCircle}>
    <Text style={detail.statText}>🪪</Text>
  </View>

  <View style={detail.statCircle}>
    <Text style={detail.rating}>⭐ 4.8</Text>
  </View>
</View>


      {/* Info */}
      <View style={detail.infoCard}>
        <Text style={detail.info}>Age: 22–55 years</Text>
        <Text style={detail.info}>Gender: Male / Female</Text>
        <Text style={detail.info}>
          Education: Primary to secondary level
        </Text>
        <Text style={detail.info}>
          Experience: 1–20+ years of field experience
        </Text>

        <Text style={detail.infoTitle}>Skills:</Text>
        <Text style={detail.info}>• Construction work</Text>
        <Text style={detail.info}>• Loading & unloading</Text>
        <Text style={detail.info}>• Plumbing / electrical assistance</Text>
        <Text style={detail.info}>• Painting & finishing work</Text>
        <Text style={detail.info}>• Cleaning & maintenance</Text>
        <Text style={detail.info}>• Farming / factory support</Text>

        <Text style={detail.info}>
          Work Type: Daily wage / Contract-based
        </Text>
        <Text style={detail.info}>Working Hours: 8–10 hours/day</Text>
        <Text style={detail.info}>
          Physical Ability: High stamina manual labor
        </Text>
        <Text style={detail.info}>
          Languages: Hindi, regional (basic English optional)
        </Text>
      </View>
    </ScrollView>
  );
}
const detail = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3DFDF",
    padding: 16,
  },

  profileCard: {
    backgroundColor: "#FFF4F4",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    elevation: 4,
  },

  profileImg: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 4,
    borderColor: "#E53935",
    marginBottom: 10,
  },

  name: {
    fontSize: 22,
    fontWeight: "bold",
  },

  sub: {
    color: "#999",
    marginBottom: 10,
  },

  hireBtn: {
    marginTop: 10,
    width: "100%",
    backgroundColor: "#E53935",
    paddingVertical: 12,
    borderRadius: 30,
    alignItems: "center",
  },

  hireText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 15,
  },

  statCircle: {
    width: 65,
    height: 65,
    borderRadius: 32,
    backgroundColor: "#E53935",
    alignItems: "center",
    justifyContent: "center",
  },

  statText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },

  statSub: {
    color: "#FFF",
    fontSize: 12,
  },

  rating: {
    color: "#FFF",
    fontWeight: "bold",
  },

  infoCard: {
    backgroundColor: "#FFF4F4",
    borderRadius: 20,
    padding: 18,
    elevation: 4,
  },

  infoTitle: {
    marginTop: 10,
    fontWeight: "bold",
  },

  info: {
    marginBottom: 6,
    color: "#333",
  },
});
