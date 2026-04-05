import { useState, useEffect } from "react";
import SummaryCard from "./components/SummaryCard";
import BalanceChart from "./components/BalanceChart";
import CategoryChart from "./components/CategoryChart";
import TransactionTable from "./components/TransactionTable";
import Insights from "./components/Insights";

function App() {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("transactions");
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: 1,
            date: "02 Apr 2026",
            amount: "₹5,000",
            category: "Salary",
            type: "Income",
          },
          {
            id: 2,
            date: "01 Apr 2026",
            amount: "₹850",
            category: "Food",
            type: "Expense",
          },
          {
            id: 3,
            date: "30 Mar 2026",
            amount: "₹2,000",
            category: "Shopping",
            type: "Expense",
          },
        ];
  });

  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("Expense");
  const [role, setRole] = useState("Viewer");
  const [showForm, setShowForm] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    localStorage.setItem(
      "transactions",
      JSON.stringify(transactions)
    );
  }, [transactions]);

  const handleAddTransaction = () => {
    if (!category || !amount) return;

    const newTransaction = {
      id: transactions.length + 1,
      date: new Date().toLocaleDateString("en-GB"),
      amount: `₹${amount}`,
      category,
      type,
    };

    setTransactions([...transactions, newTransaction]);

    setCategory("");
    setAmount("");
    setType("Expense");
    setShowForm(false);
  };

  const handleDeleteTransaction = (id) => {
    const updatedTransactions = transactions.filter(
      (txn) => txn.id !== id
    );
    setTransactions(updatedTransactions);
  };

  const totalIncome = transactions
    .filter((txn) => txn.type === "Income")
    .reduce(
      (sum, txn) =>
        sum +
        Number(
          txn.amount.replace("₹", "").replace(",", "")
        ),
      0
    );

  const totalExpenses = transactions
    .filter((txn) => txn.type === "Expense")
    .reduce(
      (sum, txn) =>
        sum +
        Number(
          txn.amount.replace("₹", "").replace(",", "")
        ),
      0
    );

  const totalBalance = totalIncome - totalExpenses;

  return (
    <div
      className={`min-h-screen flex ${
        darkMode
          ? "bg-slate-900"
          : "bg-gradient-to-br from-slate-50 via-slate-100 to-blue-50"
      }`}
    >
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-slate-950 to-slate-900 text-white p-8 shadow-2xl">
        <h1 className="text-3xl font-bold mb-4 tracking-tight">
          FinTrack
        </h1>

        {/* Profile */}
        <div className="mb-10 p-4 rounded-2xl bg-white/10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold text-lg">
              {role === "Admin" ? "A" : "V"}
            </div>

            <div>
              <p className="text-sm font-medium">
                {role === "Admin"
                  ? "Admin User"
                  : "Viewer User"}
              </p>
              <p className="text-xs text-gray-300">
                {role}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="space-y-6 text-sm font-medium">
          <a href="#dashboard" className="block text-emerald-400">
            Dashboard
          </a>
          <a
            href="#transactions"
            className="block hover:text-white/80 transition-all"
          >
            Transactions
          </a>
          <a
            href="#insights"
            className="block hover:text-white/80 transition-all"
          >
            Insights
          </a>
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 p-10">
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1
              className={`text-5xl font-bold tracking-tight ${
                darkMode
                  ? "text-white"
                  : "text-slate-900"
              }`}
            >
              Financial Overview
            </h1>
            <p
              className={`mt-2 text-lg ${
                darkMode
                  ? "text-slate-300"
                  : "text-slate-500"
              }`}
            >
              Executive summary of balances and
              transactions
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() =>
                setDarkMode(!darkMode)
              }
              className="bg-slate-900 text-white px-4 py-3 rounded-xl"
            >
              {darkMode
                ? "☀️ Light"
                : "🌙 Dark"}
            </button>

            <select
              value={role}
              onChange={(e) =>
                setRole(e.target.value)
              }
              className="bg-white border border-slate-200 px-5 py-3 rounded-2xl shadow-sm"
            >
              <option>Viewer</option>
              <option>Admin</option>
            </select>

            {role === "Admin" && (
              <button
                onClick={() =>
                  setShowForm(!showForm)
                }
                className="bg-emerald-600 text-white px-6 py-3 rounded-2xl shadow-md hover:scale-105 transition-all"
              >
                + Add Transaction
              </button>
            )}
          </div>
        </div>

        {/* Add Transaction Form */}
        {showForm && (
          <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
            <input
              type="text"
              placeholder="Category"
              value={category}
              onChange={(e) =>
                setCategory(e.target.value)
              }
              className="border p-3 rounded-xl mr-3"
            />

            <input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) =>
                setAmount(e.target.value)
              }
              className="border p-3 rounded-xl mr-3"
            />

            <select
              value={type}
              onChange={(e) =>
                setType(e.target.value)
              }
              className="border p-3 rounded-xl mr-3"
            >
              <option>Income</option>
              <option>Expense</option>
            </select>

            <button
              onClick={handleAddTransaction}
              className="bg-slate-900 text-white px-4 py-3 rounded-xl"
            >
              Save
            </button>
          </div>
        )}

        {/* Summary Cards */}
        <div
          id="dashboard"
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10"
        >
          <SummaryCard
            title="Total Balance"
            amount={`₹${totalBalance}`}
            darkMode={darkMode}
          />

          <SummaryCard
            title="Income"
            amount={`₹${totalIncome}`}
            darkMode={darkMode}
          />

          <SummaryCard
            title="Expenses"
            amount={`₹${totalExpenses}`}
            darkMode={darkMode}
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          <BalanceChart
            transactions={transactions}
            darkMode={darkMode}
          />

          <CategoryChart
            transactions={transactions}
            darkMode={darkMode}
          />
        </div>

        {/* Transactions */}
        <div id="transactions" className="mb-10">
          <TransactionTable
            transactions={transactions}
            onDelete={handleDeleteTransaction}
            role={role}
          />
        </div>

        {/* Insights */}
        <div id="insights">
<Insights
  transactions={transactions}
  darkMode={darkMode}
/>        </div>
      </main>
    </div>
  );
}

export default App;