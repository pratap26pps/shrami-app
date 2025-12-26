import React, { useContext } from "react";
import { View, Text, Button } from "react-native";
import { AuthContext } from "../../context/AuthContext";

export default function LoginScreen() {
  const { login } = useContext(AuthContext);

  return (
    <View className="flex-1 bg-gray-100 justify-center px-5">
      <Text className="text-2xl font-bold text-center mb-6">
        Login Screen
      </Text>

      <View className="items-center mb-8">
        <Text className="text-lg">Pankaj</Text>
        <Text className="text-lg">Jivesh</Text>
        <Text className="text-lg text-green-800">Mehar</Text>
      </View>

      <Button
        title="Login"
        onPress={() => login({ id: 1, name: "Shrami User" })}
      />
    </View>
  );
}
