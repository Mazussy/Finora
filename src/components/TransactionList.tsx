import { useTransactions } from "../hooks/useTransaction";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { TrendingUp, TrendingDown, Trash2, Receipt } from "lucide-react";

export default function TransactionList() {
  const { transactions, deleteTransaction, loading } = useTransactions();

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this transaction?")) {
      try {
        await deleteTransaction(id);
      } catch (error) {
        console.error("Error deleting transaction:", error);
        alert("Failed to delete transaction. Please try again.");
      }
    }
  };

  if (loading) {
    return (
      <Card style={{ backgroundColor: '#393E46', borderColor: '#393E46' }}>
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2" style={{ color: '#EEEEEE' }}>
            <div className="p-2 rounded-lg" style={{ background: 'linear-gradient(135deg, #00ADB5 0%, #00d4dd 100%)' }}>
              <Receipt className="h-4 w-4 text-white" />
            </div>
            Loading Transactions...
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <div className="p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center animate-pulse" style={{ backgroundColor: '#222831' }}>
              <Receipt className="h-8 w-8" style={{ color: '#00ADB5' }} />
            </div>
            <p style={{ color: '#EEEEEE' }}>Loading your transactions...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (transactions.length === 0) {
    return (
      <Card style={{ backgroundColor: '#393E46', borderColor: '#393E46' }}>
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2" style={{ color: '#EEEEEE' }}>
            <div className="p-2 rounded-lg" style={{ background: 'linear-gradient(135deg, #FD7014 0%, #ff8c42 100%)' }}>
              <Receipt className="h-4 w-4 text-white" />
            </div>
            All Transactions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <div className="p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: '#222831' }}>
              <Receipt className="h-8 w-8" style={{ color: '#00ADB5' }} />
            </div>
            <p className="mb-2 text-lg" style={{ color: '#EEEEEE' }}>No transactions found</p>
            <p style={{ color: '#EEEEEE' }}>Add your first transaction using the form on the left!</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card style={{ backgroundColor: '#393E46', borderColor: '#393E46' }}>
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2" style={{ color: '#EEEEEE' }}>
          <div className="p-2 rounded-lg" style={{ background: 'linear-gradient(135deg, #00ADB5 0%, #00d4dd 100%)' }}>
            <Receipt className="h-4 w-4 text-white" />
          </div>
          All Transactions
          <Badge variant="secondary" className="ml-auto" style={{ backgroundColor: '#222831', color: '#EEEEEE' }}>
            {transactions.length}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {transactions.map((t, index) => (
            <div key={t.id}>
              <div className="flex items-center justify-between group hover:bg-black/20 p-3 rounded-lg transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${t.amount > 0 ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
                    {t.amount > 0 ? 
                      <TrendingUp className="h-4 w-4 text-green-400" /> : 
                      <TrendingDown className="h-4 w-4 text-red-400" />
                    }
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium" style={{ color: '#EEEEEE' }}>{t.description}</span>
                      <Badge 
                        variant={t.amount > 0 ? "default" : "destructive"}
                        className={`text-xs ${
                          t.amount > 0 
                            ? "bg-green-500/20 text-green-400 border-green-500/30" 
                            : "bg-red-500/20 text-red-400 border-red-500/30"
                        }`}
                      >
                        {t.amount > 0 ? "Income" : "Expense"}
                      </Badge>
                    </div>
                    <p className="text-sm" style={{ color: '#EEEEEE' }}>{t.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span 
                    className={`font-bold text-lg ${
                      t.amount > 0 ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {t.amount > 0 ? "+" : ""}${t.amount.toFixed(2)}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(t.id)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-red-400 hover:text-red-300 hover:bg-red-500/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              {index < transactions.length - 1 && (
                <Separator style={{ backgroundColor: '#222831' }} />
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
