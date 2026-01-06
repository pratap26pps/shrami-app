//new code

import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Dimensions,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

const JOBS = {
  construction: [
    {
      id: "construction-1",
      name: "Electrician",
      image: require("../assets/images/electrictian.png"),
    },
    {
      id: "construction-2",
      name: "Plumber",
      image: require("../assets/images/Plumbering.png"),
    },
    {
      id: "construction-3",
      name: "PVC Fitter",
      image: require("../assets/images/pvc.png"),
    },
    {
      id: "construction-4",
      name: "Carpenter",
      image: require("../assets/images/construction.png"),
    },
  ],
};

export default function LabourJob() {
  const route = useRoute();
  const navigation = useNavigation();
  const { type } = route.params;

  const jobs = JOBS[type?.toLowerCase()] || [];

  return (
    <View style={styles.container}>
      <FlatList
        data={jobs}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            {/* HEADER */}
            <View style={styles.header}>
              <Image
                source={require("../assets/redlogo.png")}
                style={styles.logo}
              />
              <TouchableOpacity
                style={styles.profileIcon}
                onPress={() => navigation.navigate("Profile")}
              >
                <Image
                  source={require("../assets/images/profile.png")}
                  style={styles.profileImage}
                />
              </TouchableOpacity>
            </View>

            {/* SEARCH */}
            <View style={styles.searchRow}>
              <View style={styles.searchBox}>
                <TextInput
                  placeholder="Search labour..."
                  placeholderTextColor="#888"
                  style={styles.searchText}
                />
              </View>
              <TouchableOpacity style={styles.filterBtn}>
                <Feather
                  name="sliders"
                  size={20}
                  color="#fff"
                  style={{ transform: [{ rotate: "90deg" }] }}
                />
              </TouchableOpacity>
            </View>

            <Text style={styles.title}>
              {type.toUpperCase()} JOBS
            </Text>
          </>
        }
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card}>
            <Image source={item.image} style={styles.cardImage} />
           <View style={styles.cardAlign}>
  <Text style={styles.cardText}>{item.name}</Text>

  <Image
    source={require("../assets/images/arrow.png")}
    style={styles.arrowIcon}
  />
</View>

          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },

  listContainer: {
    padding: width * 0.05,
  },

 
  header: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",

  marginTop: height * 0.03,     // 👈 upar se niche
  marginBottom: height * 0.015,
},


  logo: {
    width: width * 0.35,
    height: height * 0.06,
    resizeMode: "contain",
  },

  profileIcon: {
    width: width * 0.12,
    height: width * 0.12,
    borderRadius: width * 0.06,
  },

  profileImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },

  searchRow: {
  flexDirection: "row",
  alignItems: "center",
  marginTop: height * 0.015,   
  marginBottom: height * 0.02,
},


  searchBox: {
    flex: 1,
    backgroundColor: "#eee",
    paddingVertical: height * 0.001,
    paddingHorizontal: width * 0.04,
    borderRadius: width * 0.04,
  },

  searchText: {
    fontSize: width * 0.04,
    color: "#333",
  },

  filterBtn: {
    marginLeft: width * 0.03,
    backgroundColor: "#E53935",
    padding: width * 0.035,
    borderRadius: width * 0.04,
  },

  title: {
    fontSize: width * 0.055,
    fontWeight: "bold",
    marginBottom: height * 0.02,
  },

  card: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: width * 0.04,
    marginBottom: height * 0.025,
    elevation: 4,
    overflow: "hidden",
  },

  cardImage: {
    width: "100%",
    height: height * 0.22,
    resizeMode: "cover",
  },
cardAlign: {
  flexDirection: "row",  
  justifyContent: "space-between" ,
},

cardText: {
  fontSize: width * 0.045,
  fontWeight: "600",
  marginTop:10,
  padding:8,
  color: "#333",
},
 
  nameRow: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: 6,
},

arrowIcon: {
  width: 48,
  height: 48,
  resizeMode: "contain",
},

});
