// src/lib/utils.ts

import { Transaction } from "../types/transaction";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// ✅ Classname merge helper for ShadCN UI
export function cn(...inputs: (string | undefined | null | boolean)[]) {
  return twMerge(clsx(inputs));
}

// ✅ Calculate total balance
export function calculateTotal(transactions: Transaction[]): number {
  return transactions.reduce((sum, t) => sum + t.amount, 0);
}

// ✅ Filter transactions by type
export function filterTransactions(
  transactions: Transaction[],
  type: "income" | "expense" | "all"
): Transaction[] {
  if (type === "all") return transactions;
  return transactions.filter((t) => t.type === type);
}
