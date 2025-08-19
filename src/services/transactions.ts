// src/services/transactions.ts
import { db } from "../firebase";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";

export async function addTransaction(userId: string, amount: number, type: string) {
  await addDoc(collection(db, "transactions"), {
    userId,
    amount,
    type,
    createdAt: new Date()
  });
}

export async function getTransactions(userId: string) {
  const q = query(collection(db, "transactions"), where("userId", "==", userId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}
