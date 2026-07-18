import { useState } from "react";

const CATEGORIES = ["Food", "Transport", "Bills", "Shopping", "Other"];

const emptyForm = {
  amount: "",
  category: "",
  date: new Date().toISOString().split("T")[0],
  description: "",
};

// Builds the initial form state directly from editingExpense (if present).
// No effect needed: App.jsx remounts this component with a fresh key
// whenever editingExpense changes, so this initializer runs again naturally.
function buildInitialForm(editingExpense) {
  if (!editingExpense) return emptyForm;
  return {
    amount: editingExpense.amount,
    category: editingExpense.category,
    date: editingExpense.date,
    description: editingExpense.description || "",
  };
}

function ExpenseForm({ onAdd, onUpdate, editingExpense, onCancelEdit }) {
  const [form, setForm] = useState(() => buildInitialForm(editingExpense));
  const [error, setError] = useState("");

  const isEditing = Boolean(editingExpense);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.amount || Number(form.amount) <= 0) {
      setError("Amount must be greater than 0");
      return;
    }
    if (!form.category) {
      setError("Please select a category");
      return;
    }
    setError("");

    if (isEditing) {
      onUpdate(editingExpense.id, form);
    } else {
      onAdd(form);
      setForm(emptyForm);
    }
  };

  return (
    <div className="bg-surface rounded-sm border border-line p-6">
      <h2 className="font-display text-xl font-semibold text-ink mb-5">
        {isEditing ? "Edit Expense" : "Add Expense"}
      </h2>

      {error && <p className="text-stamp-red text-sm mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-xs font-semibold text-ink-soft uppercase tracking-widest mb-1.5">
            Amount (₦)
          </label>
          <input
            type="number"
            name="amount"
            value={form.amount}
            onChange={handleChange}
            placeholder="Enter amount"
            className="w-full border-0 border-b-2 border-line bg-transparent px-1 py-2 text-sm font-mono text-ink focus:outline-none focus:border-forest transition"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-ink-soft uppercase tracking-widest mb-1.5">
            Category
          </label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full border-0 border-b-2 border-line bg-transparent px-1 py-2 text-sm text-ink focus:outline-none focus:border-forest transition"
          >
            <option value="">Select a category</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-ink-soft uppercase tracking-widest mb-1.5">
            Date
          </label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="w-full border-0 border-b-2 border-line bg-transparent px-1 py-2 text-sm font-mono text-ink focus:outline-none focus:border-forest transition"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-ink-soft uppercase tracking-widest mb-1.5">
            Description (optional)
          </label>
          <input
            type="text"
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Short note e.g. Lunch with client"
            className="w-full border-0 border-b-2 border-line bg-transparent px-1 py-2 text-sm text-ink focus:outline-none focus:border-forest transition"
          />
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            className="flex-1 bg-forest hover:bg-forest-dark text-white py-2.5 rounded-sm text-xs font-semibold uppercase tracking-widest transition"
          >
            {isEditing ? "Update Expense" : "Add Expense"}
          </button>
          {isEditing && (
            <button
              type="button"
              onClick={onCancelEdit}
              className="px-4 py-2.5 rounded-sm text-xs font-semibold uppercase tracking-widest text-ink-soft border border-line hover:bg-paper transition"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default ExpenseForm;
