/**
 * API base URL for backend.
 * Set EXPO_PUBLIC_API_URL in .env for local dev:
 *   - Simulator: http://localhost:5001
 *   - Physical device: http://YOUR_LAN_IP:5001 (e.g. http://192.168.1.5:5001)
 */
export const API_BASE =
  (typeof process !== "undefined" && process.env?.EXPO_PUBLIC_API_URL?.trim()) ||
  (typeof __DEV__ !== "undefined" && __DEV__ ? "http://localhost:5001" : "https://shrami-backend.onrender.com");
