import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";

export default function PickUpScreen() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>SHRAM!</Text>
        <Ionicons name="person-circle" size={42} color="#E53935" />
      </View>

      <Text style={styles.title}>Pick Up</Text>

      {/* Google Map */}
      <View style={styles.mapWrapper}>
        <MapView
          style={styles.map}
          provider="google"
          initialRegion={{
            latitude: 29.0588,
            longitude: 76.0856,
            latitudeDelta: 2.5,
            longitudeDelta: 2.5,
          }}
        >
          {/* Example Marker (Haryana) */}
          <Marker
            coordinate={{
              latitude: 28.4595,
              longitude: 77.0266, // Gurugram
            }}
            title="Labour Available"
            description="Electrician"
          />
        </MapView>
      </View>

      {/* Hire Button */}
      <TouchableOpacity style={styles.hireBtn}>
        <Text style={styles.hireText}>HIRE</Text>
      </TouchableOpacity>

      {/* Bottom Nav */}
      <View style={styles.bottomNav}>
        <Ionicons name="home-outline" size={26} color="#E53935" />
        <Ionicons name="search-outline" size={26} color="#E53935" />
        <Ionicons name="cart-outline" size={26} color="#E53935" />
        <Ionicons name="settings-outline" size={26} color="#E53935" />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EEDADA",
    paddingHorizontal: 16,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 50,
  },

  logo: {
    fontSize: 26,
    fontWeight: "900",
    color: "#E53935",
  },

  title: {
    fontSize: 28,
    fontWeight: "900",
    marginVertical: 15,
  },

  mapWrapper: {
    flex: 1,
    borderRadius: 25,
    overflow: "hidden",
    borderWidth: 3,
    borderColor: "#000",
  },

  map: {
    width: "100%",
    height: "100%",
  },

  hireBtn: {
    backgroundColor: "#F44336",
    paddingVertical: 16,
    borderRadius: 35,
    marginVertical: 15,
    alignItems: "center",
  },

  hireText: {
    color: "#FFF",
    fontSize: 26,
    fontWeight: "900",
  },

  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#FFF6F6",
    borderRadius: 30,
    paddingVertical: 12,
    marginBottom: 10,
  },
});
