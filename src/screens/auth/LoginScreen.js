import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

 
export default function LoginScreen() {
 
 function StatBox({ text }) {
  return (
    <View style={styles.statBox}>
      <Text style={styles.statText}>{text}</Text>
    </View>
  );
}
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Sign In</Text>
        <Text style={styles.subtitle}>
          Register for free if you are new
        </Text>

        <View style={styles.statsRow}>
          <StatBox text="1000+ Workers" />
          <StatBox text="250+ Projects" />
          <StatBox text="100% Trusted" />
        </View>
      </View>

   
      {/* Form */}
      <View style={styles.form}>
        <TextInput
          placeholder="Contact no."
          style={styles.input}
          keyboardType="phone-pad"
        />

        <TextInput
          placeholder="Password"
          style={styles.input}
          secureTextEntry
        />

        <Text style={styles.forgot}>Forgot Password?</Text>

        <TouchableOpacity style={styles.primaryBtn}>
          <Text style={styles.primaryBtnText}>Sign In</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.googleBtn}>
          <Image
            source={require("../../assets/images/google.png")}
            style={styles.googleIcon}
          />
          <Text style={styles.googleText}>Continue with Google</Text>
        </TouchableOpacity>
      </View>
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
});

