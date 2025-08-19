import { useState } from "react";
import { useTransactions } from "../hooks/useTransaction";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, DollarSign } from "lucide-react";

export default function TransactionForm() {
  const { addTransaction } = useTransactions();
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState<"income" | "expense">("expense");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted with:", { description, amount, type });
    
    if (!description.trim() || !amount.trim()) {
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
        date: new Date().toISOString().split("T")[0],
      });

      console.log("Transaction added successfully!");
      setDescription("");
      setAmount("");
      setType("expense");
    } catch (error) {
      console.error("Error adding transaction:", error);
      alert(`Failed to add transaction: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card style={{ backgroundColor: '#393E46', borderColor: '#393E46' }}>
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2" style={{ color: '#EEEEEE' }}>
          <div className="p-2 rounded-lg" style={{ background: 'linear-gradient(135deg, #00ADB5 0%, #00d4dd 100%)' }}>
            <Plus className="h-4 w-4 text-white" />
          </div>
          Add Transaction
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="description" style={{ color: '#EEEEEE' }}>
              Description
            </Label>
            <Input
              id="description"
              placeholder="Enter transaction description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{ 
                backgroundColor: '#222831', 
                borderColor: '#222831', 
                color: '#EEEEEE' 
              }}
              className="placeholder:text-gray-400 focus:border-orange-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="type" style={{ color: '#EEEEEE' }}>
              Type
            </Label>
            <Select value={type} onValueChange={(value: "income" | "expense") => setType(value)}>
              <SelectTrigger style={{ backgroundColor: '#222831', borderColor: '#222831', color: '#EEEEEE' }}>
                <SelectValue placeholder="Select transaction type" />
              </SelectTrigger>
              <SelectContent style={{ backgroundColor: '#393E46', borderColor: '#393E46' }}>
                <SelectItem value="income" className="text-green-400">
                  Income (+)
                </SelectItem>
                <SelectItem value="expense" className="text-red-400">
                  Expense (-)
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount" style={{ color: '#EEEEEE' }}>
              Amount
            </Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4" style={{ color: '#00ADB5' }} />
              <Input
                id="amount"
                placeholder="0.00"
                type="number"
                step="0.01"
                min="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                style={{ 
                  backgroundColor: '#222831', 
                  borderColor: '#222831', 
                  color: '#EEEEEE',
                  paddingLeft: '2.5rem'
                }}
                className="placeholder:text-gray-400 focus:border-cyan-500"
              />
            </div>
          </div>

          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full text-white font-medium py-2.5"
            style={{ background: 'linear-gradient(135deg, #00ADB5 0%, #00d4dd 100%)' }}
          >
            <Plus className="h-4 w-4 mr-2" />
            {isSubmitting ? "Adding..." : "Add Transaction"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
