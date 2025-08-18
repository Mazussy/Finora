import { useTransactions } from "../hooks/useTransaction";
import { Button } from "@/components/ui/button";

export default function TransactionList() {
  const { transactions, deleteTransaction } = useTransactions();

  return (
    <div className="bg-white p-4 rounded-2xl shadow">
      <h2 className="text-lg font-bold mb-3">Transactions</h2>
      <ul className="space-y-2">
        {transactions.map((t) => (
          <li
            key={t.id}
            className="flex justify-between items-center p-2 border rounded"
          >
            <span>
              {t.description} - ${t.amount} ({t.date})
            </span>
            <Button variant="destructive" onClick={() => deleteTransaction(t.id)}>
              Delete
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
