import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthContext } from "../context/AuthContext";

import AuthNavigator from "./AuthNavigator";
import TabNavigator from "./TabNavigator";
import Loader from "../components/Loader";
import WorkerScreen from "../screens/home/WorkerScreen";

import CleaningScreen from "../screens/contractorAction/workstatus";
import CheckoutScreen from "../screens/contractorAction/cart";
import { PaymentHistory } from "../screens/contractorAction/paymenthistory";
import PickUpScreen from "../screens/Rickshaw.js/PickUpScreen";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const { token, googleProfile, loading } = useContext(AuthContext);
 console.log("token",token)
  if (loading) return <Loader />;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
           {/* ✅ Logged in user */}
      {token? (
        <>
        <Stack.Screen name="Tabs" component={TabNavigator} />
        <Stack.Screen name="Worker" component={CleaningScreen} />
        <Stack.Screen name="CheckoutScreen" component={CheckoutScreen} />
        <Stack.Screen name="Payment" component={PaymentHistory} />
        <Stack.Screen name="PickUpScreen" component={PickUpScreen} />
        <Stack.Screen name="WorkerScreen" component={WorkerScreen} />
        </>
   
      ) : (
        // ✅ ALWAYS render Auth when not logged in
        <Stack.Screen name="Auth" component={AuthNavigator} />
      )}
    </Stack.Navigator>
  );
}
