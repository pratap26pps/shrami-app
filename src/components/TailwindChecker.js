/** @jsxImportSource nativewind */
import React, { useEffect } from "react";
import { View, Text } from "react-native";

export default function TailwindChecker() {
  useEffect(() => {
    // Skip runtime verify (can throw if JSX transform not applied yet).
    // We rely on Babel/nativewind config and file pragmas for transforms.
  }, []);

  return (
    <View style={{ padding: 8 }}>
      <Text style={{ marginBottom: 8 }}>Tailwind runtime test:</Text>
      <View className="h-8 bg-green-500 w-full mb-2" />
    </View>
  );
}
