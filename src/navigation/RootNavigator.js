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
import LabourJob from "../components/LabourJob";
import RazorpayPayment from "../components/RazorpayPayment";
import ProfileScreen from "../screens/home/ProfileScreen";
import WorkerListScreen from "../screens/home/SearchScreen";
import MapScreen from "../screens/home/MapScreen";
import LabourTeamScreen from "../screens/home/LabourTeamScreen";
import HiredWorkersScreen from "../screens/contractorAction/hired/HiredWorkersScreen";
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
        <Stack.Screen name="LabourJob" component={LabourJob} />
        <Stack.Screen name="RazorpayPayment" component={RazorpayPayment} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="WorkerListScreen" component={WorkerListScreen} />
        <Stack.Screen name="LabourTeamScreen" component={LabourTeamScreen} />
        <Stack.Screen name="HiredWorkers" component={HiredWorkersScreen} />
        <Stack.Screen name="MapScreen" component={MapScreen} />
        </>
   
      ) : (
        // ✅ ALWAYS render Auth when not logged in
        <Stack.Screen name="Auth" component={AuthNavigator} />
      )}
    </Stack.Navigator>
  );
}
