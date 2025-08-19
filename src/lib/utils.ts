// utils.ts
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { Transaction } from "../types/transaction"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function calculateTotal(transactions: Transaction[]): number {
  return transactions.reduce((sum, t) => sum + t.amount, 0);
}

export function filterTransactions(
  transactions: Transaction[],
  type: "income" | "expense" | "all"
): Transaction[] {
  if (type === "all") return transactions;
  return transactions.filter((t) => t.type === type);
}
