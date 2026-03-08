import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  FlatList,
  Platform,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { useState, useEffect, useMemo } from "react";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { TextInput } from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const MIN_TOUCH = Platform.OS === "ios" ? 44 : 48;
const API_WORKERS = "https://shrami-backend.onrender.com/api/worker/getWorkers";

export default function HomeScreen() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState("");
  const [workers, setWorkers] = useState([]);
  const [workersLoading, setWorkersLoading] = useState(false);

  useEffect(() => {
    const fetchWorkers = async () => {
      setWorkersLoading(true);
      try {
        const res = await fetch(API_WORKERS);
        const result = await res.json();
        setWorkers(result.data || []);
      } catch (err) {
        console.log("Fetch workers failed", err?.message);
      } finally {
        setWorkersLoading(false);
      }
    };
    fetchWorkers();
  }, []);

  const categoryType = [
    {
      id: 1,
      name: "CONSTRUCTION",
      image: require("../../assets/images/building.png"),
    },
    {
      id: 2,
      name: "RICKSHAW",
      image: require("../../assets/images/rickshaw.png"),
    },
    {
      id: 3,
      name: "HOUSEHELP",
      image: require("../../assets/images/househelp.png"),
    },
  ];

  const TOP_PICKS = [
    {
      id: "1",
      title: "Labour",
      subtitle: "(मजदूर)",
      image: require("../../assets/images/construction.png"),
    },
    {
      id: "2",
      title: "Electrician",
      subtitle: "(बिजली मिस्त्री)",
      image: require("../../assets/images/electrictian.png"),
    },
  ];

  const labourTypes = useMemo(() => {
    const types = [
      ...categoryType.map((c) => ({ id: `cat-${c.id}`, title: c.name, type: "category" })),
      ...TOP_PICKS.map((p) => ({ id: `pick-${p.id}`, title: p.title, type: "pick" })),
    ];
    return types;
  }, []);

  const suggestions = useMemo(() => {
    const q = (searchQuery || "").trim().toLowerCase();
    if (!q) return { labour: [], workers: [] };

    const labour = labourTypes.filter(
      (t) => t.title.toLowerCase().includes(q)
    );
    const workerList = workers.filter(
      (w) =>
        (w.name && w.name.toLowerCase().includes(q)) ||
        (w.skills && w.skills.toLowerCase().includes(q))
    );
    return { labour, workers: workerList };
  }, [searchQuery, workers, labourTypes]);

  const hasSuggestions =
    suggestions.labour.length > 0 || suggestions.workers.length > 0;
  const showSuggestionsPanel = searchQuery.trim().length > 0;

  const onSelectLabour = (title) => {
    setSearchQuery("");
    navigation.navigate("WorkerListScreen", { job: title });
  };

  const onSelectWorker = (worker) => {
    setSearchQuery("");
    navigation.navigate("WorkerScreen", { worker });
  };

  return (
    <SafeAreaView style={styles.wrapper} edges={["top"]}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={[
          styles.contentContainer,
          { paddingTop: 12, paddingBottom: insets.bottom + 24 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Image
            source={require("../../assets/redlogo.png")}
            resizeMode="contain"
            style={styles.logo}
          />
          <TouchableOpacity
            style={styles.profileIcon}
            onPress={() => navigation.navigate("Profile")}
            activeOpacity={0.7}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
          >
            <Image
              source={require("../../assets/images/profile.png")}
              resizeMode="contain"
              style={styles.profileImage}
            />
          </TouchableOpacity>
        </View>

        {/* Search */}
        <View style={styles.searchSection}>
          <View style={styles.searchRow}>
            <View style={styles.searchBox}>
              <TextInput
                placeholder="Search labour..."
                placeholderTextColor="#000"
                style={styles.searchInput}
                value={searchQuery}
                onChangeText={setSearchQuery}
                returnKeyType="search"
              />
            </View>

            {/* <TouchableOpacity
              style={styles.filterBtn}
              activeOpacity={0.8}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Feather
                name="sliders"
                size={20}
                color="white"
                style={{ transform: [{ rotate: "90deg" }] }}
              />
            </TouchableOpacity> */}
          </View>

          {showSuggestionsPanel && (
            <View style={styles.suggestionsPanel}>
              {workersLoading ? (
                <View style={styles.suggestionLoader}>
                  <ActivityIndicator size="small" color="#E53935" />
                </View>
              ) : !hasSuggestions ? (
                <Text style={styles.suggestionEmpty}>No results for "{searchQuery}"</Text>
              ) : (
                <ScrollView
                  style={styles.suggestionsScroll}
                  keyboardShouldPersistTaps="handled"
                  nestedScrollEnabled
                >
                  {suggestions.labour.length > 0 && (
                    <>
                      <Text style={styles.suggestionHeading}>Labour types</Text>
                      {suggestions.labour.map((item) => (
                        <TouchableOpacity
                          key={item.id}
                          style={styles.suggestionRow}
                          onPress={() => onSelectLabour(item.title)}
                          activeOpacity={0.7}
                        >
                          <Feather name="briefcase" size={18} color="#E53935" />
                          <Text style={styles.suggestionText}>{item.title}</Text>
                        </TouchableOpacity>
                      ))}
                    </>
                  )}
                  {suggestions.workers.length > 0 && (
                    <>
                      <Text style={[styles.suggestionHeading, { marginTop: 8 }]}>
                        Workers
                      </Text>
                      {suggestions.workers.slice(0, 10).map((worker, index) => (
                        <TouchableOpacity
                          key={worker._id || worker.id || index}
                          style={styles.suggestionRow}
                          onPress={() => onSelectWorker(worker)}
                          activeOpacity={0.7}
                        >
                          <Image
                            source={
                              worker.image
                                ? { uri: worker.image }
                                : require("../../assets/images/profile.png")
                            }
                            style={styles.suggestionThumb}
                          />
                          <View style={styles.suggestionWorkerInfo}>
                            <Text style={styles.suggestionText}>
                              {worker.name || "Worker"}
                            </Text>
                            <Text style={styles.suggestionSub}>
                              {worker.skills || "Skilled"}
                            </Text>
                          </View>
                          <Feather name="chevron-right" size={18} color="#999" />
                        </TouchableOpacity>
                      ))}
                    </>
                  )}
                </ScrollView>
              )}
            </View>
          )}
        </View>

        {/* Popular */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Popular</Text>

          <View style={styles.popularRow}>
            {categoryType.map((item) => (
              <TouchableOpacity
                key={item?.id}
                style={styles.popularItem}
                onPress={() =>
                  item?.name === "RICKSHAW"
                    ? navigation.navigate("RickshawDriverList")
                    : navigation.navigate("LabourJob", { type: item?.name })
                }
                activeOpacity={0.7}
              >
                <Image
                  source={item.image}
                  resizeMode="contain"
                  style={styles.popularCardImage}
                />
                <Text style={styles.popularText}>{item?.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Top Picks */}
        <Text style={[styles.sectionTitle, { marginBottom: 12 }]}>Top Picks</Text>

        <View style={{ height: 268, marginBottom: 24 }}>
          <FlatList
            data={TOP_PICKS}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.topPicksList}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.topPickCard}
                onPress={() =>
                  navigation.navigate("WorkerListScreen", { job: item.title })
                }
                activeOpacity={0.8}
              >
                <View style={styles.topPickImageWrap}>
                  <Image source={item.image} style={styles.topPickImage} />
                </View>
                <View style={styles.topPickFooter}>
                  <Text style={styles.topPickText}>
                    {item.title}{" "}
                    <Text style={styles.grayText}>{item.subtitle}</Text>
                  </Text>
                  <View style={styles.topPickArrowBtn}>
                    <Feather name="arrow-right" size={20} color="#fff" />
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>

        {/* Make Labour Team */}
        <TouchableOpacity
          style={styles.makeTeamBtn}
          activeOpacity={0.8}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          onPress={() => navigation.navigate("LabourTeamScreen")}
        >
          <Text style={styles.makeTeamText}>MAKE LABOUR TEAM</Text>
          <View style={styles.plusBtn}>
            <Feather name="plus" size={26} color="#fff" />
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#F5E3E3",
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    width: 140,
    height: 60,
    alignSelf: "center",
  },
  profileIcon: {
    minWidth: MIN_TOUCH,
    minHeight: MIN_TOUCH,
    width: 54,
    height: 57,
    backgroundColor: "#FDECEC",
    borderRadius: 21,
    borderWidth: 1.5,
    borderColor: "#E53935",
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
  },
  profileImage: {
    width: 28,
    height: 28,
  },
  searchSection: {
    marginBottom: 20,
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  searchBox: {
    flex: 1,
    backgroundColor: "white",
    minHeight: MIN_TOUCH,
    borderRadius: 24,
    justifyContent: "center",
    paddingHorizontal: 18,
    borderWidth: 1,
    borderColor: "#333",
    elevation: 2,
    ...(Platform.OS === "ios" && {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
    }),
  },
  searchInput: {
    paddingVertical: Platform.OS === "ios" ? 14 : 10,
    fontSize: 16,
    color: "#000",
  },
  searchText: {
    color: "#000",
  },
  filterBtn: {
    minWidth: MIN_TOUCH,
    minHeight: MIN_TOUCH,
    backgroundColor: "#E53935",
    padding: 14,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  suggestionsPanel: {
    marginTop: 8,
    backgroundColor: "#fff",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#eee",
    maxHeight: 320,
    elevation: 4,
    ...(Platform.OS === "ios" && {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 4,
    }),
  },
  suggestionsScroll: {
    maxHeight: 300,
    paddingVertical: 8,
  },
  suggestionLoader: {
    padding: 20,
    alignItems: "center",
  },
  suggestionEmpty: {
    padding: 16,
    fontSize: 14,
    color: "#777",
    textAlign: "center",
  },
  suggestionHeading: {
    fontSize: 12,
    fontWeight: "600",
    color: "#999",
    marginBottom: 4,
    paddingHorizontal: 16,
  },
  suggestionRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    gap: 12,
  },
  suggestionThumb: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F5E3E3",
  },
  suggestionWorkerInfo: {
    flex: 1,
  },
  suggestionText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  suggestionSub: {
    fontSize: 12,
    color: "#777",
    marginTop: 2,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 16,
    marginBottom: 20,
    elevation: 4,
    ...(Platform.OS === "ios" && {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 4,
    }),
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#000",
  },
  popularRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  popularItem: {
    flex: 1,
    minHeight: MIN_TOUCH + 40,
    borderWidth: 1,
    borderColor: "#E53935",
    borderRadius: 16,
    padding: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  popularCardImage: {
    width: 40,
    height: 40,
    marginBottom: 8,
  },
  popularIcon: {
    width: 48,
    height: 48,
    backgroundColor: "#FADBD8",
    borderRadius: 24,
    marginBottom: 8,
  },
  popularText: {
    fontSize: 10,
    fontWeight: "600",
    textAlign: "center",
    color: "#000",
  },
  topPicksList: {
    paddingRight: 16,
    gap: 16,
  },
  topPickCard: {
    width: SCREEN_WIDTH * 0.72,
    maxWidth: 320,
    backgroundColor: "#fff",
    borderRadius: 24,
    marginRight: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#E53935",
    elevation: 2,
    ...(Platform.OS === "ios" && {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.06,
      shadowRadius: 4,
    }),
  },
  topPickImageWrap: {
    width: "100%",
    height: 180,
    overflow: "hidden",
    borderTopLeftRadius: 23,
    borderTopRightRadius: 23,
  },
  topPickImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  topPickFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  topPickText: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#000",
  },
  grayText: {
    color: "#555",
  },
  topPickArrowBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#E53935",
    alignItems: "center",
    justifyContent: "center",
  },
  makeTeamBtn: {
    backgroundColor: "#fff",
    borderRadius: 28,
    minHeight: MIN_TOUCH + 12,
    paddingVertical: 18,
    paddingHorizontal: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 2,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "rgba(229, 57, 53, 0.2)",
    ...(Platform.OS === "ios" && {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.06,
      shadowRadius: 4,
    }),
  },
  makeTeamText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    letterSpacing: 0.5,
  },
  plusBtn: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E53935",
  },
});
