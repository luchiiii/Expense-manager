const CATEGORY_COLORS = {
  Food: "#2F6B3A",
  Shopping: "#8B3A2B",
  Transport: "#2A5C73",
  Bills: "#8A6A21",
  Other: "#5B5750",
};

const formatAmount = (amount) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(amount);

function ExpenseItem({ expense, onDelete, onEdit }) {
  const color = CATEGORY_COLORS[expense.category] || CATEGORY_COLORS.Other;

  return (
    <div className="flex items-center justify-between py-4 border-b border-line last:border-b-0">
      <div className="flex items-center gap-4">
        <span
          style={{ borderColor: color, color: color }}
          className="text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-sm border-2 bg-surface shrink-0"
        >
          {expense.category}
        </span>
        <div>
          <p className="font-mono text-sm font-semibold text-ink">
            {formatAmount(expense.amount)}
          </p>
          {expense.description && (
            <p className="text-xs text-ink-soft italic">
              {expense.description}
            </p>
          )}
          <p className="font-mono text-xs text-ink-soft">{expense.date}</p>
        </div>
      </div>
      <div className="flex items-center gap-4 shrink-0">
        <button
          onClick={() => onEdit(expense)}
          className="text-ink-soft hover:text-forest text-xs font-semibold uppercase tracking-wide transition"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(expense.id)}
          className="text-stamp-red hover:text-[#8a2c22] text-xs font-semibold uppercase tracking-wide transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default ExpenseItem;
