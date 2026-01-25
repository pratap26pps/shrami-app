import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useContext, useState } from "react";
import { HireContext } from "../../context/HireContext";
import { useNavigation } from "@react-navigation/native";

export default function WorkerScreen({ route }) {

  const navigation = useNavigation();
  const { hireWorker } = useContext(HireContext);
  // Ideally pass selected worker from previous screen
  const { worker } = route.params;
  console.log(worker)


  const [isHired, setIsHired] = useState(false);

  const handleHire = () => {
    hireWorker(worker);
    setIsHired(true);
  };


  return (
    <ScrollView style={detail.container}>
     
     {/* HEADER */}
      <View style={detail.header}>
        <Image
          source={require("../../assets/redlogo.png")}
          style={detail.logo}
        />

        <TouchableOpacity
          style={detail.profileIcon}
          onPress={() => navigation.navigate("Profile")}
        >
          <Image
            source={require("../../assets/images/profile.png")}
            style={detail?.profileImg}
          />
        </TouchableOpacity>
      </View>
       

      <View style={detail.profileCard}>
        <Image
          source={require("../../assets/redlogo.png")}
          style={detail?.profileImg}
        />

        <Text style={detail?.name}>{worker.name}</Text>
        <Text style={detail?.sub}>{worker.skills}</Text>

        <TouchableOpacity
          style={[
            detail?.hireBtn,
            { backgroundColor: isHired ? "#4CAF50" : "#E53935" },
          ]}
          disabled={isHired}
          onPress={handleHire}
        >
          <Text style={detail?.hireText}>
            {isHired ? "HIRED" : "HIRE"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Stats */}
   <View style={detail?.statsRow}>
  <View style={detail?.statCircle}>
    <Text style={detail?.statText}>{worker?.experience}+</Text>
    <Text style={detail?.statSub}>EXP.</Text>
  </View>

  <View style={detail?.statCircle}>
    <Text style={detail?.statText}>👤</Text>
  </View>

  <View style={detail?.statCircle}>
    <Text style={detail?.statText}>🪪</Text>
  </View>

  <View style={detail?.statCircle}>
    <Text style={detail?.rating}>⭐ {worker.rating}</Text>
  </View>
</View>


      {/* Info */}
      <View style={detail?.infoCard}>
        <Text style={detail?.info}>Age: {worker?.age} years</Text>
        <Text style={detail?.info}>Gender: {worker?.gender}</Text>
        <Text style={detail?.info}>
          Education: {worker.education}
        </Text>
        <Text style={detail?.info}>
          Experience: {worker.experience} years of field experience
        </Text>
       
        <Text style={detail?.infoTitle}>Price : 
         <Text style={detail?.sub}>{worker?.price}</Text>
        
        </Text>
        

        
        <Text style={detail?.infoTitle}>Skills:</Text>
        <Text style={detail?.info}> • {worker?.skills}</Text>
     

        <Text style={detail?.info}>
          Work Type: {worker?.workType}
        </Text>
        <Text style={detail?.info}>Working Hours: {worker?.workingHours}</Text>
        <Text style={detail?.info}>
          Physical Ability: {worker?.physicalAbility}
        </Text>
        <Text style={detail?.info}>
          Languages: {worker?.language}
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



