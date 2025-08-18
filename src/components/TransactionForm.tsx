import { useState } from "react";
import { useTransactions } from "../hooks/useTransaction";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function TransactionForm() {
  const { addTransaction } = useTransactions();
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description || !amount) return;

    addTransaction({
      description,
      amount: parseFloat(amount),
      date: new Date().toISOString().split("T")[0],
    });

    setDescription("");
    setAmount("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded-2xl shadow space-y-4"
    >
      <Input
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Input
        placeholder="Amount"
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <Button type="submit" className="w-full">
        Add Transaction
      </Button>
    </form>
  );
}
