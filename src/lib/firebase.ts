import { initializeApp, FirebaseApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, enableIndexedDbPersistence } from 'firebase/firestore';
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Validate required environment variables
if (!import.meta.env.VITE_FIREBASE_API_KEY || 
    !import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 
    !import.meta.env.VITE_FIREBASE_PROJECT_ID ||
    !import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID ||
    !import.meta.env.VITE_FIREBASE_APP_ID ||
    !import.meta.env.VITE_FIREBASE_MEASUREMENT_ID) {
  throw new Error('Missing required Firebase configuration. Check your .env file.');
}

let app: FirebaseApp;

try {
  if (!getApps().length) {
    app = initializeApp(firebaseConfig);
  } else {
    app = getApp();
  }
} catch (error) {
  console.error('Error initializing Firebase:', error);
  throw error;
}

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);

// Enable offline persistence
enableIndexedDbPersistence(db)
  .catch((err) => {
    console.error('Firestore persistence error:', err);
  });

export const googleProvider = new GoogleAuthProvider();

// Initialize analytics conditionally
let analytics = null;
if (typeof window !== 'undefined') {
  isSupported().then(supported => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

export { analytics };
export default app;
