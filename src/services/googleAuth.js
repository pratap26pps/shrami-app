/**
 * Google OAuth via system browser. Backend redirects to shramiapp://auth-success?token=...
 * App.js DeepLinkHandler receives the URL and calls loginWithToken(token).
 * (No expo-web-browser — avoids "Cannot find native module 'ExpoWebBrowser'" in Expo Go / some builds.)
 */

import * as Linking from "expo-linking";

const GOOGLE_AUTH_URL = "https://shrami-backend.onrender.com/api/auth/google";

/**
 * Opens Google sign-in in the system browser. After sign-in, backend redirects to
 * shramiapp://auth-success?token=... and the app opens; DeepLinkHandler logs the user in.
 * @returns {Promise<null>} Always null; token is delivered via deep link.
 */
export async function signInWithGoogleInApp() {
  await Linking.openURL(GOOGLE_AUTH_URL);
  return null;
}
