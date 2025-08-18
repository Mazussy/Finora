import { useAuth } from "../hooks/useAuth";
import { useTransactions } from "../hooks/useTransaction";
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";
import TransactionChart from "../components/TransactionChart";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const { transactions } = useTransactions();

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">
          Welcome, {user ? user : "Guest"}
        </h1>
        {user && <Button onClick={logout}>Logout</Button>}
      </div>

      <TransactionForm />
      <TransactionList />

      {transactions.length > 0 && (
        <div className="mt-6">
          <TransactionChart />
        </div>
      )}
    </div>
  );
}
