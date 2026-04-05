export default function SummaryCard({ title, amount, darkMode }) {
  return (
    <div
      className={`rounded-3xl shadow-md border p-8 hover:shadow-xl transition-all duration-300 ${
        darkMode
          ? "bg-slate-800 border-slate-700"
          : "bg-white border-slate-200"
      }`}
    >
      <p
        className={`text-sm font-medium ${
          darkMode ? "text-slate-300" : "text-slate-500"
        }`}
      >
        {title}
      </p>

      <h2
        className={`text-5xl font-bold mt-5 tracking-tight ${
          darkMode ? "text-white" : "text-slate-900"
        }`}
      >
        {amount}
      </h2>

      <p className="text-emerald-600 text-sm mt-4 font-medium">
        Live synced
      </p>
    </div>
  );
}