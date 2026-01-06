import React, { createContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [token, setToken] = useState(null);
  const [googleProfile, setGoogleProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

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
  const loginWithToken = async (jwt,userData) => {
    await SecureStore.setItemAsync("token", jwt);
    setToken(jwt);
     setUser(userData);
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
        user,
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
