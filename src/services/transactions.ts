// src/services/transactions.ts
import { db } from "../firebase";
import { collection, addDoc, getDocs, query, where, doc, deleteDoc, onSnapshot } from "firebase/firestore";

export async function addTransaction(userId: string, amount: number, type: string, description?: string) {
  await addDoc(collection(db, "transactions"), {
    userId,
    amount,
    type,
    description,
    createdAt: new Date()
  });
}

export async function getTransactions(userId: string) {
  const q = query(collection(db, "transactions"), where("userId", "==", userId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function deleteTransaction(transactionId: string) {
  await deleteDoc(doc(db, "transactions", transactionId));
}

export function subscribeToTransactions(userId: string, callback: (transactions: { id: string; [key: string]: unknown }[]) => void) {
  const q = query(collection(db, "transactions"), where("userId", "==", userId));
  return onSnapshot(q, (snapshot) => {
    const transactions = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    callback(transactions);
  });
}
