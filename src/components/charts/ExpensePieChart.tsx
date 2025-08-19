import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DEFAULT_CATEGORIES } from '@/types/categories';
import { Transaction } from '@/types/transaction';

interface ExpensePieChartProps {
  transactions: Transaction[];
}

interface TooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    payload: {
      name: string;
      value: number;
      color: string;
    };
  }>;
}

const CustomTooltip = ({ active, payload }: TooltipProps) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    return (
      <div className="bg-popover border border-border rounded-lg p-3 shadow-lg">
        <p className="text-popover-foreground font-medium">{data.name}</p>
        <p className="text-primary font-bold">${data.value.toFixed(2)}</p>
      </div>
    );
  }
  return null;
};

export const ExpensePieChart: React.FC<ExpensePieChartProps> = ({ transactions }) => {
  // Group expenses by category
  const expenseData = transactions
    .filter(t => t.amount < 0)
    .reduce((acc, transaction) => {
      const category = DEFAULT_CATEGORIES.find(c => c.id === transaction.categoryId) || 
                      DEFAULT_CATEGORIES.find(c => c.id === 'other')!;
      
      const existing = acc.find(item => item.name === category.name);
      if (existing) {
        existing.value += Math.abs(transaction.amount);
      } else {
        acc.push({
          name: category.name,
          value: Math.abs(transaction.amount),
          color: category.color,
          icon: category.icon,
        });
      }
      return acc;
    }, [] as Array<{ name: string; value: number; color: string; icon: string }>);

  if (expenseData.length === 0) {
    return (
      <Card className="animate-fade-in">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Expense Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-64 text-muted-foreground">
            <div className="text-center">
              <div className="text-4xl mb-2">📊</div>
              <p>No expense data available</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Expense Categories</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={expenseData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                innerRadius={40}
                paddingAngle={2}
                dataKey="value"
              >
                {expenseData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        {/* Category breakdown */}
        <div className="mt-6 grid grid-cols-2 gap-3">
          {expenseData.map((category, index) => (
            <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <span className="text-lg">{category.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{category.name}</p>
                <p className="text-xs text-muted-foreground">${category.value.toFixed(2)}</p>
              </div>
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: category.color }}
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
