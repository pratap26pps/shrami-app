import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { auth } from "../../services/firebase";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { PhoneAuthProvider, signInWithCredential } from "firebase/auth";

export default function LoginScreen() {
  const [phone, setPhone] = useState("");
  const [verificationId, setVerificationId] = useState(null);
  const [otp, setOtp] = useState("");

  const recaptchaVerifier = React.useRef(null);

  const sendOTP = async () => {
    const provider = new PhoneAuthProvider(auth);
    const id = await provider.verifyPhoneNumber(
      `+91${phone}`,
      recaptchaVerifier.current
    );
    setVerificationId(id);
    alert("OTP Sent");
  };

  const verifyOTP = async () => {
    const credential = PhoneAuthProvider.credential(
      verificationId,
      otp
    );
    const result = await signInWithCredential(auth, credential);

    const token = await result.user.getIdToken();
    console.log("Firebase Token:", token);

    // Send token to backend
    await fetch("http://localhost:5000/api/auth/phone-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    });
  };

  return (
    <View style={{ padding: 20 }}>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={auth.app.options}
      />

      <Text>Phone Number</Text>
      <TextInput
        placeholder="9876543210"
        keyboardType="phone-pad"
        onChangeText={setPhone}
      />
      <Button title="Send OTP" onPress={sendOTP} />

      {verificationId && (
        <>
          <TextInput placeholder="OTP" onChangeText={setOtp} />
          <Button title="Verify OTP" onPress={verifyOTP} />
        </>
      )}
    </View>
  );
}
