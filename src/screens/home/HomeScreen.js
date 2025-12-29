import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>SHRAM!</Text>
        <View style={styles.profileIcon}>
          <Feather name="user" size={20} color="white" />
        </View>
      </View>

      {/* Search */}
      <View style={styles.searchRow}>
        <View style={styles.searchBox}>
          <Text style={styles.searchText}>Search labour...</Text>
        </View>
        <View style={styles.filterBtn}>
          <Feather name="sliders" size={20} color="white" />
        </View>
      </View>

      {/* Popular */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Popular</Text>

        <View style={styles.popularRow}>
          {["CONSTRUCTION", "RICKSHAW", "HOUSEHELP"].map((item) => (
            <View key={item} style={styles.popularItem}>
              <View style={styles.popularIcon} />
              <Text style={styles.popularText}>{item}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Top Picks */}
      <Text style={styles.sectionTitle}>Top Picks</Text>

      <View style={styles.topPickCard}>
        <Image
          source={{ uri: "https://i.imgur.com/Vz81cQK.jpg" }}
          style={styles.topPickImage}
        />
        <View style={styles.topPickFooter}>
          <Text style={styles.topPickText}>
            Labour <Text style={styles.grayText}>(मजदूर)</Text>
          </Text>
          <Feather name="arrow-right" size={22} color="#E53935" />
        </View>
      </View>

      {/* Make Labour Team */}
      <TouchableOpacity style={styles.makeTeamBtn}>
        <Text style={styles.makeTeamText}>MAKE LABOUR TEAM</Text>
        <View style={styles.plusBtn}>
          <Text style={styles.plusText}>+</Text>
        </View>
      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5E3E3",
    padding: 16,
    paddingTop: 48,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  logo: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#E53935",
  },
  profileIcon: {
    width: 40,
    height: 40,
    backgroundColor: "#E53935",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  searchBox: {
    flex: 1,
    backgroundColor: "white",
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    paddingHorizontal: 16,
    elevation: 3,
  },
  searchText: {
    color: "#999",
  },
  filterBtn: {
    marginLeft: 12,
    backgroundColor: "#E53935",
    padding: 12,
    borderRadius: 24,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 16,
    marginBottom: 24,
    elevation: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  popularRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  popularItem: {
    width: "30%",
    borderWidth: 1,
    borderColor: "#E53935",
    borderRadius: 16,
    padding: 12,
    alignItems: "center",
  },
  popularIcon: {
    width: 48,
    height: 48,
    backgroundColor: "#FADBD8",
    borderRadius: 24,
    marginBottom: 8,
  },
  popularText: {
    fontSize: 12,
    fontWeight: "600",
    textAlign: "center",
  },
  topPickCard: {
    backgroundColor: "white",
    borderRadius: 20,
    elevation: 4,
    marginBottom: 24,
    overflow: "hidden",
  },
  topPickImage: {
    width: "100%",
    height: 180,
  },
  topPickFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  topPickText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  grayText: {
    color: "#777",
  },
  makeTeamBtn: {
    backgroundColor: "white",
    borderRadius: 30,
    paddingVertical: 14,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 4,
    marginBottom: 40,
  },
  makeTeamText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  plusBtn: {
    width: 40,
    height: 40,
    backgroundColor: "#E53935",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  plusText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
});
