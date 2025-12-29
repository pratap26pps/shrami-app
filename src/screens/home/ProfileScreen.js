import { View, Text, Image, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";

export default function ProfileScreen() {
  return (
    <View style={styles.container}>

           {/* Header */}
           <View style={styles.header}>
                   <Image
                    source={require("../../assets/redlogo.png")}
                    resizeMode="contain"
                    style={styles.logo}
                  />
             <View style={styles.profileIcon}>
                  <Image
                    source={require("../../assets/images/profile.png")}
                    resizeMode="contain"
                    style={styles.logo}
                  />
             </View>
           </View>

      {/* Profile */}
      <View style={styles.profileSection}>
        <Image
          source={{ uri: "https://i.imgur.com/8Km9tLL.jpg" }}
          style={styles.avatar}
        />
        <Text style={styles.name}>Name</Text>
        <Text style={styles.verified}>Verified</Text>
      </View>

      {/* Cards */}
      <View style={styles.cardsRow}>
        {[1, 2, 3, 4].map((i) => (
          <View key={i} style={styles.card}>
            {i === 1 && (
              <>
                <View style={styles.cartIcon}>
                  <Feather name="shopping-cart" size={22} color="white" />
                </View>
                <Text style={styles.cardText}>Cart</Text>
              </>
            )}
          </View>
        ))}
      </View>

    </View>
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
    marginBottom: 40,
  },
  logo: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#E53935",
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

  profileSection: {
    alignItems: "center",
    marginBottom: 40,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 65,
    borderWidth: 4,
    borderColor: "#E53935",
    marginBottom: 12,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
  },
  verified: {
    color: "#777",
  },
  cardsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: "48%",
    height: 130,
    backgroundColor: "white",
    borderRadius: 20,
    elevation: 4,
    marginBottom: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  cartIcon: {
    width: 56,
    height: 56,
    backgroundColor: "#E53935",
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  cardText: {
    fontWeight: "bold",
    fontSize: 16,
  },
});
