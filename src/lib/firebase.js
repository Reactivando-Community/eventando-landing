import { initializeApp, getApps } from "firebase/app";
import { getAnalytics, logEvent as firebaseLogEvent, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
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
