// src/lib/finance.ts

import { Transaction } from "../types/transaction";

// ✅ Get total income
export function getTotalIncome(transactions: Transaction[]): number {
  return transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);
}

// ✅ Get total expenses
export function getTotalExpenses(transactions: Transaction[]): number {
  return transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);
}

// ✅ Get balance (income - expenses)
export function getBalance(transactions: Transaction[]): number {
  return getTotalIncome(transactions) - getTotalExpenses(transactions);
}

// ✅ Group transactions by date (useful for charts)
export function groupByDate(transactions: Transaction[]): Record<string, Transaction[]> {
  return transactions.reduce<Record<string, Transaction[]>>((acc, t) => {
    const date = new Date(t.date).toLocaleDateString();
    if (!acc[date]) acc[date] = [];
    acc[date].push(t);
    return acc;
  }, {});
}
