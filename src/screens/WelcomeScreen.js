import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image
        source={require("../assets/logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      {/* White Card */}
      <View style={styles.card}>
        <Text style={styles.title}>Welcome</Text>
        <Text style={styles.subtitle}>
          Hire all type of labours and everything else needed to build and
          maintain your home within just one click
        </Text>

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.signInBtn}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={styles.signInText}>Sign In</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.signUpBtn}
            onPress={() => navigation.navigate("Signup")}
          >
            <Text style={styles.signUpText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FF1E1E",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  logo: {
    width: 250,
    height: 250,
    marginBottom: 140,
  },
  card: {
    backgroundColor: "#FFFFFF",
    width: "100%",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 65,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: "#555",
    marginBottom: 25,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  signInBtn: {
    backgroundColor: "#000",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 30,
  },
  signInText: {
    color: "#fff",
    fontWeight: "600",
  },
  signUpBtn: {
    borderWidth: 1.5,
    borderColor: "#000",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 30,
  },
  signUpText: {
    fontWeight: "600",
  },
});
