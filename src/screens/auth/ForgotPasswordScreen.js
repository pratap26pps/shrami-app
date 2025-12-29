import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { useState } from "react";
import { auth } from "../../services/firebase";
import { signInWithPhoneNumber } from "firebase/auth";

export default function ForgotPasswordScreen({ navigation }) {
  const [contactNumber, setContactNumber] = useState("");
  const [loading, setLoading] = useState(false);

  const sendOTP = async () => {
    if (contactNumber.length !== 10) {
      return Alert.alert("Error", "Enter valid 10 digit number");
    }

    try {
      setLoading(true);

      const phone = `+91${contactNumber}`;

      // 🔥 Send OTP
      const confirmation = await signInWithPhoneNumber(auth, phone);

      Alert.alert("OTP Sent", "Check your phone");

      navigation.navigate("VerifyOTP", {
        verificationId: confirmation.verificationId,
        contactNumber,
      });

    } catch (err) {
      Alert.alert("Error", err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot Password</Text>

      <TextInput
        placeholder="Contact Number"
        style={styles.input}
        keyboardType="phone-pad"
        maxLength={10}
        value={contactNumber}
        onChangeText={setContactNumber}
      />

      <TouchableOpacity style={styles.btn} onPress={sendOTP} disabled={loading}>
        <Text style={styles.btnText}>
          {loading ? "Sending..." : "Send OTP"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF5F5",
    padding: 24,
    justifyContent: "center",
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 30,
    textAlign: "center",
  },

  input: {
    backgroundColor: "#EDEDED",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 30,
    fontSize: 16,
    marginBottom: 20,
  },

  btn: {
    backgroundColor: "#000",
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: "center",
    elevation: 3,
  },

  btnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

