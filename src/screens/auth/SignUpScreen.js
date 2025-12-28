import React, { useState ,useRef} from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Image,
  KeyboardAvoidingView, Platform
} from "react-native";
import { auth } from "../../services/firebase";
import { PhoneAuthProvider, signInWithCredential } from "firebase/auth";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";

export default function SignUpScreen() {

      const [phone, setPhone] = useState("");
      const [verificationId, setVerificationId] = useState(null);
      const [otp, setOtp] = useState("");
    
      const recaptchaVerifier = useRef(null);
    
     const sendOTP = async () => {
      try {
        if (!phone || phone.length !== 10) {
          alert("Enter valid 10 digit phone number");
          return;
        }
    
        const provider = new PhoneAuthProvider(auth);
    
        const id = await provider.verifyPhoneNumber(
          `+91${phone}`,
          recaptchaVerifier.current
        );
    
        setVerificationId(id);
        alert("OTP Sent");
      } catch (error) {
        console.log("SEND OTP ERROR 👉", error);
        alert(error.message);
      }
    };
    
    
      const verifyOTP = async () => {
        try {
          const credential = PhoneAuthProvider.credential(verificationId, otp);
          const result = await signInWithCredential(auth, credential);
    
          const token = await result.user.getIdToken();
          console.log("Firebase Token:", token);
    
          await fetch("http://192.168.3.7:5000/api/auth/phone-login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token }),
          });
        } catch (error) {
          console.log("VERIFY OTP ERROR 👉", error);
          alert(error.message);
        }
      };
    

  return (
    <SafeAreaView style={styles.container}>
        
      <View style={styles.header}>
        <Text style={styles.title}>Sign Up</Text>
        <Text style={styles.subtitle}>
          Sign in if already having an account
        </Text>
      </View>

    {!verificationId ?(
      <View style={styles.form}>
      
       <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={auth.app.options}
      />
      
        <TextInput placeholder="Full name" style={styles.input} />

        <TextInput placeholder="Account type" style={styles.input} />

        <TextInput
          placeholder="Contact no."
          style={styles.input}
          keyboardType="phone-pad"
           onChangeText={setPhone}
        />
 
        <TextInput
          placeholder="Password"
          style={styles.input}
          secureTextEntry
        />

        <TouchableOpacity onPress={sendOTP}  style={styles.primaryBtn}>
          <Text style={styles.primaryBtnText}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.googleBtn}>
          <Image
            source={require("../../assets/images/google.png")}
            style={styles.googleIcon}
          />
          <Text style={styles.googleText}>Continue with Google</Text>
        </TouchableOpacity>
      </View>
       ):
         (
        <>
         <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.card}>
        <Text style={styles.title}>OTP Verification</Text>
        <Text style={styles.subtitle}>Enter the OTP sent to your number</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter OTP"
          keyboardType="number-pad"
          value={otp}
          onChangeText={setOtp}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={() => verifyOTP(otp)}
        >
          <Text style={styles.buttonText}>Verify OTP</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
        </>
      )}


    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FF1E1E",

  },

  header: {
    padding: 20,
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#000",
  },

  subtitle: {
    color: "#000",
    marginTop: 4,
  },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },

  statBox: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 14,
    width: "30%",
    alignItems: "center",
  },

  statText: {
    fontWeight: "bold",
    textAlign: "center",
  },

  form: {
    flex: 1,
    backgroundColor: "#FFF5F5",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    marginTop:112,
    marginBottom: -35,
  },

  input: {
    backgroundColor: "#EDEDED",
    padding: 14,
    borderRadius: 25,
    marginBottom: 14,
  },

  forgot: {
    alignSelf: "flex-end",
    marginBottom: 20,
    fontWeight: "500",
  },

  primaryBtn: {
    backgroundColor: "#000",
    padding: 16,
    borderRadius: 30,
    alignItems: "center",
    marginBottom: 14,
  },

  primaryBtnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

  googleBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 30,
    padding: 14,
  },

  googleIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },

  googleText: {
    fontWeight: "bold",
  },


   card: {
    flex: 1,
    backgroundColor: "#FFF5F5",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 25,
     marginBottom:-34,
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },

  input: {
    backgroundColor: "#EDEDED",
    padding: 16,
    borderRadius: 30,
    marginBottom: 20,
    fontSize: 16,
    color: "#333",
  },

  button: {
    backgroundColor: "#000",
    padding: 16,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 25,
  },
});
