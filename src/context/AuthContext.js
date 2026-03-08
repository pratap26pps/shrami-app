import React, { createContext, useEffect, useState, useCallback } from "react";
import * as SecureStore from "expo-secure-store";

const API_BASE = "https://shrami-backend.onrender.com";
const USER_STORAGE_KEY = "user";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [googleProfile, setGoogleProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const saveUserToStorage = useCallback(async (userData) => {
    try {
      if (userData) {
        await SecureStore.setItemAsync(USER_STORAGE_KEY, JSON.stringify(userData));
      } else {
        await SecureStore.deleteItemAsync(USER_STORAGE_KEY);
      }
    } catch (e) {
      console.log("Save user failed", e?.message);
    }
  }, []);

  const fetchUserFromApi = useCallback(async (jwt) => {
    if (!jwt) return null;
    try {
      const res = await fetch(`${API_BASE}/api/auth/me`, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      const data = await res.json();
      if (data.success && data.user) return data.user;
    } catch (err) {
      console.log("Fetch user failed", err?.message);
    }
    return null;
  }, []);

  /* Load token + user on app start (persisted across restarts) */
  useEffect(() => {
    const loadTokenAndUser = async () => {
      try {
        const storedToken = await SecureStore.getItemAsync("token");
        if (storedToken) {
          setToken(storedToken);
          const storedUser = await SecureStore.getItemAsync(USER_STORAGE_KEY);
          if (storedUser) {
            try {
              setUser(JSON.parse(storedUser));
            } catch (_) {}
          }
          const freshUser = await fetchUserFromApi(storedToken);
          if (freshUser) {
            setUser(freshUser);
            await saveUserToStorage(freshUser);
          }
        }
      } catch (err) {
        console.log("Token load failed", err?.message);
      } finally {
        setLoading(false);
      }
    };

    loadTokenAndUser();
  }, [fetchUserFromApi, saveUserToStorage]);

  /* Login: store token and set user (from param or fetch), persist user */
  const loginWithToken = useCallback(async (jwt, userData) => {
    await SecureStore.setItemAsync("token", jwt);
    setToken(jwt);
    if (userData) {
      setUser(userData);
      await saveUserToStorage(userData);
    } else {
      const fetched = await fetchUserFromApi(jwt);
      if (fetched) {
        setUser(fetched);
        await saveUserToStorage(fetched);
      }
    }
    setGoogleProfile(null);
  }, [fetchUserFromApi, saveUserToStorage]);

  /* Logout: clear token and user from memory and storage */
  const logout = useCallback(async () => {
    await SecureStore.deleteItemAsync("token");
    await SecureStore.deleteItemAsync(USER_STORAGE_KEY);
    setToken(null);
    setUser(null);
    setGoogleProfile(null);
  }, []);

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
