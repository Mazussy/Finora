// src/types/transaction.ts

export type TransactionType = "income" | "expense";

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: TransactionType;
  categoryId: string;
  date: string; // ISO string (can be formatted later)
  userId?: string;
  createdAt?: Date;
}
