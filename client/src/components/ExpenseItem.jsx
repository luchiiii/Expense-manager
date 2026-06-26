const CATEGORY_COLORS = {
  Food: { bg: "#DCFCE7", text: "#16A34A" },
  Shopping: { bg: "#F3E8FF", text: "#9333EA" },
  Transport: { bg: "#DBEAFE", text: "#2563EB" },
  Bills: { bg: "#FFEDD5", text: "#EA580C" },
  Other: { bg: "#E5E7EB", text: "#4B5563" },
};

const formatAmount = (amount) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(amount);

function ExpenseItem({ expense, onDelete }) {
  const colors = CATEGORY_COLORS[expense.category] || CATEGORY_COLORS.Other;

  return (
    <div className="flex items-center justify-between p-4 border border-[#E2E8F0] dark:border-[#334155] rounded-xl hover:bg-[#F8FAFC] dark:hover:bg-[#0F172A] transition">
      <div className="flex items-center gap-4">
        <span
          style={{ backgroundColor: colors.bg, color: colors.text }}
          className="text-xs font-semibold px-3 py-1 rounded-full"
        >
          {expense.category}
        </span>
        <div>
          <p className="text-sm font-bold text-[#0F172A] dark:text-[#F8FAFC]">
            {formatAmount(expense.amount)}
          </p>
          {expense.description && (
            <p className="text-xs text-[#64748B] dark:text-[#94A3B8]">
              {expense.description}
            </p>
          )}
          <p className="text-xs text-[#64748B] dark:text-[#94A3B8]">
            {expense.date}
          </p>
        </div>
      </div>
      <button
        onClick={() => onDelete(expense.id)}
        className="text-[#EF4444] hover:text-red-700 text-sm font-medium transition"
      >
        Delete
      </button>
    </div>
  );
}

export default ExpenseItem;
