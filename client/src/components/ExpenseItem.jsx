function ExpenseItem({ expense, onDelete }) {
  const categoryColors = {
    Food: "bg-green-100 text-green-700",
    Transport: "bg-blue-100 text-blue-700",
    Bills: "bg-red-100 text-red-700",
    Shopping: "bg-purple-100 text-purple-700",
    Other: "bg-gray-100 text-gray-700",
  };

  return (
    <div className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition">
      <div className="flex items-center gap-4">
        <span
          className={`text-xs font-semibold px-3 py-1 rounded-full ${
            categoryColors[expense.category] || "bg-gray-100 text-gray-700"
          }`}
        >
          {expense.category}
        </span>
        <div>
          <p className="text-sm font-semibold text-gray-800">
            ₦{Number(expense.amount).toLocaleString()}
          </p>
          {expense.description && (
            <p className="text-xs text-gray-500">{expense.description}</p>
          )}
          <p className="text-xs text-gray-400">{expense.date}</p>
        </div>
      </div>
      <button
        onClick={() => onDelete(expense.id)}
        className="text-red-400 hover:text-red-600 text-sm font-medium transition"
      >
        Delete
      </button>
    </div>
  );
}

export default ExpenseItem;
