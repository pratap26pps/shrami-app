 import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/auth/LoginScreen";
import SplashScreen from "../screens/SplashScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import SignUpScreen from "../screens/auth/SignUpScreen";
import ForgotPasswordScreen from "../screens/auth/ForgotPasswordScreen";
import ResetPasswordScreen from "../screens/auth/ResetPasswordScreen";
import ProfileScreen from "../screens/home/ProfileScreen";

const Stack = createNativeStackNavigator();

export default function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignUpScreen} />

      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />

      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
}
