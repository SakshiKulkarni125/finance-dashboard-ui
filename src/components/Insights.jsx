export default function Insights({
  transactions,
  darkMode,
}) {
  const expenses = transactions.filter(
    (txn) => txn.type === "Expense"
  );

  const income = transactions.filter(
    (txn) => txn.type === "Income"
  );

  const totalIncome = income.reduce(
    (sum, txn) =>
      sum +
      Number(
        txn.amount.replace("₹", "").replace(",", "")
      ),
    0
  );

  const totalExpenses = expenses.reduce(
    (sum, txn) =>
      sum +
      Number(
        txn.amount.replace("₹", "").replace(",", "")
      ),
    0
  );

  const categoryTotals = expenses.reduce(
    (acc, txn) => {
      const amount = Number(
        txn.amount.replace("₹", "").replace(",", "")
      );

      acc[txn.category] =
        (acc[txn.category] || 0) + amount;

      return acc;
    },
    {}
  );

  const highestCategory =
    Object.entries(categoryTotals).sort(
      (a, b) => b[1] - a[1]
    )[0] || ["None", 0];

  const netFlow = totalIncome - totalExpenses;

  const expenseRatio =
    totalIncome > 0
      ? ((totalExpenses / totalIncome) * 100).toFixed(1)
      : 0;

  return (
    <div
      className={`rounded-3xl shadow-md border p-8 ${
        darkMode
          ? "bg-slate-800 border-slate-700"
          : "bg-white border-slate-200"
      }`}
    >
      <h2
        className={`text-2xl font-semibold mb-6 ${
          darkMode ? "text-white" : "text-slate-900"
        }`}
      >
        Insights
      </h2>

      <div className="space-y-4">
        <p>
          💸 Highest spending category:{" "}
          <span className="font-semibold">
            {highestCategory[0]} (₹
            {highestCategory[1]})
          </span>
        </p>

        <p>
          📈 Net cash flow:{" "}
          <span className="font-semibold">
            ₹{netFlow}
          </span>
        </p>

        <p>
          💡 Expenses are{" "}
          <span className="font-semibold">
            {expenseRatio}%
          </span>{" "}
          of income
        </p>
      </div>
    </div>
  );
}