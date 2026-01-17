import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";

export default function WorkerListScreen({ navigation }) {
   const route = useRoute();
  const { job } = route.params || {};
  const [workers,setworkers] = useState([]);


  const getusersdata  = async ()=>{
    try{
        const res = await fetch("http://localhost:5001/api/worker/getWorkers");
        const result = await res.json();
        setworkers(result.data);
        console.log("worker data ",result.data);

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getusersdata();
  }, []);

  const filterworker = workers.filter((worker) => worker.skills.toLowerCase() === job.toLowerCase());
  console.log("filterworker", filterworker);
  // const workers = Array(5).fill({
  //    id: "USER001",
  //   quality: job + " work specialist",
  //   rating: 4.8,
  //   image: require("../../assets/redlogo.png"),
  //   name: "Guest User",
  //   email: "guest@example.com",
  //   mobile: "9999999999",
  //   price: 500,
  // });

  return (
    <ScrollView style={styles.container}>
      {/* Search */}
      <View style={styles.searchRow}>
        <View style={styles.searchBox} />
        <TouchableOpacity style={styles.filterBtn}>
          <Text style={styles.filterIcon}>≡</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.heading}>{job}</Text>


      {filterworker.map((item, index) => (
        <View key={index} style={styles.card} >
          <Image source={item.image} style={styles.avatar} />

          <View style={{ flex: 1 }}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.sub}>{item.quality}</Text>
            <Text style={styles.rating}>⭐ {item.rating}</Text>
          </View>

          <TouchableOpacity
                onPress={() => navigation.navigate("WorkerScreen")}
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
    backgroundColor: "#F3DFDF",
    padding: 16,
  },

  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },

  searchBox: {
    flex: 1,
    height: 45,
    backgroundColor: "#FFF",
    borderRadius: 25,
  },

  filterBtn: {
    marginLeft: 10,
    width: 45,
    height: 45,
    borderRadius: 22,
    backgroundColor: "#E53935",
    alignItems: "center",
    justifyContent: "center",
  },

  filterIcon: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "bold",
  },

  heading: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 15,
  },

  card: {
    flexDirection: "row",
    backgroundColor: "#FFF4F4",
    borderRadius: 18,
    padding: 14,
    alignItems: "center",
    marginBottom: 14,
    elevation: 4,
  },

  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: "#E53935",
    marginRight: 12,
  },

  name: {
    fontSize: 18,
    fontWeight: "bold",
  },

  sub: {
    color: "#999",
    marginVertical: 2,
  },

  rating: {
    color: "#E53935",
    fontWeight: "bold",
  },

  details: {
    color: "#E53935",
    fontWeight: "bold",
  },
});
