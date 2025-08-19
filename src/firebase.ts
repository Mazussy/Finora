// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDQXyDPdUhd5sls8Gd3jLuYPPIb7PwiiZw",
  authDomain: "finora-5c75b.firebaseapp.com",
  projectId: "finora-5c75b",
  storageBucket: "finora-5c75b.firebasestorage.app",
  messagingSenderId: "160912922374",
  appId: "1:160912922374:web:279f881791aac1c6d17087"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
