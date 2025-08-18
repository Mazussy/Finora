import React from "react";
import { useTransactions } from "../hooks/useTransaction";

const Home: React.FC = () => {
  const { transactions, deleteTransaction } = useTransactions();

  // Calculate balance, income, expenses
  const income = transactions
    .filter((t) => t.amount > 0)
    .reduce((acc, t) => acc + t.amount, 0);

  const expense = transactions
    .filter((t) => t.amount < 0)
    .reduce((acc, t) => acc + t.amount, 0);

  const balance = income + expense;

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <h1>Expense Tracker</h1>

      <div style={{ marginBottom: "20px" }}>
        <h2>Balance: ${balance.toFixed(2)}</h2>
        <p>Income: ${income.toFixed(2)}</p>
        <p>Expense: ${expense.toFixed(2)}</p>
      </div>

      <h2>Transactions</h2>
      <ul>
        {transactions.length === 0 ? (
          <p>No transactions yet.</p>
        ) : (
          transactions.map((t) => (
            <li key={t.id}>
              {t.description} - ${t.amount} ({t.date})
              <button
                onClick={() => deleteTransaction(t.id)}
                style={{ marginLeft: "10px" }}
              >
                Delete
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Home;
