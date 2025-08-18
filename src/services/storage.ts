import { Transaction } from "../types/transaction";

// AUTH
export const saveUser = (username: string) => {
  localStorage.setItem("user", username);
};

export const getUser = (): string | null => {
  return localStorage.getItem("user");
};

export const clearUser = () => {
  localStorage.removeItem("user");
};

// TRANSACTIONS
export const saveTransactions = (transactions: Transaction[]) => {
  localStorage.setItem("transactions", JSON.stringify(transactions));
};

export const getTransactions = (): Transaction[] => {
  const data = localStorage.getItem("transactions");
  return data ? (JSON.parse(data) as Transaction[]) : [];
};
