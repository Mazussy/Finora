import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Transaction } from '@/types/transaction';
import { DEFAULT_CATEGORIES } from '@/types/categories';
import { formatDistanceToNow } from 'date-fns';

interface RecentActivityProps {
  transactions: Transaction[];
  limit?: number;
}

export const RecentActivity: React.FC<RecentActivityProps> = ({ transactions, limit = 5 }) => {
  const recentTransactions = transactions
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);

  if (recentTransactions.length === 0) {
    return (
      <Card className="animate-fade-in">
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-32 text-muted-foreground">
            <div className="text-center">
              <div className="text-3xl mb-2">💭</div>
              <p>No recent activity</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {recentTransactions.map((transaction, index) => {
          const category = DEFAULT_CATEGORIES.find(c => c.id === transaction.categoryId) || 
                          DEFAULT_CATEGORIES.find(c => c.id === 'other')!;
          const isIncome = transaction.amount > 0;
          const timeAgo = formatDistanceToNow(new Date(transaction.date), { addSuffix: true });

          return (
            <div 
              key={transaction.id} 
              className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors animate-slide-in-right"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-background border">
                  <span className="text-lg">{category.icon}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium truncate">{transaction.description}</p>
                    <Badge 
                      variant={isIncome ? "default" : "destructive"}
                      className="text-xs"
                    >
                      {category.name}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{timeAgo}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <div className={`flex items-center gap-1 ${isIncome ? 'text-emerald-500' : 'text-red-500'}`}>
                  {isIncome ? (
                    <ArrowUpRight className="h-4 w-4" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4" />
                  )}
                  <span className="font-semibold">
                    {isIncome ? '+' : '-'}${Math.abs(transaction.amount).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};
