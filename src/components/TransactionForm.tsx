import { useState } from "react";
import { useTransactions } from "../hooks/useTransaction";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DollarSign } from "lucide-react";
import { DEFAULT_CATEGORIES } from "../types/categories";

export default function TransactionForm() {
  const { addTransaction } = useTransactions();
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState<"income" | "expense">("expense");
  const [categoryId, setCategoryId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted with:", { description, amount, type, categoryId });
    
    if (!description.trim() || !amount.trim() || !categoryId) {
      alert("Please fill in all fields");
      return;
    }

    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      alert("Please enter a valid amount greater than 0");
      return;
    }

    setIsSubmitting(true);
    console.log("Starting to add transaction...");
    
    try {
      await addTransaction({
        description: description.trim(),
        amount: type === "income" ? Math.abs(numericAmount) : -Math.abs(numericAmount),
        type,
        categoryId,
        date: new Date().toISOString().split("T")[0],
      });

      console.log("Transaction added successfully!");
      setDescription("");
      setAmount("");
      setCategoryId("");
      setType("expense");
    } catch (error) {
      console.error("Error adding transaction:", error);
      alert(`Failed to add transaction: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const availableCategories = DEFAULT_CATEGORIES.filter(
    cat => type === "income" ? cat.type === "income" : cat.type === "expense"
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-4 animate-fade-in-up">
      <div className="space-y-2">
        <Label htmlFor="description" className="text-foreground">
          Description
        </Label>
        <Input
          id="description"
          placeholder="Enter transaction description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="bg-secondary border-border text-foreground placeholder:text-muted-foreground focus:border-primary"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="type" className="text-foreground">
          Type
        </Label>
        <Select value={type} onValueChange={(value: "income" | "expense") => {
          setType(value);
          setCategoryId(""); // Reset category when type changes
        }}>
          <SelectTrigger className="bg-secondary border-border text-foreground hover:bg-accent">
            <SelectValue placeholder="Select transaction type" />
          </SelectTrigger>
          <SelectContent className="bg-secondary border-border shadow-lg z-[9999] backdrop-blur-none">
            <SelectItem value="income" className="text-green-400 hover:bg-accent focus:bg-accent cursor-pointer bg-secondary">
              💰 Income
            </SelectItem>
            <SelectItem value="expense" className="text-red-400 hover:bg-accent focus:bg-accent cursor-pointer bg-secondary">
              💸 Expense
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="category" className="text-foreground">
          Category
        </Label>
        <Select value={categoryId} onValueChange={setCategoryId}>
          <SelectTrigger className="bg-secondary border-border text-foreground hover:bg-accent">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent className="bg-secondary border-border shadow-lg z-[9999] backdrop-blur-none">
            {availableCategories.map((category) => (
              <SelectItem key={category.id} value={category.id} className="text-foreground hover:bg-accent focus:bg-accent cursor-pointer bg-secondary">
                <div className="flex items-center gap-2">
                  <span>{category.icon}</span>
                  <span>{category.name}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="amount" className="text-foreground">
          Amount
        </Label>
        <div className="relative">
          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="amount"
            placeholder="0.00"
            type="number"
            step="0.01"
            min="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="bg-secondary border-border text-foreground placeholder:text-muted-foreground pl-10 focus:border-primary no-spinners"
          />
        </div>
      </div>

      <Button 
        type="submit" 
        disabled={isSubmitting}
        className="w-full"
      >
        {isSubmitting ? "Adding..." : "Add Transaction"}
      </Button>
    </form>
  );
}
