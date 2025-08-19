import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Wallet, Target, ArrowUpIcon, ArrowDownIcon } from 'lucide-react';
import { Transaction } from '@/types/transaction';

interface QuickStatsProps {
  transactions: Transaction[];
}

interface StatCardProps {
  title: string;
  value: number;
  previousValue: number;
  icon: React.ReactNode;
  formatValue?: (value: number) => string;
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  previousValue, 
  icon, 
  formatValue = (v) => `$${v.toFixed(2)}`,
  className = ""
}) => {
  const change = value - previousValue;
  const changePercent = previousValue !== 0 ? (change / Math.abs(previousValue)) * 100 : 0;
  const isIncreasing = changePercent > 0;

  return (
    <Card className={`animate-fade-in hover:shadow-lg transition-all duration-200 ${className}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className="p-2 rounded-lg bg-primary/10">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold mb-1">
          {formatValue(value)}
        </div>
        <div className="flex items-center text-xs">
          {changePercent !== 0 && (
            <>
              {isIncreasing ? (
                <ArrowUpIcon className="h-3 w-3 text-emerald-500 mr-1" />
              ) : (
                <ArrowDownIcon className="h-3 w-3 text-red-500 mr-1" />
              )}
              <span className={isIncreasing ? 'text-emerald-500' : 'text-red-500'}>
                {Math.abs(changePercent).toFixed(1)}%
              </span>
            </>
          )}
          <span className="text-muted-foreground ml-1">
            from last month
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export const QuickStats: React.FC<QuickStatsProps> = ({ transactions }) => {
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  
  // Filter transactions for current and previous month
  const currentMonthTransactions = transactions.filter(t => {
    const date = new Date(t.date);
    return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
  });
  
  const previousMonthTransactions = transactions.filter(t => {
    const date = new Date(t.date);
    const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear;
    return date.getMonth() === prevMonth && date.getFullYear() === prevYear;
  });

  // Calculate current month stats
  const currentIncome = currentMonthTransactions
    .filter(t => t.amount > 0)
    .reduce((sum, t) => sum + t.amount, 0);
  
  const currentExpenses = Math.abs(currentMonthTransactions
    .filter(t => t.amount < 0)
    .reduce((sum, t) => sum + t.amount, 0));
  
  const currentBalance = currentIncome - currentExpenses;
  const currentTransactionCount = currentMonthTransactions.length;

  // Calculate previous month stats
  const previousIncome = previousMonthTransactions
    .filter(t => t.amount > 0)
    .reduce((sum, t) => sum + t.amount, 0);
  
  const previousExpenses = Math.abs(previousMonthTransactions
    .filter(t => t.amount < 0)
    .reduce((sum, t) => sum + t.amount, 0));
  
  const previousBalance = previousIncome - previousExpenses;
  const previousTransactionCount = previousMonthTransactions.length;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Monthly Income"
        value={currentIncome}
        previousValue={previousIncome}
        icon={<TrendingUp className="h-4 w-4 text-emerald-500" />}
      />
      
      <StatCard
        title="Monthly Expenses"
        value={currentExpenses}
        previousValue={previousExpenses}
        icon={<TrendingDown className="h-4 w-4 text-red-500" />}
      />
      
      <StatCard
        title="Net Balance"
        value={currentBalance}
        previousValue={previousBalance}
        icon={<Wallet className="h-4 w-4 text-blue-500" />}
        className={currentBalance >= 0 ? 'border-emerald-200' : 'border-red-200'}
      />
      
      <StatCard
        title="Transactions"
        value={currentTransactionCount}
        previousValue={previousTransactionCount}
        icon={<Target className="h-4 w-4 text-purple-500" />}
        formatValue={(v) => v.toString()}
      />
    </div>
  );
};
