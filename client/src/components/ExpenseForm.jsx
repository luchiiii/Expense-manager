import { useState } from "react";

const CATEGORIES = ["Food", "Transport", "Bills", "Shopping", "Other"];

function ExpenseForm({ onAdd }) {
  const [form, setForm] = useState({
    amount: "",
    category: "",
    date: new Date().toISOString().split("T")[0],
    description: "",
  });
  const [error, setError] = useState("");

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
    onAdd(form);
    setForm({
      amount: "",
      category: "",
      date: new Date().toISOString().split("T")[0],
      description: "",
    });
  };

  return (
    <div className="bg-white dark:bg-[#1E293B] rounded-xl shadow-sm border border-[#E2E8F0] dark:border-[#334155] p-6">
      <h2 className="text-lg font-bold text-[#0F172A] dark:text-[#F8FAFC] mb-4">
        Add Expense
      </h2>
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-[#0F172A] dark:text-[#F8FAFC] mb-1">
            Amount (₦)
          </label>
          <input
            type="number"
            name="amount"
            value={form.amount}
            onChange={handleChange}
            placeholder="Enter amount"
            className="w-full border border-[#E2E8F0] dark:border-[#334155] rounded-xl px-4 py-2 text-sm bg-white dark:bg-[#0F172A] text-[#0F172A] dark:text-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#0F172A] dark:text-[#F8FAFC] mb-1">
            Category
          </label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full border border-[#E2E8F0] dark:border-[#334155] rounded-xl px-4 py-2 text-sm bg-white dark:bg-[#0F172A] text-[#0F172A] dark:text-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
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
          <label className="block text-sm font-medium text-[#0F172A] dark:text-[#F8FAFC] mb-1">
            Date
          </label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="w-full border border-[#E2E8F0] dark:border-[#334155] rounded-xl px-4 py-2 text-sm bg-white dark:bg-[#0F172A] text-[#0F172A] dark:text-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#0F172A] dark:text-[#F8FAFC] mb-1">
            Description (optional)
          </label>
          <input
            type="text"
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Short note e.g. Lunch with client"
            className="w-full border border-[#E2E8F0] dark:border-[#334155] rounded-xl px-4 py-2 text-sm bg-white dark:bg-[#0F172A] text-[#0F172A] dark:text-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-[#4F46E5] hover:bg-[#4338CA] text-white py-2 rounded-xl text-sm font-semibold transition"
        >
          Add Expense
        </button>
      </form>
    </div>
  );
}

export default ExpenseForm;
