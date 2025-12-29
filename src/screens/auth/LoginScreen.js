import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import { useState } from "react";

export default function LoginScreen() {
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);

  const [contactNumber, setContactNumber] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const loginhandler = async () => {
    if (!contactNumber || contactNumber.length !== 10) {
      return Alert.alert("Error", "Enter valid 10 digit contact number");
    }

    if (!password || password.length < 6) {
      return Alert.alert("Error", "Password must be at least 6 characters");
    }

    try {
      setLoading(true);

      const response = await fetch(
        "https://shrami-backend.onrender.com/api/auth/LoginHandler",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ContactNumber: contactNumber,
            password,
          }),
        }
      );

      const data = await response.json();
      console.log("LoginHandler", data);
      if (!response.ok || !data.success) {
        throw new Error(data.error || "Login failed");
      }

      Alert.alert(
        "Success",
        "Login successful 🎉",
        [
          {
            text: "OK",
            onPress: () => navigation.replace("Tabs"),
          },
        ],
        { cancelable: false }
      );
    } catch (error) {
      Alert.alert("Login Failed", error.message);
    } finally {
      setLoading(false);
    }
  };

  function StatBox({ text }) {
    return (
      <View style={styles.statBox}>
        <Text style={styles.statText}>{text}</Text>
      </View>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.nevbar}>
        <Ionicons
          onPress={() => navigation.navigate("Welcome")}
          name="arrow-back"
          size={26}
          color="#555"
        />
        <Text
          onPress={() => navigation.navigate("Signup")}
          style={styles.Register}
        >
          Register
        </Text>
      </View>

      <View style={styles.header}>
        <Text style={styles.title}>Sign In</Text>
        <Text style={styles.subtitle}>Register for free if you are new</Text>

        <View style={styles.statsRow}>
          <StatBox text="1000+ Workers" />
          <StatBox text="250+ Projects" />
          <StatBox text="100% Trusted" />
        </View>
      </View>

      {/* Form */}
      <View style={styles.form}>
        <TextInput
          placeholder="Contact no."
          style={styles.input}
          keyboardType="phone-pad"
          maxLength={10}
          value={contactNumber}
          onChangeText={setContactNumber}
        />

        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="Password"
            style={styles.passwordInput}
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Ionicons
              name={showPassword ? "eye-off" : "eye"}
              size={22}
              color="#555"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
          <Text style={styles.forgot}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.primaryBtn, loading && { opacity: 0.7 }]}
          onPress={loginhandler}
          disabled={loading}
        >
          <Text style={styles.primaryBtnText}>
            {loading ? "Signing In..." : "Sign In"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            Linking.openURL(
              "https://shrami-backend.onrender.com/api/auth/google"
            )
          }
          style={styles.googleBtn}
        >
          <Image
            source={require("../../assets/images/google.png")}
            style={styles.googleIcon}
          />
          <Text style={styles.googleText}>Continue with Google</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FF1E1E",
  },

  header: {
    padding: 20,
  },

  nevbar: {
    flexDirection: "row",
    fontWeight: "bold",
    color: "#000",
    justifyContent: "space-between",
    margin: 8,
  },
  Register: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#000",
  },

  subtitle: {
    color: "#000",
    marginTop: 4,
  },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },

  statBox: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 14,
    width: "30%",
    alignItems: "center",
  },

  statText: {
    fontWeight: "bold",
    textAlign: "center",
  },

  form: {
    flex: 1,
    backgroundColor: "#FFF5F5",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    marginTop: 112,
    marginBottom: -35,
  },

  input: {
    backgroundColor: "#EDEDED",
    padding: 14,
    borderRadius: 25,
    marginBottom: 14,
  },

  forgot: {
    alignSelf: "flex-end",
    marginBottom: 20,
    fontWeight: "500",
  },

  primaryBtn: {
    backgroundColor: "#000",
    padding: 16,
    borderRadius: 30,
    alignItems: "center",
    marginBottom: 14,
  },

  primaryBtnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

  googleBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 30,
    padding: 14,
  },

  googleIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },

  googleText: {
    fontWeight: "bold",
  },

  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EDEDED",
    borderRadius: 25,
    paddingHorizontal: 16,
    marginBottom: 14,
  },

  passwordInput: {
    flex: 1,
    paddingVertical: 14,
  },
});
