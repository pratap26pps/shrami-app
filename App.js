import * as Linking from "expo-linking";
import { useEffect, useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./src/navigation/RootNavigator";
import { AuthProvider, AuthContext } from "./src/context/AuthContext";

function DeepLinkHandler() {
  const { loginWithToken, setGoogleProfile } = useContext(AuthContext);

  useEffect(() => {
    const handleUrl = (url) => {
      const { path, queryParams } = Linking.parse(url);

      // Existing user
      if (path === "auth-success" && queryParams?.token) {
        loginWithToken(queryParams.token);
      }

      // New user
      if (path === "google-callback") {
        setGoogleProfile(queryParams);
      }
    };

    // When app is opened from killed state
    Linking.getInitialURL().then((url) => {
      if (url) handleUrl(url);
    });

    // When app is already running
    const subscription = Linking.addEventListener("url", ({ url }) =>
      handleUrl(url)
    );

    return () => subscription.remove();
  }, []);

  return null;
}

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <DeepLinkHandler />
        <RootNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}
