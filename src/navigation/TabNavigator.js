import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image } from "react-native";

import HomeScreen from "../screens/home/HomeScreen";
 import WorkerListScreen from "../screens/home/SearchScreen";
 import ProfileScreen from "../screens/home/ProfileScreen";
 import CheckoutScreen from "../screens/contractorAction/cart";
 
const Tab = createBottomTabNavigator();

const TAB_ICONS = {
  Home: {
    inactive: require("../assets/images/home.png"),
    active: require("../assets/images/home.png"),
  },
    Search: {
    inactive: require("../assets/images/search.png"),
    active: require("../assets/images/search.png"),
  },
    Cart: {
    inactive: require("../assets/images/cart.png"),
    active: require("../assets/images/cart.png"),
  },
   Profile: {
    inactive: require("../assets/images/setting.png"),
    active: require("../assets/images/setting.png"),
  }, 
  
};

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarIcon: ({ focused }) => {
          const icon = focused
            ? TAB_ICONS[route.name].active
            : TAB_ICONS[route.name].inactive;

          return (
            <Image
              source={icon}
              style={{ width: 24, height: 24 }}
              resizeMode="contain"
            />
          );
        },
        tabBarStyle: {
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={WorkerListScreen} />
      <Tab.Screen name="Cart" component={CheckoutScreen } />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
