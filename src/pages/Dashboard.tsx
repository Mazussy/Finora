import { useAuth } from "../hooks/useAuth";
import { useTransactions } from "../hooks/useTransaction";
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";
import TransactionChart from "../components/TransactionChart";
import { QuickStats } from "../components/stats/QuickStats";
import { ExpensePieChart } from "../components/charts/ExpensePieChart";
import { RecentActivity } from "../components/activity/RecentActivity";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LogOut, User, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const { transactions } = useTransactions();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex justify-between items-center bg-card border rounded-lg p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-xl">
              <User className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                Welcome back, {user?.displayName || user?.email?.split('@')[0] || "Guest"}!
              </h1>
              <p className="text-muted-foreground">
                Track your finances with intelligence
              </p>
            </div>
          </div>
          <Button 
            variant="outline" 
            onClick={handleLogout}
            className="flex items-center gap-2"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>

        {/* Quick Stats */}
        <QuickStats transactions={transactions} />

        {/* Charts Row */}
        <div className="grid grid-cols-1 xl:grid-cols-1 gap-6">
          <ExpensePieChart transactions={transactions} />
        </div>

        {/* Top Row: Add Transaction + Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Add Transaction */}
          <Card className="bg-card border animate-fade-in-up">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-foreground">
                <TrendingUp className="h-5 w-5 text-primary" />
                Add Transaction
              </CardTitle>
            </CardHeader>
            <CardContent>
              <TransactionForm />
            </CardContent>
          </Card>
          
          {/* Recent Activity */}
          <RecentActivity transactions={transactions} />
        </div>

        {/* Chart Section - Full Width */}
        {transactions.length > 0 && (
          <div className="animate-fade-in-up">
            <TransactionChart />
          </div>
        )}

        {/* All Transactions - Full Width */}
        <div className="animate-fade-in-up">
          <TransactionList />
        </div>
      </div>
    </div>
  );
}
