import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthContext } from "../context/AuthContext";

import AuthNavigator from "./AuthNavigator";
import TabNavigator from "./TabNavigator";
import SignupNavigator from "./SignupNavigator";
import Loader from "../components/Loader";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const { token, googleProfile, loading } = useContext(AuthContext);

  if (loading) return <Loader />;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* Logged in user */}
      {token && (
        <Stack.Screen name="Tabs" component={TabNavigator} />
      )}

      {/* New Google user */}
      {!token && googleProfile && (
        <Stack.Screen
          name="Signup"
          component={SignupNavigator}
          initialParams={googleProfile}
        />
      )}

      {/* Not logged in */}
      {!token && !googleProfile && (
        <Stack.Screen name="Auth" component={AuthNavigator} />
      )}
    </Stack.Navigator>
  );
}
