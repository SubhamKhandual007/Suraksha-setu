// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDB6id5RnADk6vhRHzB2HSk2IetP0Tajug",
  authDomain: "tour-safe-6ce22.firebaseapp.com",
  projectId: "tour-safe-6ce22",
  storageBucket: "tour-safe-6ce22.firebasestorage.app",
  messagingSenderId: "356632459372",
  appId: "1:356632459372:web:a048fafd128a7da32f8049",
  measurementId: "G-K0SFPLWT9X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Initialize Analytics (only in browser environment)
let analytics;
try {
  analytics = getAnalytics(app);
} catch (e) {
  // Analytics may fail in non-browser environments
}

export { app, auth, googleProvider, analytics };
export default app;
