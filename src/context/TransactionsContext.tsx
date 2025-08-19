import { createContext, useState, ReactNode, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { 
  addTransaction as addTransactionToFirestore, 
  deleteTransaction as deleteTransactionFromFirestore,
  subscribeToTransactions 
} from "../services/transactions";
import { Transaction } from "../types/transaction";

type FirebaseTransaction = {
  id: string;
  userId: string;
  amount: number;
  type: string;
  description?: string;
  createdAt?: {
    toDate?: () => Date;
  };
};

type TransactionContextType = {
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, "id">) => Promise<void>;
  deleteTransaction: (id: string) => Promise<void>;
  loading: boolean;
};

const TransactionContext = createContext<TransactionContextType | undefined>(
  undefined
);

export const TransactionProvider = ({ children }: { children: ReactNode }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  // Real-time subscription to transactions
  useEffect(() => {
    if (!user) {
      setTransactions([]);
      return;
    }

    setLoading(true);
    
    // Subscribe to real-time updates
    const unsubscribe = subscribeToTransactions(user.uid, (firebaseTransactions) => {
      console.log("Received transactions from Firestore:", firebaseTransactions);
      const formattedTransactions: Transaction[] = firebaseTransactions.map((t) => {
        const fbTransaction = t as FirebaseTransaction;
        return {
          id: fbTransaction.id,
          description: fbTransaction.description || `${fbTransaction.type} transaction`,
          amount: fbTransaction.amount,
          type: fbTransaction.type === "income" || fbTransaction.amount > 0 ? "income" : "expense",
          date: fbTransaction.createdAt?.toDate?.()?.toISOString().split("T")[0] || new Date().toISOString().split("T")[0],
        };
      });
      console.log("Formatted transactions:", formattedTransactions);
      setTransactions(formattedTransactions);
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [user]);

  const addTransaction = async (transaction: Omit<Transaction, "id">) => {
    if (!user) {
      console.error("No user found when trying to add transaction");
      throw new Error("User must be logged in to add transactions");
    }

    console.log("Adding transaction for user:", user.uid, transaction);
    
    try {
      // Add to Firestore - real-time listener will update the UI
      await addTransactionToFirestore(
        user.uid, 
        Math.abs(transaction.amount), 
        transaction.type,
        transaction.description
      );
      console.log("Transaction added to Firestore successfully");
    } catch (error) {
      console.error("Error adding transaction to Firestore:", error);
      throw error;
    }
  };

  const deleteTransaction = async (id: string) => {
    try {
      // Delete from Firestore - real-time listener will update the UI
      await deleteTransactionFromFirestore(id);
    } catch (error) {
      console.error("Error deleting transaction:", error);
      throw error;
    }
  };

  return (
    <TransactionContext.Provider
      value={{ transactions, addTransaction, deleteTransaction, loading }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export default TransactionContext;