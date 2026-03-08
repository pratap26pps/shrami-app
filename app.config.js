try {
  require("dotenv").config({ path: ".env" });
} catch (_) {}

const appJson = require("./app.json");

module.exports = () => {
  const raw =
    process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY ||
    process.env.GOOGLE_API_KEY ||
    process.env.GOOGLE_MAPS_API_KEY ||
    appJson.expo?.android?.config?.googleMaps?.apiKey ||
    "YOUR_GOOGLE_MAPS_API_KEY";
  const googleMapsKey = (raw || "").trim();

  return {
    ...appJson.expo,
    plugins: [
      ...(appJson.expo.plugins || []),
      [
        "react-native-maps",
        {
          iosGoogleMapsApiKey: googleMapsKey,
          androidGoogleMapsApiKey: googleMapsKey,
        },
      ],
    ],
    android: {
      ...appJson.expo.android,
      config: {
        ...appJson.expo.android?.config,
        googleMaps: {
          apiKey: googleMapsKey,
        },
      },
    },
    ios: {
      ...appJson.expo.ios,
      config: {
        ...appJson.expo.ios?.config,
        googleMapsApiKey: googleMapsKey,
      },
    },
  };
};
