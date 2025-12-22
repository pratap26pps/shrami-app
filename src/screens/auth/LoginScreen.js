import React, { useContext } from "react";
import { View, Text, Button } from "react-native";
import { AuthContext } from "../../context/AuthContext";

export default function LoginScreen() {
  const { login } = useContext(AuthContext);

  return (
    <View>
      <Text>Login Screen</Text>
      <Text>Login Screen</Text>
      <Text>Login Screen</Text>
      <Text>Login Screen</Text>
      <Text>Login Screen</Text>
      <Text>Login Screen</Text>
      <Text>Pankaj</Text>
      <Text>Jivesh</Text>
      <Text>Mehar </Text>
      
      <Button
        title="Login"
        onPress={() => login({ id: 1, name: "Shrami User" })}
      />
    </View>
  );
}
