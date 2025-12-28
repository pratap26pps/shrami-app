import { initializeApp } from "firebase/app";
import {
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";


const firebaseConfig = {
  apiKey: "AIzaSyCH1_jNvfyY35XZPHML8BNWLU3jHDaRDMQ",
  authDomain: "shrami-46183.firebaseapp.com",
  projectId: "shrami-46183",
  storageBucket: "shrami-46183.appspot.com",
  messagingSenderId: "1023326837240",
  appId: "1:1023326837240:web:18c26dbe0a102707559e0d",
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
