import { createContext, useState, ReactNode } from "react";

type Transaction = {
  id: number;
  description: string;
  amount: number;
  date: string;
};

type TransactionContextType = {
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, "id">) => void;
  deleteTransaction: (id: number) => void;
};

const TransactionContext = createContext<TransactionContextType | undefined>(
  undefined
);

export  const TransactionProvider = ({ children }: { children: ReactNode }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const addTransaction = (transaction: Omit<Transaction, "id">) => {
    setTransactions((prev) => [
      ...prev,
      { ...transaction, id: Date.now() },
    ]);
  };

  const deleteTransaction = (id: number) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <TransactionContext.Provider
      value={{ transactions, addTransaction, deleteTransaction }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export default TransactionContext;