import { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { verifyOtp } from "../../services/firebaseAuth";
import axios from "axios";

export default function OtpScreen({ route }) {
  const { confirmation } = route.params;
  const [otp, setOtp] = useState("");

  const handleVerifyOtp = async () => {
    const token = await verifyOtp(confirmation, otp);

    // Send token to backend
    await axios.post("https://your-backend.com/verify-phone", {
      token,
    });

    alert("Login Successful");
  };

  return (
    <View className="flex-1 justify-center px-5">
      <Text className="text-xl mb-3">Enter OTP</Text>

      <TextInput
        placeholder="6 digit OTP"
        keyboardType="number-pad"
        value={otp}
        onChangeText={setOtp}
        className="border p-3 mb-4"
      />

      <Button title="Verify OTP" onPress={handleVerifyOtp} />
    </View>
  );
}
