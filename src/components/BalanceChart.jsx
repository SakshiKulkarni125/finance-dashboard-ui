import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function BalanceChart({
  transactions,
  darkMode,
}) {
  const data = transactions.map((txn, index) => ({
    name: txn.date,
    balance: transactions
      .slice(0, index + 1)
      .reduce((sum, item) => {
        const amount = Number(
          item.amount.replace("₹", "").replace(",", "")
        );

        return item.type === "Income"
          ? sum + amount
          : sum - amount;
      }, 0),
  }));

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
        Balance Trend
      </h2>

      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="balance"
            stroke="#0f172a"
            strokeWidth={3}
            dot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}