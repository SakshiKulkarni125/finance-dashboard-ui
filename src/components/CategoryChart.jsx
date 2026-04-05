import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#f59222", "#d71616", "#009b34", "#3f4ba5" , "#ff69b4", "#8a2be2", "#00ced1", "#ff4500", "#2e8b57", "#ff6347"];

export default function CategoryChart({
  transactions,
  darkMode,
}) {
  const expenseCategories = transactions
    .filter((txn) => txn.type === "Expense")
    .reduce((acc, txn) => {
      const amount = Number(
        txn.amount.replace("₹", "").replace(",", "")
      );

      acc[txn.category] =
        (acc[txn.category] || 0) + amount;

      return acc;
    }, {});

  const data = Object.entries(expenseCategories).map(
    ([name, value]) => ({
      name,
      value,
    })
  );

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
        Spending Breakdown
      </h2>

      <ResponsiveContainer width="100%" height={350}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={120}
            dataKey="value"
            label
          >
            {data.map((_, index) => (
              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}