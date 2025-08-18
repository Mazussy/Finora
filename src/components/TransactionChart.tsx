import { useTransactions } from "../hooks/useTransaction";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function TransactionChart() {
  const { transactions } = useTransactions();

  return (
    <div className="bg-white p-4 rounded-2xl shadow h-80">
      <h2 className="text-lg font-bold mb-3">Spending Over Time</h2>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={transactions}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="amount" stroke="#2563eb" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
