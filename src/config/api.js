/**
 * API base URL for backend.
 * Set EXPO_PUBLIC_API_URL in .env for local dev (e.g. http://192.168.x.x:5000)
 * Falls back to Render production URL.
 */
export const API_BASE =
  (typeof process !== "undefined" && process.env?.EXPO_PUBLIC_API_URL?.trim()) ||
  "https://shrami-backend.onrender.com";
