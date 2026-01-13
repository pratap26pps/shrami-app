import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, TextInput } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { TextInput } from "react-native";
export default function HomeScreen() {
  const navigation = useNavigation();
const categoryType = [
  {
    id: 1,
    name: "CONSTRUCTION",
    image: require("../../assets/images/building.png"),
  },
  {
    id: 2,
    name: "RICKSHAW",
    image: require("../../assets/images/rickshaw.png"),
  },
  {
    id: 3,
    name: "HOUSEHELP",
    image: require("../../assets/images/househelp.png"),
  },
];



  return (
    <ScrollView style={styles.container}>

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

      {/* Search
      <View style={styles.searchRow}>
        <View style={styles.searchBox}>
          <TextInput style={styles.searchText}>Search labour...</TextInput>
        </View>
        <View style={styles.filterBtn}>
          <Feather name="sliders" size={20} color="white"   style={{ transform: [{ rotate: "90deg" }] }}/>
        </View>
      </View> */}

      {/* Search */}
<View style={styles.searchRow}>
  <View style={styles.searchBox}>
    <TextInput
      placeholder="Search labour..."
      placeholderTextColor="#999"
      style={styles.searchInput}
    />
  </View>

  <View style={styles.filterBtn}>
    <Feather
      name="sliders"
      size={20}
      color="white"
      style={{ transform: [{ rotate: "90deg" }] }}
    />
  </View>
</View>

      {/* Popular */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Popular</Text>

        <View style={styles.popularRow}>
          {categoryType.map((item) => (
            <TouchableOpacity key={item?.id} style={styles.popularItem}  onPress={() =>
           navigation.navigate("LabourJob", { type: item?.name })
          }>
             <Image
               source={item.image}
               resizeMode="contain"
               style={styles.logo}
             />
              <Text style={styles.popularText}>{item?.name}</Text>
            </TouchableOpacity>
            
          ))}
        </View>
      </View>

      {/* Top Picks */}
      <Text style={styles.sectionTitle}>Top Picks</Text>

      <View style={styles.topPickCard}>
        <Image
          source={require("../../assets/images/construction.png")}
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
         <Image
               source={require("../../assets/images/plus.png")}
               resizeMode="contain"
               style={styles.logo}
             />
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
  width: 140,
  height: 60,
  alignSelf: "center",
  marginBottom:3
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
    fontSize: 10,
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
    marginTop:10,
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
