// src/services/auth.ts
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";

// Sign Up
export async function signup(email: string, password: string) {
  const userCred = await createUserWithEmailAndPassword(auth, email, password);
  return userCred.user;
}

// Login
export async function login(email: string, password: string) {
  const userCred = await signInWithEmailAndPassword(auth, email, password);
  return userCred.user;
}

// Logout
export async function logout() {
  await signOut(auth);
}

// Listen to auth state changes
export function subscribeToAuth(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, callback);
}
