import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Dimensions,
  Platform,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { useState, useMemo } from "react";

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

  rickshaw: [
    {
      id: "rickshaw-1",
      name: "Rickshaw",
      image: require("../assets/images/rickshaw.png"),
    },
    {
      id: "rickshaw-2",
      name: "Taxi",
      image: require("../assets/images/taxi.png"),
    },
    {
      id: "rickshaw-3",
      name: "Tempo",
      image: require("../assets/images/tempo.png"),
    },
  ],

  househelp: [
    {
      id: "clean-1",
      name: "Cleaning",
      image: require("../assets/images/rickshaw.png"),
    },
    {
      id: "food-1",
      name: "Food",
      image: require("../assets/images/taxi.png"),
    },
    {
      id: "both-1",
      name: "Both",
      image: require("../assets/images/tempo.png"),
    },
  ],
  
};

const SUBJOBS = {
  Construction: [
    {
      id: "labour-1",
      title: "Labour",
      subtitle: "(मज़दूर)",
      image: require("../assets/images/electrictian.png"),
    },
    {
      id: "helper-1",
      title: "Construction Helper",
      subtitle: "(सहायक)",
      image: require("../assets/images/electrictian.png"),
    },
  ],
  Electrical: [
    {
      id: "elec-1",
      title: "Electrician",
      subtitle: "(बिजली मिस्त्री)",
      image: require("../assets/images/electrictian.png"),
    },
    {
      id: "wireman-1",
      title: "Wireman",
      subtitle: "(तार जोड़ने वाला)",
      image: require("../assets/images/electrictian.png"),
    },
  ],
  Plumbing: [
    {
      id: "plumb-1",
      title: "Plumber",
      subtitle: "(प्लंबर)",
      image: require("../assets/images/electrictian.png"),
    },
    {
      id: "pvcfit",
      title: "PVC Pipe Fitter",
      subtitle: "(पाइप फिटिंग)",
      image: require("../assets/images/electrictian.png"),
    },
  ],

 Rickshaw: [
    {
      id: "rick-1",
      title: "Rickshaw Driver",
      subtitle: "(रिक्शा चालक)",
      image: require("../assets/images/shortRoute.png"),
    },
    {
      id: "rick-2",
      title: "Passenger Ride",
      subtitle: "(यात्री सेवा)",
      image: require("../assets/images/shortRoute.png"),
    },
  ],

  Taxi: [
    {
      id: "taxi-1",
      title: "Taxi Driver",
      subtitle: "(टैक्सी चालक)",
      image: require("../assets/images/taxi.png"),
    },
    {
      id: "taxi-2",
      title: "Outstation Ride",
      subtitle: "(आउटस्टेशन सेवा)",
      image: require("../assets/images/taxi.png"),
    },
  ],

  Tempo: [
    {
      id: "tempo-1",
      title: "Tempo Driver",
      subtitle: "(टेम्पो चालक)",
      image: require("../assets/images/tempo.png"),
    },
    {
      id: "tempo-2",
      title: "Goods Carrier",
      subtitle: "(माल ढुलाई)",
      image: require("../assets/images/tempo.png"),
    },
],

Cleaning: [
  {
    id: "clean-labour-1",
    title: "Cleaning Labour",
    subtitle: "(सफाई मज़दूर)",
    image: require("../assets/images/cleaning.png"),
  },
  {
    id: "clean-helper-2",
    title: "Cleaning Helper",
    subtitle: "(सफाई सहायक)",
    image: require("../assets/images/cleaning.png"),
  },
],

Food: [
  {
    id: "food-labour-1",
    title: "Kitchen Labour",
    subtitle: "(रसोई मज़दूर)",
    image: require("../assets/images/food.png"),
  },
  {
    id: "cook-2",
    title: "Cook Helper",
    subtitle: "(रसोई सहायक)",
    image: require("../assets/images/food.png"),
  },
],

Both: [
  {
    id: "both-labour-1",
    title: "Cleaning + Cooking",
    subtitle: "(सफाई व खाना)",
    image: require("../assets/images/both.png"),
  },
  {
    id: "both-helper-2",
    title: "House Helper",
    subtitle: "(घर सहायक)",
    image: require("../assets/images/both.png"),
  },
],

};

