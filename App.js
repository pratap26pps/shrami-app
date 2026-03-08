import * as Linking from "expo-linking";
import { useEffect, useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import RootNavigator from "./src/navigation/RootNavigator";
import { AuthProvider, AuthContext } from "./src/context/AuthContext";
import { HireProvider } from "./src/context/HireContext";

function DeepLinkHandler() {
  const { loginWithToken, setGoogleProfile } = useContext(AuthContext);

  useEffect(() => {
    const handleUrl = (url) => {
      const { path, hostname, queryParams } = Linking.parse(url);
      // expo-linking: scheme://auth-success?token=... gives hostname="auth-success", path=null
      const isAuthSuccess = path === "auth-success" || hostname === "auth-success";

      // Existing user (Google OAuth callback)
      if (isAuthSuccess && queryParams?.token) {
        loginWithToken(queryParams.token);
      }

      // New user
      const isGoogleCallback = path === "google-callback" || hostname === "google-callback";
      if (isGoogleCallback) {
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


const linking = {
  prefixes: ["shramiapp://"],
  // config: {
  //   screens: {
  //     Tabs: {
  //       screens: {
  //         Home: "home",
  //         Search: "search",
  //         Cart: "cart",
  //         Setting: "setting",
  //       },
  //     },
  //     AuthSuccess: "auth-success",
  //   },
  // },
};

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <HireProvider>
          <NavigationContainer linking={linking}>
            <DeepLinkHandler />
            <RootNavigator />
          </NavigationContainer>
        </HireProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
