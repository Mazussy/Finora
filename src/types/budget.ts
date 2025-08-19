export interface Budget {
  id: string;
  categoryId: string;
  amount: number;
  period: 'monthly' | 'yearly';
  userId: string;
  createdAt: Date;
}

export interface Goal {
  id: string;
  title: string;
  description: string;
  targetAmount: number;
  currentAmount: number;
  targetDate: Date;
  userId: string;
  createdAt: Date;
  status: 'active' | 'completed' | 'paused';
}

export interface RecurringTransaction {
  id: string;
  description: string;
  amount: number;
  categoryId: string;
  frequency: 'daily' | 'weekly' | 'monthly' | 'yearly';
  nextDate: Date;
  userId: string;
  isActive: boolean;
  createdAt: Date;
}
