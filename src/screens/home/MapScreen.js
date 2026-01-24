import React, { useState, useRef, useEffect } from "react";
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Alert } from "react-native";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { Polyline as MapPolyline } from "react-native-maps";
import { Animated } from "react-native";
import * as Location from "expo-location";
import { Ionicons } from "@expo/vector-icons";



const GOOGLE_API_KEY = "AIzaSyCtHxr5ntfq1raK8o-R1rW0GiDGAOR4bGo";

export default function MapScreen() {
  const mapRef = useRef(null);
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [distance, setDistance] = useState(0);
  const [routeCoords, setRouteCoords] = useState([]);
  const [animatedCoords, setAnimatedCoords] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [isFetchingLocation, setIsFetchingLocation] = useState(false);


  const drivers = [
    {
      id: 1,
      name: "Ramesh",
      type: "auto",
      latitude: 28.62,
      longitude: 77.21,
      photo: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      id: 2,
      name: "Suresh",
      type: "taxi",
      latitude: 28.61,
      longitude: 77.22,
      photo: "https://randomuser.me/api/portraits/men/2.jpg",
    },
  ];

  const animateRoute = (points) => {
    if (!points || !Array.isArray(points) || points.length === 0) return;

    let i = 0;
    setAnimatedCoords([]);

    const interval = setInterval(() => {
      if (i < points.length) {
        setAnimatedCoords((prev) => [...prev, points[i]]);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 20); // speed of animation
  };

  const handleGetCurrentLocation = async () => {
    setIsFetchingLocation(true);
    try {
      // Request permission
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "Location permission is required to use this feature."
        );
        setIsFetchingLocation(false);
        return;
      }

      // Get current position
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      const newLocation = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };

      setCurrentLocation(newLocation);

      // Animate map to current location
      if (mapRef.current) {
        mapRef.current.animateToRegion(
          {
            ...newLocation,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          },
          1000
        );
      }
    } catch (error) {
      Alert.alert("Error", "Failed to get current location. Please try again.");
      console.error("Location error:", error);
    } finally {
      setIsFetchingLocation(false);
    }
  };

  // Clear route when origin or destination changes
  useEffect(() => {
    if (!origin || !destination) {
      setAnimatedCoords([]);
      setDistance(0);
      setRouteCoords([]);
    }
  }, [origin, destination]);


  const pricePerKm = 20;

  return (
    <View style={{ flex: 1 }}>
      {/* Search Inputs */}
      <View style={styles.searchBox}>
        <GooglePlacesAutocomplete
          placeholder="Pickup location"
          fetchDetails={true}
          onPress={(data, details = null) => {
            const loc = details.geometry.location;
            setOrigin({ latitude: loc.lat, longitude: loc.lng });
          }}
          query={{ key: GOOGLE_API_KEY, language: "en" }}
          styles={{ textInput: styles.input }}
        />

        <GooglePlacesAutocomplete
          placeholder="Drop location"
          fetchDetails={true}
          onPress={(data, details = null) => {
            const loc = details.geometry.location;
            setDestination({ latitude: loc.lat, longitude: loc.lng });
          }}
          query={{ key: GOOGLE_API_KEY, language: "en" }}
          styles={{ textInput: styles.input }}
        />
      </View>

      {/* Map */}
      <MapView
        ref={mapRef}
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 28.6139,
          longitude: 77.209,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
        
      >
        {animatedCoords.length > 0 && (
  <MapPolyline
    coordinates={animatedCoords}
    strokeWidth={6}
    strokeColor="#00A8FF" // highlight color
  />
)}


        {origin && <Marker coordinate={origin} title="Start" />}
        {destination && <Marker coordinate={destination} title="Destination" />}

        {origin && destination && (
          <MapViewDirections
            origin={origin}
            destination={destination}
            apikey={GOOGLE_API_KEY}
            strokeWidth={0} // hide default line
            onReady={(result) => {
              if (!result || !Array.isArray(result.coordinates) || result.coordinates.length === 0) {
                return;
              }

              const points = result.coordinates;
              setDistance(typeof result.distance === 'number' ? result.distance : 0);
              setRouteCoords(points);
              animateRoute(points);

              // Auto-fit map to show the entire route
              if (mapRef.current && points.length > 0) {
                mapRef.current.fitToCoordinates(points, {
                  edgePadding: {
                    top: 100,
                    right: 50,
                    bottom: 200,
                    left: 50,
                  },
                  animated: true,
                });
              }
            }}
          />
        )}


        {/* Driver Markers */}
        {drivers.map((driver) => (
          <Marker
            key={driver.id}
            coordinate={{
              latitude: driver.latitude,
              longitude: driver.longitude,
            }}
          >
            <Image
              source={
                driver.type === "auto"
                  ? require("../../assets/logo.png")
                  : require("../../assets/logo.png")
              }
              style={{ width: 35, height: 35 }}
            />
          </Marker>
        ))}
      </MapView>

      {/* Current Location Button */}
      <TouchableOpacity
        style={styles.currentLocationButton}
        onPress={handleGetCurrentLocation}
        disabled={isFetchingLocation}
      >
        <Ionicons
          name="locate"
          size={24}
          color={isFetchingLocation ? "#999" : "#00A8FF"}
        />
      </TouchableOpacity>

      {/* Bottom Driver List */}
      {distance > 0 && (
        <View style={styles.bottomBox}>
          <Text style={styles.distanceText}>
            Distance: {distance.toFixed(2)} km | Price ₹{(distance * pricePerKm).toFixed(0)}
          </Text>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {drivers.map((d) => (
              <View key={d.id} style={styles.driverCard}>
                <Image source={{ uri: d.photo }} style={styles.avatar} />
                <Text>{d.name}</Text>
                <Text>{d.type.toUpperCase()}</Text>
                <Text style={{ fontWeight: "bold" }}>
                  ₹{(distance * pricePerKm).toFixed(0)}
                </Text>
              </View>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  searchBox: {
    position: "absolute",
    top: 40,
    width: "100%",
    zIndex: 10,
    paddingHorizontal: 10,
  },
  input: {
    backgroundColor: "white",
    borderRadius: 8,
    marginBottom: 5,
  },
  bottomBox: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "white",
    padding: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  distanceText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  driverCard: {
    backgroundColor: "#f5f5f5",
    padding: 10,
    marginRight: 10,
    borderRadius: 12,
    alignItems: "center",
    width: 120,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  currentLocationButton: {
    position: "absolute",
    right: 20,
    bottom: 250,
    backgroundColor: "white",
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
