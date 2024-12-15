"use client"
import { useState } from "react";

export default function Home() {
  const [income, setIncome] = useState("");
  const [expense, setExpense] = useState("");
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [budget, setBudget] = useState(0);


  type Transaction = {
    type: "income" | "expense";
    amount: number;
  };

  type TransactionType = "income" | "expense";


const handleAddTransaction = (type: TransactionType) => {
    if (type === "income" && income) {
      setTransactions([...transactions, { type, amount: parseFloat(income) }]);
      setIncome("");
    } else if (type === "expense" && expense) {
      setTransactions([...transactions, { type, amount: parseFloat(expense) }]);
      setExpense("");
    }
  };

  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const remainingBudget = totalIncome - totalExpense;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4">
      <h1 className="buddy1  text-4xl md:text-5xl lg:text-5xl font-bold text-blue-600 mb-6">Budget Buddy</h1>

      {/* Budget Input */}
      <div className="mb-6 w-full max-w-md">
        <label className="buddy2  block text-2xl mb-2 text-fuchsia-500 font-bold">Set Monthly Budget</label>
        <input
          type="number"
          value={budget}
          onChange={(e) => setBudget(parseFloat(e.target.value) || 0)}
          placeholder="Enter your budget"
          className="w-full border rounded-md p-2 text-gray-700"
        />
      </div>

      {/* Income/Expense Input */}
      <div className="flex flex-col md:flex-row gap-4 mb-6 w-full max-w-md">
        <div className="flex-1">
          <label className="buddy3  block text-xl text-green-500 font-bold mb-2">Add Income</label>
          <input
            type="number"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
            placeholder="Enter income"
            className="w-full border rounded-md p-2 text-gray-700"
          />
          <button
            onClick={() => handleAddTransaction("income")}
            className="btn1  mt-2 bg-green-500 font-bold text-white py-2 px-4 rounded-md hover:bg-green-600"
          >
            Add Income
          </button>
        </div>
        <div className="flex-1">
          <label className="buddy4  block text-xl text-red-500 font-bold mb-2">Add Expense</label>
          <input
            type="number"
            value={expense}
            onChange={(e) => setExpense(e.target.value)}
            placeholder="Enter expense"
            className="w-full border rounded-md p-2 text-gray-700"
          />
          <button
            onClick={() => handleAddTransaction("expense")}
            className="btn2  mt-2 bg-red-500 font-bold text-white py-2 px-4 rounded-md hover:bg-red-600"
          >
            Add Expense
          </button>
        </div>
      </div>

      {/* Budget Summary */}
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md mb-6">
        <h2 className="buddy5  text-2xl text-black font-bold mb-4">Budget Summary</h2>
        <p className="text-green-500 text-sm md-text-lg lg:text-lg">
          <strong>Total Income:</strong> Rs. {totalIncome}
        </p>
        <p className="text-red-500 text-sm md-text-lg lg:text-lg">
          <strong>Total Expense:</strong> Rs. {totalExpense}
        </p>
        <p className="text-fuchsia-500 text-sm md-text-lg lg:text-lg">
          <strong>Remaining Budget:</strong>{" "}
          <span className={remainingBudget < 0 ? "text-red-500" : "text-green-500"} >
            Rs. {remainingBudget}
          </span>
        </p>
      </div>

      {/* Progress Bar */}
      {budget > 0 && (
        <div className="w-full max-w-md">
          <div className="w-full bg-gray-300 h-4 rounded-md overflow-hidden">
            <div
              className={`h-full ${
                remainingBudget >= 0 ? "bg-green-500" : "bg-red-500"
              }`}
              style={{
                width: `${Math.min((totalExpense / budget) * 100, 100)}%`,
              }}
            ></div>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            {Math.min((totalExpense / budget) * 100, 100).toFixed(2)}% of your budget spent
          </p>
        </div>
      )}

<div className="w-full flex justify-start md:justify-center lg:justify-center items-center">
  <h4 className="author  text-gray-400 text-left">Author: Azmat Ali</h4>
</div>



    </div>
  );
}
