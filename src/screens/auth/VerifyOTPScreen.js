import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useState } from "react";
import { auth } from "../../services/firebase";
import { PhoneAuthProvider, signInWithCredential } from "firebase/auth";

export default function VerifyOTPScreen({ route, navigation }) {
  const { verificationId, contactNumber } = route.params;
  const [otp, setOtp] = useState("");

  const verifyOTP = async () => {
    if (otp.length !== 6) {
      return Alert.alert("Error", "Enter valid OTP");
    }

    try {
      const credential = PhoneAuthProvider.credential(
        verificationId,
        otp
      );

      const result = await signInWithCredential(auth, credential);
      const token = await result.user.getIdToken();

      // 🔥 Send token to backend
      const res = await fetch(
        "https://shrami-backend.onrender.com/api/auth/forgot-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        }
      );

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error);
      }

      Alert.alert("Verified", "You can reset password now");
      navigation.navigate("ResetPassword", { contactNumber });

    } catch (err) {
      Alert.alert("Error", err.message);
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Enter OTP"
        keyboardType="number-pad"
        maxLength={6}
        onChangeText={setOtp}
      />
      <TouchableOpacity onPress={verifyOTP}>
        <Text>Verify OTP</Text>
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

