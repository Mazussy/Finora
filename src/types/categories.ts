export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  type: 'income' | 'expense';
  budget?: number;
}

export const DEFAULT_CATEGORIES: Category[] = [
  { id: 'food', name: 'Food & Dining', icon: '🍽️', color: 'hsl(var(--chart-1))', type: 'expense' },
  { id: 'transport', name: 'Transportation', icon: '🚗', color: 'hsl(var(--chart-2))', type: 'expense' },
  { id: 'entertainment', name: 'Entertainment', icon: '🎬', color: 'hsl(var(--chart-3))', type: 'expense' },
  { id: 'shopping', name: 'Shopping', icon: '🛍️', color: 'hsl(var(--chart-4))', type: 'expense' },
  { id: 'bills', name: 'Bills & Utilities', icon: '⚡', color: 'hsl(var(--chart-5))', type: 'expense' },
  { id: 'healthcare', name: 'Healthcare', icon: '🏥', color: '#22c55e', type: 'expense' },
  { id: 'education', name: 'Education', icon: '📚', color: '#3b82f6', type: 'expense' },
  { id: 'salary', name: 'Salary', icon: '💼', color: '#10b981', type: 'income' },
  { id: 'freelance', name: 'Freelance', icon: '💻', color: '#059669', type: 'income' },
  { id: 'investment', name: 'Investment', icon: '�', color: '#0d9488', type: 'income' },
  { id: 'other', name: 'Other', icon: '📦', color: '#6b7280', type: 'expense' },
];
