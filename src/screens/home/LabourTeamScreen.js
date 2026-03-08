import { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { useContext } from "react";
import { HireContext } from "../../context/HireContext";

const API_WORKERS = "https://shrami-backend.onrender.com/api/worker/getWorkers";

export default function LabourTeamScreen() {
  const navigation = useNavigation();
  const { addWorkers } = useContext(HireContext);
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState(new Set());

  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        const res = await fetch(API_WORKERS);
        const result = await res.json();
        setWorkers(result.data || []);
      } catch (err) {
        console.log("Fetch workers failed", err?.message);
      } finally {
        setLoading(false);
      }
    };
    fetchWorkers();
  }, []);

  const toggleWorker = (id) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const selectedWorkers = workers.filter((w) =>
    selectedIds.has(w._id?.toString() || w.id?.toString())
  );
  const selectedCount = selectedWorkers.length;

  const addTeamToCart = () => {
    if (selectedCount === 0) return;
    addWorkers(selectedWorkers);
    navigation.navigate("CheckoutScreen");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Feather name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Make Labour Team</Text>
        <View style={styles.placeholder} />
      </View>

      <Text style={styles.subtitle}>
        Select workers to add to your team. Then pay for all in cart.
      </Text>

      {loading ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#E53935" />
        </View>
      ) : (
        <ScrollView
          style={styles.list}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        >
          {workers.map((worker, index) => {
            const id = worker._id?.toString() || worker.id?.toString() || index;
            const isSelected = selectedIds.has(id);
            return (
              <TouchableOpacity
                key={id}
                style={[styles.card, isSelected && styles.cardSelected]}
                onPress={() => toggleWorker(id)}
                activeOpacity={0.8}
              >
                <Image
                  source={
                    worker.image
                      ? { uri: worker.image }
                      : require("../../assets/images/profile.png")
                  }
                  style={styles.avatar}
                />
                <View style={styles.info}>
                  <Text style={styles.name}>{worker.name || "Worker"}</Text>
                  <Text style={styles.skills}>{worker.skills || "Skilled"}</Text>
                  <Text style={styles.price}>
                    ₹ {worker.price ?? "—"} / day
                  </Text>
                </View>
                <View style={[styles.checkbox, isSelected && styles.checkboxSelected]}>
                  {isSelected && <Feather name="check" size={18} color="#fff" />}
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      )}

      <View style={styles.footer}>
        <View style={styles.footerLeft}>
          <Text style={styles.selectedCount}>{selectedCount} selected</Text>
          <Text style={styles.totalHint}>
            Total will be shown in cart
          </Text>
        </View>
        <TouchableOpacity
          style={[styles.addBtn, selectedCount === 0 && styles.addBtnDisabled]}
          onPress={addTeamToCart}
          disabled={selectedCount === 0}
          activeOpacity={0.8}
        >
          <Text style={styles.addBtnText}>Add team to cart</Text>
          <Feather name="shopping-cart" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5E3E3",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 56,
    paddingBottom: 12,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  backBtn: {
    padding: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  placeholder: {
    width: 40,
  },
  subtitle: {
    fontSize: 14,
    color: "#555",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#FFF5F5",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  list: {
    flex: 1,
  },
  listContent: {
    padding: 16,
    paddingBottom: 100,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: "transparent",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
  },
  cardSelected: {
    borderColor: "#E53935",
    backgroundColor: "#FFF5F5",
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#F5E3E3",
    marginRight: 14,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  skills: {
    fontSize: 13,
    color: "#666",
    marginTop: 2,
  },
  price: {
    fontSize: 13,
    color: "#E53935",
    fontWeight: "600",
    marginTop: 4,
  },
  checkbox: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 2,
    borderColor: "#ccc",
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxSelected: {
    backgroundColor: "#E53935",
    borderColor: "#E53935",
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 14,
    paddingBottom: 14 + 24,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  footerLeft: {},
  selectedCount: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  totalHint: {
    fontSize: 12,
    color: "#777",
    marginTop: 2,
  },
  addBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E53935",
    paddingVertical: 14,
    paddingHorizontal: 22,
    borderRadius: 24,
    gap: 8,
  },
  addBtnDisabled: {
    backgroundColor: "#ccc",
  },
  addBtnText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
});
