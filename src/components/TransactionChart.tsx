import { useTransactions } from "../hooks/useTransaction";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

interface ChartDataPoint {
  date: string;
  amount: number;
  income: number;
  expense: number;
}

interface TooltipProps {
  active?: boolean;
  payload?: Array<{
    color: string;
    dataKey: string;
    value: number;
  }>;
  label?: string;
}

export default function TransactionChart() {
  const { transactions } = useTransactions();

  // Process data for chart
  const chartData = transactions
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .reduce((acc: ChartDataPoint[], transaction) => {
      const existingDay = acc.find(item => item.date === transaction.date);
      if (existingDay) {
        existingDay.amount += transaction.amount;
        if (transaction.amount > 0) {
          existingDay.income += transaction.amount;
        } else {
          existingDay.expense += Math.abs(transaction.amount);
        }
      } else {
        acc.push({
          date: transaction.date,
          amount: transaction.amount,
          income: transaction.amount > 0 ? transaction.amount : 0,
          expense: transaction.amount < 0 ? Math.abs(transaction.amount) : 0,
        });
      }
      return acc;
    }, []);

  const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border rounded-lg p-3 shadow-lg">
          <p className="text-sm text-foreground">{`Date: ${label}`}</p>
          {payload.map((entry, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {`${entry.dataKey === 'income' ? 'Income' : entry.dataKey === 'expense' ? 'Expense' : 'Net'}: $${entry.value.toFixed(2)}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="bg-card border">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2 text-foreground">
          <div className="p-2 bg-primary rounded-lg">
            <TrendingUp className="h-4 w-4 text-primary-foreground" />
          </div>
          Financial Overview
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="date" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={11}
                height={30}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={11}
                tickFormatter={(value) => `$${value}`}
                width={60}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area 
                type="monotone" 
                dataKey="income" 
                stackId="1"
                stroke="#10b981" 
                fill="url(#incomeGradient)"
                strokeWidth={2}
              />
              <Area 
                type="monotone" 
                dataKey="expense" 
                stackId="2"
                stroke="#ef4444" 
                fill="url(#expenseGradient)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
