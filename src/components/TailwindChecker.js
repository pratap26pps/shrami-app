/** @jsxImportSource nativewind */
 
import { View, Text } from "react-native";

export default function TailwindChecker() {
 

  return (
    <View style={{ padding: 8 }}>
      <Text style={{ marginBottom: 8 }}>Tailwind runtime test:</Text>
      <View className="h-8 bg-green-500 w-full mb-2" />
    </View>
  );
}
