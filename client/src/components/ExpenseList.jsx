import ExpenseItem from "./ExpenseItem";

function ExpenseList({ expenses, onDelete, onEdit }) {
  if (expenses.length === 0) {
    return (
      <div className="bg-surface rounded-sm border border-line p-6 text-center">
        <p className="text-ink-soft text-sm">
          No expenses yet. Add one to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-surface rounded-sm border border-line p-6">
      <h2 className="font-display text-xl font-semibold text-ink mb-2">
        Expenses
      </h2>
      <div>
        {expenses.map((expense) => (
          <ExpenseItem
            key={expense.id}
            expense={expense}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
      </div>
    </div>
  );
}

export default ExpenseList;
