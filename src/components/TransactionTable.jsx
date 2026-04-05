import { useState } from "react";

export default function TransactionTable({
  transactions,
  onDelete,
  role,
}) {
  const [filter, setFilter] = useState("All");

  const filteredTransactions =
    filter === "All"
      ? transactions
      : transactions.filter((txn) => txn.type === filter);

  return (
    <div className="bg-white rounded-2xl shadow-md p-5 mt-6">
      <h2 className="text-lg font-semibold mb-4">
        Recent Transactions
      </h2>

      {/* Search + Filter */}
      <div className="flex gap-3 mb-4">
        <input
          type="text"
          placeholder="Search transactions..."
          className="border rounded-lg px-3 py-2 w-full"
        />

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border rounded-lg px-3 py-2"
        >
          <option>All</option>
          <option>Income</option>
          <option>Expense</option>
        </select>
      </div>

      {filteredTransactions.length === 0 && (
        <p className="text-gray-500">
          No transactions found
        </p>
      )}

      {/* Table */}
      <table className="w-full text-left">
        <thead>
          <tr className="border-b">
            <th className="py-2">Date</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Type</th>
            {role === "Admin" && <th>Action</th>}
          </tr>
        </thead>

        <tbody>
          {filteredTransactions.map((txn) => (
            <tr
              key={txn.id}
              className="border-b hover:bg-gray-50 transition-all"
            >
              <td className="py-3">{txn.date}</td>
              <td>{txn.amount}</td>
              <td>{txn.category}</td>

              <td
                className={
                  txn.type === "Income"
                    ? "text-green-600 font-medium"
                    : "text-red-600 font-medium"
                }
              >
                {txn.type}
              </td>

              {role === "Admin" && (
                <td>
                  <button
                    onClick={() => onDelete(txn.id)}
                    className="text-red-500 hover:text-red-700 text-lg"
                  >
                    🗑️
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}