import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { AuthContext } from "../context/AuthContext";
import AuthNavigator from "./AuthNavigator";
import TabNavigator from "./TabNavigator";
// import Loader from "../components/Loader";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  // const { user, loading } = useContext(AuthContext);

  // if (loading) return <Loader />;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>

        <Stack.Screen name="Auth" component={AuthNavigator} />
        <Stack.Screen name="Tabs" component={TabNavigator} />
        
    </Stack.Navigator>
  );
}
