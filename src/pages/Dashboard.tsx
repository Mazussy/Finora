import { useAuth } from "../hooks/useAuth";
import { useTransactions } from "../hooks/useTransaction";
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";
import TransactionChart from "../components/TransactionChart";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Wallet, LogOut, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const { transactions } = useTransactions();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Calculate statistics
  const income = transactions
    .filter((t) => t.amount > 0)
    .reduce((acc, t) => acc + t.amount, 0);

  const expense = transactions
    .filter((t) => t.amount < 0)
    .reduce((acc, t) => acc + t.amount, 0);

  const balance = income + expense;

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #222831 0%, #393E46 100%)' }}>
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center rounded-2xl p-6" style={{ backgroundColor: '#393E46', borderColor: '#393E46' }}>
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl" style={{ background: 'linear-gradient(135deg, #00ADB5 0%, #00d4dd 100%)' }}>
              <User className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold" style={{ color: '#EEEEEE' }}>
                Welcome back, {user || "Guest"}!
              </h1>
              <p style={{ color: '#EEEEEE' }}>
                Manage your finances with ease
              </p>
            </div>
          </div>
          <Button 
            variant="outline" 
            onClick={handleLogout}
            className="flex items-center gap-2"
            style={{ 
              borderColor: '#00ADB5', 
              color: '#00ADB5',
              backgroundColor: 'transparent'
            }}
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card style={{ backgroundColor: '#393E46', borderColor: '#393E46' }}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium" style={{ color: '#EEEEEE' }}>
                  Total Balance
                </CardTitle>
                <Wallet className="h-4 w-4" style={{ color: '#00ADB5' }} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold" style={{ color: '#EEEEEE' }}>
                ${balance.toFixed(2)}
              </div>
              <p className="text-sm mt-1" style={{ color: '#EEEEEE' }}>
                {balance >= 0 ? "You're doing great!" : "Time to save more"}
              </p>
            </CardContent>
          </Card>

          <Card style={{ backgroundColor: '#393E46', borderColor: '#393E46' }}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium" style={{ color: '#EEEEEE' }}>
                  Total Income
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-green-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-400">
                +${income.toFixed(2)}
              </div>
              <p className="text-sm mt-1" style={{ color: '#EEEEEE' }}>
                {transactions.filter(t => t.amount > 0).length} income sources
              </p>
            </CardContent>
          </Card>

          <Card style={{ backgroundColor: '#393E46', borderColor: '#393E46' }}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium" style={{ color: '#EEEEEE' }}>
                  Total Expenses
                </CardTitle>
                <TrendingDown className="h-4 w-4 text-red-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-400">
                ${expense.toFixed(2)}
              </div>
              <p className="text-sm mt-1" style={{ color: '#EEEEEE' }}>
                {transactions.filter(t => t.amount < 0).length} expense categories
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Transaction Form */}
          <div className="lg:col-span-1">
            <TransactionForm />
          </div>

          {/* Transaction List */}
          <div className="lg:col-span-2">
            <TransactionList />
          </div>
        </div>

        {/* Chart Section */}
        {transactions.length > 0 && (
          <div className="mt-6">
            <TransactionChart />
          </div>
        )}
      </div>
    </div>
  );
}
