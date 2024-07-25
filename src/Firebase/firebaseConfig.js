// firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics"
import { getFirestore } from "firebase/firestore"; // Import Firestore

const firebaseConfig = {
  apiKey: "AIzaSyCy7CIlftgmT_-XQ8NjrxkKDISQpr14yys",
  authDomain: "chat24-50985.firebaseapp.com",
  projectId: "chat24-50985",
  storageBucket: "chat24-50985.appspot.com",
  messagingSenderId: "681141015006",
  appId: "1:681141015006:web:198c850c3e7b62d49e0d4f",
  measurementId: "G-VT3SQ969BS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app); // Initialize Firestore

export { app, analytics, db };
