import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyA7Gj4snZa0fN5OZo1HKN4bYGPiSNMqy_I",
  authDomain: "liftlearnrepeat-617a8.firebaseapp.com",
  projectId: "liftlearnrepeat-617a8",
  storageBucket: "liftlearnrepeat-617a8.firebasestorage.app",
  messagingSenderId: "707859102820",
  appId: "1:707859102820:web:b1d252a51f06c7c59c7371"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);

export default app;