const MAP = {
  Electrician: "Electrical",
  Plumber: "Plumbing",
  "PVC Fitter": "Plumbing",
  Carpenter: "Construction",

  Rickshaw: "Rickshaw",
  Taxi: "Taxi",
  Tempo: "Tempo",

  Cleaning: "Cleaning",
  Food: "Food",
  Both: "Both",
};

export default function LabourJob() {
  const route = useRoute();
  const navigation = useNavigation();
  const { type } = route.params;
  const [search, setSearch] = useState("");

  const jobs = JOBS[type?.toLowerCase()] || [];

  const filteredSections = useMemo(() => {
    const q = (search || "").trim().toLowerCase();
    return jobs
      .map((job) => {
        const sublist = SUBJOBS[MAP[job.name]] || [];
        const filteredSubs = q
          ? sublist.filter(
              (sub) =>
                (sub.title && sub.title.toLowerCase().includes(q)) ||
                (sub.subtitle && sub.subtitle.toLowerCase().includes(q))
            )
          : sublist;
        const nameMatches = q && job.name && job.name.toLowerCase().includes(q);
        const hasMatchingSubs = filteredSubs.length > 0;
        if (q && !nameMatches && !hasMatchingSubs) return null;
        return { job, subjobs: filteredSubs };
      })
      .filter(Boolean);
  }, [jobs, search]);

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredSections}
        keyExtractor={(item) => item.job.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
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

            <View style={styles.searchRow}>
              <View style={styles.searchBox}>
                <TextInput
                  placeholder="Search labour by name or skill..."
                  placeholderTextColor="#000"
                  style={styles.searchInput}
                  value={search}
                  onChangeText={setSearch}
                />
              </View>
            </View>

            <Text style={styles.title}>
              {type?.toUpperCase?.() || type} JOBS
            </Text>
          </>
        }
        renderItem={({ item }) => (
          <View style={styles.categorySection}>
            <Text style={styles.sectionTitle}>{item.job.name}</Text>

            {item.subjobs.length === 0 ? (
              <Text style={styles.noMatch}>No match for "{search}"</Text>
            ) : (
              <FlatList
                data={item.subjobs}
                keyExtractor={(s) => s.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                snapToAlignment="start"
                decelerationRate="fast"
                renderItem={({ item: sub }) => (
                  <TouchableOpacity
                    style={styles.subCard}
                    onPress={() =>
                      navigation.navigate("WorkerListScreen", { job: sub.title })
                    }
                    activeOpacity={0.8}
                  >
                    <Image source={sub.image} style={styles.subImage} />
                    <View style={styles.subBottom}>
                      <Text style={styles.subText}>
                        {sub.title} {sub.subtitle}
                      </Text>
                      <Image
                        source={require("../assets/images/arrow.png")}
                        style={styles.subArrow}
                      />
                    </View>
                  </TouchableOpacity>
                )}
              />
            )}
          </View>
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
    backgroundColor: "#fff",
    paddingHorizontal: width * 0.04,
    borderRadius: width * 0.05,
    borderWidth: 1,
    borderColor: "#333",
    justifyContent: "center",
    minHeight: 48,
  },

  searchInput: {
    paddingVertical: Platform.OS === "ios" ? 12 : 8,
    fontSize: 16,
    color: "#000",
  },

  searchText: {
    fontSize: width * 0.04,
    color: "#333",
  },

  noMatch: {
    fontSize: 14,
    color: "#777",
    fontStyle: "italic",
    marginVertical: 8,
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

categorySection: {
  marginBottom: 20,
},

sectionTitle: {
  fontSize: 22,
  fontWeight: "bold",
  marginVertical: 10,
  color: "#000",
},

subCard: {
  width: width * 0.8,
  backgroundColor: "#fff",
  borderRadius: 18,
  borderWidth: 2,
  borderColor: "#E53935",
  marginRight: 12,
  overflow: "hidden",
  elevation: 4,
},

subImage: {
  width: "100%",
  height: height * 0.18,
  resizeMode: "cover",
},

subBottom: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  paddingHorizontal: 12,
  paddingVertical: 8,
},

subText: {
  fontSize: 16,
  fontWeight: "bold",
  color: "#E53935",
},

subArrow: {
  width: 30,
  height: 30,
  resizeMode: "contain",
},


});
