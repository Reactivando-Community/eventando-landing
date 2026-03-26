import { initializeApp, getApps } from "firebase/app";
import { getAnalytics, logEvent as firebaseLogEvent, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyByNfZ2iK0wUVfxFL5HIQ8gn4kfPM7t_Uw",
  authDomain: "swanapolis.firebaseapp.com",
  projectId: "swanapolis",
  storageBucket: "swanapolis.firebasestorage.app",
  messagingSenderId: "26129862584",
  appId: "1:26129862584:web:a49aae307afbeff778094d",
  measurementId: "G-HS9N4C07LL",
};

// Initialize Firebase (singleton)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

let analyticsInstance = null;

async function getAnalyticsInstance() {
  if (analyticsInstance) return analyticsInstance;
  if (typeof window !== "undefined" && (await isSupported())) {
    analyticsInstance = getAnalytics(app);
  }
  return analyticsInstance;
}

/**
 * Log a custom event to Firebase Analytics.
 * Safe to call server-side (will be a no-op).
 */
export async function logEvent(eventName, params = {}) {
  try {
    const analytics = await getAnalyticsInstance();
    if (analytics) {
      firebaseLogEvent(analytics, eventName, params);
      if (process.env.NODE_ENV === "development") {
        console.log(`[Firebase] ${eventName}`, params);
      }
    }
  } catch (err) {
    // Silently fail – analytics should never break the app
    if (process.env.NODE_ENV === "development") {
      console.warn("[Firebase] logEvent error:", err);
    }
  }
}

export default app;
