import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

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
       id: "construction-5",
      name: "Carpenter",
      image: require("../assets/images/construction.png"),
    },
  ],

  rickshaw: [
    {
      id: "6",
      name: "Short Route",
      image: require("../assets/images/shortRoute.png"),
    },
    {
      id: "7",
      name: "Long Route",
      image: require("../assets/images/taxi.png"),
    },
    // {
    //   id: "8",
    //   name: "Taxi",
    //   image: require("../assets/images/househelp.png"),
    // },
    {
      id: "9",
      name: "Tempo",
      image: require("../assets/images/tempo.png"),
    },
  ],

  househelp: [
    {
      id: "10",
      name: "Cook",
      image: require("../assets/images/building.png"),
    },
    {
      id: "11",
      name: "Maid",
      image: require("../assets/images/rickshaw.png"),
    },
    {
      id: "12",
      name: "Babysitter",
      image: require("../assets/images/househelp.png"),
    },
  ],
};

export default function LabourJob() {
  const route = useRoute();
  const navigation = useNavigation();
  const { type } = route.params;

 const jobs = JOBS[type?.toLowerCase()] || [];


  return (
    <View style={{ flex: 1, padding: 20 }}>
      <FlatList
        data={jobs}
       keyExtractor={(item) => item.id}

        ListHeaderComponent={
          <>
            {/* Header */}
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

            {/* Search */}
            <View style={styles.searchRow}>
              <View style={styles.searchBox}>
                <Text style={styles.searchText}>Search labour...</Text>
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

            <Text style={styles.title}>
              {type.toUpperCase()} JOBS
            </Text>
          </>
        }
       renderItem={({ item }) => (
  <TouchableOpacity style={styles.card}>
    <Image source={item.image} style={styles.cardImage} />
    <Text style={styles.cardText}>{item.name}</Text>
  </TouchableOpacity>
)}

      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  logo: {
    width: 120,
    height: 40,
  },
  profileIcon: {
    width: 40,
    height: 40,
  },
  profileImage: {
    width: "100%",
    height: "100%",
  },
  searchRow: {
    flexDirection: "row",
    marginBottom: 16,
  },
  searchBox: {
    flex: 1,
    backgroundColor: "#eee",
    padding: 12,
    borderRadius: 10,
  },
  searchText: {
    color: "#888",
  },
  filterBtn: {
    marginLeft: 10,
    backgroundColor: "#E53935",
    padding: 12,
    borderRadius: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  card: {
    padding: 16,
    backgroundColor: "#fff",
    marginTop: 12,
    borderRadius: 10,
  },
  cardText: {
    fontSize: 16,
  },
});











// import {
//   View,
//   Text,
//   FlatList,
//   Image,
//   TouchableOpacity,
//   StyleSheet,
// } from "react-native";
// import { useRoute, useNavigation } from "@react-navigation/native";
// import { Feather } from "@expo/vector-icons";

// const JOBS = {
//   construction: [
//     {
//        id: "construction-1",
//       name: "Electrician",
//       image: require("../assets/images/electrictian.png"),
//     },
//     {
//        id: "construction-2",
//       name: "Plumber",
//       image: require("../assets/images/Plumbering.png"),
//     },
//     {
//        id: "construction-3",
//       name: "PVC Fitter",
//       image: require("../assets/images/pvc.png"),
//     },
//     {
//        id: "construction-5",
//       name: "Carpenter",
//       image: require("../assets/images/construction.png"),
//     },
//   ],

//   rickshaw: [
//     {
//       id: "6",
//       name: "Short Route",
//       image: require("../assets/images/shortRoute.png"),
//     },
//     {
//       id: "7",
//       name: "Long Route",
//       image: require("../assets/images/taxi.png"),
//     },
//     // {
//     //   id: "8",
//     //   name: "Taxi",
//     //   image: require("../assets/images/househelp.png"),
//     // },
//     {
//       id: "9",
//       name: "Tempo",
//       image: require("../assets/images/tempo.png"),
//     },
//   ],

//   househelp: [
//     {
//       id: "10",
//       name: "Cook",
//       image: require("../assets/images/building.png"),
//     },
//     {
//       id: "11",
//       name: "Maid",
//       image: require("../assets/images/rickshaw.png"),
//     },
//     {
//       id: "12",
//       name: "Babysitter",
//       image: require("../assets/images/househelp.png"),
//     },
//   ],
// };

// export default function LabourJob() {
//   const route = useRoute();
//   const navigation = useNavigation();
//   const { type } = route.params;

//  const jobs = JOBS[type?.toLowerCase()] || [];


//   return (
//     <View style={{ flex: 1, padding: 20 }}>
//       <FlatList
//         data={jobs}
//        keyExtractor={(item) => item.id}

//         ListHeaderComponent={
//           <>
//             {/* Header */}
//             <View style={styles.header}>
//               <Image
//                 source={require("../assets/redlogo.png")}
//                 style={styles.logo}
//               />
//               <TouchableOpacity
//                 style={styles.profileIcon}
//                 onPress={() => navigation.navigate("Profile")}
//               >
//                 <Image
//                   source={require("../assets/images/profile.png")}
//                   style={styles.profileImage}
//                 />
//               </TouchableOpacity>
//             </View>

//             {/* Search */}
//             <View style={styles.searchRow}>
//               <View style={styles.searchBox}>
//                 <Text style={styles.searchText}>Search labour...</Text>
//               </View>
//               <View style={styles.filterBtn}>
//                 <Feather
//                   name="sliders"
//                   size={20}
//                   color="white"
//                   style={{ transform: [{ rotate: "90deg" }] }}
//                 />
//               </View>
//             </View>

//             <Text style={styles.title}>
//               {type.toUpperCase()} JOBS
//             </Text>
//           </>
//         }
//        renderItem={({ item }) => (
//   <TouchableOpacity style={styles.card}>
//     <Image source={item.image} style={styles.cardImage} />
//     <Text style={styles.cardText}>{item.name}</Text>
//   </TouchableOpacity>
// )}

//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   header: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 16,
//   },
//   logo: {
//     width: 120,
//     height: 40,
//   },
//   profileIcon: {
//     width: 40,
//     height: 40,
//   },
//   profileImage: {
//     width: "100%",
//     height: "100%",
//   },
//   searchRow: {
//     flexDirection: "row",
//     marginBottom: 16,
//   },
//   searchBox: {
//     flex: 1,
//     backgroundColor: "#eee",
//     padding: 12,
//     borderRadius: 10,
//   },
//   searchText: {
//     color: "#888",
//   },
//   filterBtn: {
//     marginLeft: 10,
//     backgroundColor: "#E53935",
//     padding: 12,
//     borderRadius: 10,
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: "bold",
//     marginBottom: 10,
//   },
//   card: {
//     padding: 16,
//     backgroundColor: "#fff",
//     marginTop: 12,
//     borderRadius: 10,
//   },
//   cardText: {
//     fontSize: 16,
//   },
// });
