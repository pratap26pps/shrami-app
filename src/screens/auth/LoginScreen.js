import { useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import { sendOtp } from "../../services/firebaseAuth";

export default function LoginScreen({ navigation }) {
  const [phone, setPhone] = useState("");

  const handleSendOtp = async () => {
    const confirmation = await sendOtp(`+91${phone}`);
    navigation.navigate("OtpScreen", { confirmation });
  };

  return (
    <View className="flex-1 mt-32 justify-center px-5">
      <Text className="text-xl text-center mb-3">Enter Mobile Number</Text>

      <TextInput
        placeholder="10 digit mobile number"
        keyboardType="number-pad"
        value={phone}
        onChangeText={setPhone}
        className="border p-3 mb-4 text-center text-lg font-medium"
      />

      <Pressable
  onPress={handleSendOtp}
  className="bg-blue-600 py-3 rounded-lg"
>
  <Text className="text-white text-center text-lg font-semibold">
    Send OTP
  </Text>
</Pressable>
    </View>
  );
}
