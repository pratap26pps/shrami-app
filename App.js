/** @jsxImportSource nativewind */
import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./src/navigation/RootNavigator";
import { AuthProvider } from "./src/context/AuthContext";
import TailwindChecker from "./src/components/TailwindChecker";

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <TailwindChecker />
        <RootNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}
