import ExpenseItem from "./ExpenseItem";

function ExpenseList({ expenses, onDelete }) {
  if (expenses.length === 0) {
    return (
       <div className="bg-white dark:bg-[#1E293B] rounded-xl shadow-sm border border-[#E2E8F0] dark:border-[#334155] p-6 text-center">
        <p className="text-[#64748B] dark:text-[#94A3B8] text-sm">
          No expenses yet. Add one above!
        </p>
      </div>
    );
  }
  return (
    <div className="bg-white dark:bg-[#1E293B] rounded-xl shadow-sm border border-[#E2E8F0] dark:border-[#334155] p-6">
      <h2 className="text-xl font-bold text-[#0F172A] dark:text-[#F8FAFC] mb-4">Expenses</h2>
      <div className="space-y-3">
        {expenses.map((expense) => (
          <ExpenseItem key={expense.id} expense={expense} onDelete={onDelete} />
        ))}
      </div>
    </div>
  );
}

export default ExpenseList;
