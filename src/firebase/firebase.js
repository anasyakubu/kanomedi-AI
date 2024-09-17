// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const API_KEY = import.meta.env.VITE_FIREBASE_API_KEY;

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: "botz-ai.firebaseapp.com",
  projectId: "botz-ai",
  storageBucket: "botz-ai.appspot.com",
  messagingSenderId: "1004663216684",
  appId: "1:1004663216684:web:0055b0274ec3250d10cf89",
  measurementId: "G-8QSB7QZNRP",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);
export default app;
