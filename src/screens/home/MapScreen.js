import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Platform,
  InteractionManager,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { decode } from "@mapbox/polyline";
import { Polyline as MapPolyline } from "react-native-maps";
import * as Location from "expo-location";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

const GOOGLE_API_KEY =
  (process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY ||
    process.env.GOOGLE_API_KEY ||
    process.env.GOOGLE_MAPS_API_KEY || "").trim() || null;

const ROUTE_COLORS = {
  shadow: "rgba(0, 122, 255, 0.28)",
  accent: "#007AFF",
  accentBright: "#5AC8FA",
};

const DRIVER_TYPE_COLORS = {
  auto: { bg: "#FFF4E5", text: "#E67E22" },
  taxi: { bg: "#E8F5E9", text: "#2E7D32" },
  bike: { bg: "#E3F2FD", text: "#1565C0" },
};

export default function MapScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const mapRef = useRef(null);
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [distance, setDistance] = useState(0);
  const [routeCoords, setRouteCoords] = useState([]);
  const [animatedCoords, setAnimatedCoords] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [isFetchingLocation, setIsFetchingLocation] = useState(false);
  const [isLoadingRoute, setIsLoadingRoute] = useState(false);

  const drivers = [
    { id: 1, name: "Ramesh", type: "auto", latitude: 28.62, longitude: 77.21, photo: "https://randomuser.me/api/portraits/men/1.jpg" },
    { id: 2, name: "Suresh", type: "taxi", latitude: 28.61, longitude: 77.22, photo: "https://randomuser.me/api/portraits/men/2.jpg" },
    { id: 3, name: "Amit", type: "bike", latitude: 28.615, longitude: 77.215, photo: "https://randomuser.me/api/portraits/men/3.jpg" },
    { id: 4, name: "Rahul", type: "auto", latitude: 28.618, longitude: 77.225, photo: "https://randomuser.me/api/portraits/men/4.jpg" },
    { id: 5, name: "Vikas", type: "taxi", latitude: 28.623, longitude: 77.205, photo: "https://randomuser.me/api/portraits/men/5.jpg" },
  ];

  const setRoutePoints = (points) => {
    if (!points || !Array.isArray(points) || points.length === 0) return;
    setAnimatedCoords(points);
  };

  const handleGetCurrentLocation = async () => {
    if (isFetchingLocation) return;
    setIsFetchingLocation(true);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Location access",
          "Allow location access to center the map on your position and use nearby features."
        );
        return;
      }
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      const newLocation = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      setCurrentLocation(newLocation);
      if (mapRef.current) {
        mapRef.current.animateToRegion(
          {
            ...newLocation,
            latitudeDelta: 0.012,
            longitudeDelta: 0.012,
          },
          800
        );
      }
    } catch (err) {
      Alert.alert(
        "Couldn’t get location",
        "Please check that location services are on and try again."
      );
    } finally {
      setIsFetchingLocation(false);
    }
  };

  useEffect(() => {
    if (!origin || !destination || !GOOGLE_API_KEY) {
      setAnimatedCoords([]);
      setDistance(0);
      setRouteCoords([]);
      return;
    }
    let cancelled = false;
    setIsLoadingRoute(true);
    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin.latitude},${origin.longitude}&destination=${destination.latitude},${destination.longitude}&key=${GOOGLE_API_KEY}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (cancelled) return;
        if (data.status !== "OK" || !data.routes?.[0]) {
          Alert.alert("Route error", "Couldn't find a route. Try different pickup or drop points.");
          return;
        }
        const route = data.routes[0];
        let points = [];
        const overview = route.overview_polyline?.points;
        if (overview) {
          try {
            const decoded = decode(overview);
            points = decoded.map((p) => ({ latitude: p[0], longitude: p[1] }));
          } catch (_) {
            route.legs?.forEach((leg) => {
              leg.steps?.forEach((step) => {
                try {
                  const d = decode(step.polyline?.points || "");
                  d.forEach((p) => points.push({ latitude: p[0], longitude: p[1] }));
                } catch (_) {}
              });
            });
          }
        }
        if (points.length > 0) {
          const dist = route.legs?.reduce((s, l) => s + (l.distance?.value || 0), 0) / 1000;
          setDistance(dist);
          setRouteCoords(points);
          setRoutePoints(points);
          InteractionManager.runAfterInteractions(() => {
            if (mapRef.current && points.length > 0) {
              try {
                mapRef.current.fitToCoordinates(points, {
                  edgePadding: { top: 120, right: 48, bottom: 220, left: 48 },
                  animated: true,
                });
              } catch (_) {}
            }
          });
        }
      })
      .catch(() => {
        if (!cancelled) Alert.alert("Route error", "Couldn't fetch route. Check your connection.");
      })
      .finally(() => {
        if (!cancelled) setIsLoadingRoute(false);
      });
    return () => { cancelled = true; };
  }, [origin, destination]);

  const pricePerKm = 20;
  const estimatedPrice = distance * pricePerKm;
  const hasBottomSheet = distance > 0;
  const locateButtonBottom = hasBottomSheet ? 200 : 28;

  if (!GOOGLE_API_KEY) {
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center", padding: 24 }]}>
        <Text style={{ fontSize: 16, color: "#666", textAlign: "center" }}>
          Google Maps API key is missing. Add EXPO_PUBLIC_GOOGLE_MAPS_API_KEY to your .env file.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={[styles.searchWrapper, { top: insets.top + 8 }]}>
        <View style={styles.searchCard}>
          <GooglePlacesAutocomplete
            placeholder="Pickup location"
            fetchDetails
            onPress={(_, details = null) => {
              const loc = details?.geometry?.location;
              if (loc) setOrigin({ latitude: loc.lat, longitude: loc.lng });
            }}
            query={{ key: GOOGLE_API_KEY, language: "en" }}
            styles={{ textInput: styles.searchInput, container: { flex: 0 } }}
            textInputProps={{ placeholderTextColor: "#8E8E93" }}
            enablePoweredByContainer={false}
            minLength={2}
          />
          <View style={styles.searchDivider} />
          <GooglePlacesAutocomplete
            placeholder="Drop location"
            fetchDetails
            onPress={(_, details = null) => {
              const loc = details?.geometry?.location;
              if (loc) setDestination({ latitude: loc.lat, longitude: loc.lng });
            }}
            query={{ key: GOOGLE_API_KEY, language: "en" }}
            styles={{ textInput: styles.searchInput, container: { flex: 0 } }}
            textInputProps={{ placeholderTextColor: "#8E8E93" }}
            enablePoweredByContainer={false}
            minLength={2}
          />
        </View>
      </View>

      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: 28.6139,
          longitude: 77.209,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
        mapType="standard"
        showsUserLocation={false}
        showsMyLocationButton={false}
      >
        {animatedCoords.length > 0 && (
          <>
            <MapPolyline
              coordinates={animatedCoords}
              strokeWidth={12}
              strokeColor={ROUTE_COLORS.shadow}
              lineCap="round"
              lineJoin="round"
              zIndex={0}
            />
            <MapPolyline
              coordinates={animatedCoords}
              strokeWidth={5}
              strokeColor={ROUTE_COLORS.accent}
              lineCap="round"
              lineJoin="round"
              zIndex={1}
            />
          </>
        )}

        {origin && (
          <Marker
            coordinate={origin}
            title="Pickup"
            pinColor="#34C759"
            anchor={{ x: 0.5, y: 1 }}
          />
        )}
        {destination && (
          <Marker
            coordinate={destination}
            title="Drop"
            pinColor="#FF3B30"
            anchor={{ x: 0.5, y: 1 }}
          />
        )}

        {drivers.map((d) => (
          <Marker
            key={d.id}
            coordinate={{ latitude: d.latitude, longitude: d.longitude }}
            anchor={{ x: 0.5, y: 0.5 }}
          >
            <View style={styles.driverMarker}>
              <Image source={{ uri: d.photo }} style={styles.driverMarkerImage} />
            </View>
          </Marker>
        ))}
      </MapView>

      {origin && destination && isLoadingRoute && (
        <View style={[styles.loadingOverlay, { top: insets.top + 120 }]}>
          <View style={styles.loadingCard}>
            <ActivityIndicator size="large" color={ROUTE_COLORS.accent} />
            <Text style={styles.loadingText}>Finding route...</Text>
          </View>
        </View>
      )}

      <TouchableOpacity
        style={[
          styles.locateButton,
          {
            bottom: locateButtonBottom,
            opacity: isFetchingLocation ? 0.85 : 1,
          },
        ]}
        onPress={handleGetCurrentLocation}
        disabled={isFetchingLocation}
        activeOpacity={0.7}
      >
        {isFetchingLocation ? (
          <ActivityIndicator size="small" color={ROUTE_COLORS.accent} />
        ) : (
          <Ionicons name="locate" size={24} color={ROUTE_COLORS.accent} />
        )}
      </TouchableOpacity>

      {distance > 0 && (
        <View style={[styles.bottomSheet, { paddingBottom: insets.bottom + 12 }]}>
          <View style={styles.bottomHandle} />
          <View style={styles.bottomHeader}>
            <View>
              <Text style={styles.distanceLabel}>Trip</Text>
              <Text style={styles.distanceValue}>
                {distance.toFixed(1)} km · ₹{Math.round(estimatedPrice)}
              </Text>
            </View>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.driversScroll}
          >
            {drivers.map((d) => {
              const typeStyle = DRIVER_TYPE_COLORS[d.type] || DRIVER_TYPE_COLORS.auto;
              return (
                <TouchableOpacity
                  key={d.id}
                  style={styles.driverCard}
                  activeOpacity={0.8}
                  onPress={() =>
                    navigation.navigate("WorkerScreen", {
                      worker: { ...d, isRickshawDriver: true },
                      tripPrice: Math.round(estimatedPrice),
                    })
                  }
                >
                  <Image source={{ uri: d.photo }} style={styles.driverAvatar} />
                  <Text style={styles.driverName} numberOfLines={1}>
                    {d.name}
                  </Text>
                  <View style={[styles.driverTypeBadge, { backgroundColor: typeStyle.bg }]}>
                    <Text style={[styles.driverTypeText, { color: typeStyle.text }]}>
                      {d.type}
                    </Text>
                  </View>
                  <Text style={styles.driverPrice}>₹{Math.round(estimatedPrice)}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  loadingOverlay: {
    position: "absolute",
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: 20,
  },
  loadingCard: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
    ...Platform.select({
      android: { elevation: 4 },
      ios: { shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 8 },
    }),
  },
  loadingText: {
    marginTop: 8,
    fontSize: 14,
    color: "#666",
  },
  searchWrapper: {
    position: "absolute",
    left: 0,
    right: 0,
    zIndex: 10,
    paddingHorizontal: 16,
  },
  searchCard: {
    backgroundColor: "#fff",
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 4,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
      },
      android: { elevation: 4 },
    }),
  },
  searchInput: {
    fontSize: 16,
    backgroundColor: "transparent",
    paddingVertical: 12,
    color: "#1C1C1E",
  },
  searchDivider: {
    height: 1,
    backgroundColor: "#E5E5EA",
    marginLeft: 4,
  },
  locateButton: {
    position: "absolute",
    right: 16,
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.12,
        shadowRadius: 8,
      },
      android: { elevation: 6 },
    }),
  },
  bottomSheet: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 10,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.06,
        shadowRadius: 12,
      },
      android: { elevation: 8 },
    }),
  },
  bottomHandle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#C7C7CC",
    alignSelf: "center",
    marginBottom: 12,
  },
  bottomHeader: {
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  distanceLabel: {
    fontSize: 13,
    color: "#8E8E93",
    fontWeight: "500",
    marginBottom: 2,
  },
  distanceValue: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1C1C1E",
  },
  driversScroll: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  driverCard: {
    width: 128,
    alignItems: "center",
    backgroundColor: "#F2F2F7",
    borderRadius: 14,
    padding: 12,
    marginRight: 12,
  },
  driverAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginBottom: 8,
  },
  driverName: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1C1C1E",
    marginBottom: 4,
  },
  driverTypeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: 6,
  },
  driverTypeText: {
    fontSize: 11,
    fontWeight: "600",
    textTransform: "uppercase",
  },
  driverPrice: {
    fontSize: 16,
    fontWeight: "700",
    color: "#007AFF",
  },
  driverMarker: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: "#fff",
    overflow: "hidden",
    ...Platform.select({
      ios: { shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.2, shadowRadius: 3 },
      android: { elevation: 3 },
    }),
  },
  driverMarkerImage: {
    width: "100%",
    height: "100%",
  },
});
