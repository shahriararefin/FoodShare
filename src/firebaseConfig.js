// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration using the keys you provided.
const firebaseConfig = {
  apiKey: "AIzaSyA7grYGb10TmeRkyBQJkNPaAwqMOtiUfxM",
  authDomain: "foodshare-11d71.firebaseapp.com",
  projectId: "foodshare-11d71",
  storageBucket: "foodshare-11d71.appspot.com", // Note: I corrected a typo here from your previous attempts. It should be .appspot.com
  messagingSenderId: "425846744302",
  appId: "1:425846744302:web:9fee5c52d7dc0d8dbeffff",
  measurementId: "G-S0YXEL9442"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Firestore, then export them for use in other components
export const auth = getAuth(app);
export const db = getFirestore(app);
