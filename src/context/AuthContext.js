import React, { createContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [googleProfile, setGoogleProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  /* Load token on app start */
  useEffect(() => {
    const loadToken = async () => {
      try {
        const storedToken = await SecureStore.getItemAsync("token");
        if (storedToken) {
          setToken(storedToken);
        }
      } catch (err) {
        console.log("Token load failed");
      } finally {
        setLoading(false);
      }
    };

    loadToken();
  }, []);

  /* Existing user login */
  const loginWithToken = async (jwt) => {
    await SecureStore.setItemAsync("token", jwt);
    setToken(jwt);
    setGoogleProfile(null);
  };

  /* Logout */
  const logout = async () => {
    await SecureStore.deleteItemAsync("token");
    setToken(null);
    setGoogleProfile(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        googleProfile,
        setGoogleProfile,
        loginWithToken,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
