import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

export default function AboutUsScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backBtn}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        >
          <Feather name="arrow-left" size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text style={styles.title}>About Us</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.logoSection}>
          <Image
            source={require("../../assets/redlogo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
          
          <Text style={styles.tagline}>Your trusted labour & ride booking partner</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About the App</Text>
          <Text style={styles.paragraph}>
            Shrami is a one-stop platform connecting you with skilled labour and reliable drivers.
            Whether you need construction workers, house help, rickshaw rides, or taxi services,
            we make it easy to find, hire, and pay—all in one place.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Our Mission</Text>
          <Text style={styles.paragraph}>
            To empower workers and simplify hiring for everyone. We believe in transparency,
            fair pricing, and building trust between service providers and customers.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>What We Offer</Text>
          <View style={styles.featureList}>
            <View style={styles.featureItem}>
              <Feather name="check-circle" size={18} color="#E53935" />
              <Text style={styles.featureText}>Labour hiring (construction, electricians, plumbers)</Text>
            </View>
            <View style={styles.featureItem}>
              <Feather name="check-circle" size={18} color="#E53935" />
              <Text style={styles.featureText}>Rickshaw, taxi & tempo booking</Text>
            </View>
            <View style={styles.featureItem}>
              <Feather name="check-circle" size={18} color="#E53935" />
              <Text style={styles.featureText}>Secure payments via Razorpay</Text>
            </View>
            <View style={styles.featureItem}>
              <Feather name="check-circle" size={18} color="#E53935" />
              <Text style={styles.featureText}>Transparent pricing & payment history</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Us</Text>
          <Text style={styles.paragraph}>
            Have questions or feedback? We'd love to hear from you.
          </Text>
          <View style={styles.contactRow}>
            <Feather name="mail" size={18} color="#6B7280" />
            <Text style={styles.contactText}>support@shrami.com</Text>
          </View>
          <View style={styles.contactRow}>
            <Feather name="phone" size={18} color="#6B7280" />
            <Text style={styles.contactText}>+91 1800-XXX-XXXX</Text>
          </View>
        </View>

        <Text style={styles.footer}>© 2026 Shrami. All rights reserved.</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDF2F2",
    paddingTop: 48,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginBottom: 8,
  },
  backBtn: {
    padding: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1F2937",
  },
  placeholder: {
    width: 32,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  logoSection: {
    alignItems: "center",
    marginBottom: 32,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 12,
  },
  appName: {
    fontSize: 24,
    fontWeight: "700",
    color: "#E53935",
    marginBottom: 4,
  },
  tagline: {
    fontSize: 14,
    color: "#6B7280",
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 15,
    color: "#4B5563",
    lineHeight: 24,
  },
  featureList: {},
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  featureText: {
    fontSize: 15,
    color: "#4B5563",
    marginLeft: 10,
    flex: 1,
  },
  contactRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  contactText: {
    fontSize: 15,
    color: "#4B5563",
    marginLeft: 10,
  },
  footer: {
    fontSize: 12,
    color: "#9CA3AF",
    textAlign: "center",
    marginTop: 32,
  },
});
