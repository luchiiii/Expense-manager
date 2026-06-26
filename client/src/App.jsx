import { useState, useEffect } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import Summary from "./components/Summary";
import {
  getExpenses,
  createExpense,
  deleteExpense,
  getSummary,
} from "./api/expenses";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [summary, setSummary] = useState({ total: 0, breakdown: [] });
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [expensesData, summaryData] = await Promise.all([
          getExpenses(),
          getSummary(),
        ]);
        setExpenses(expensesData);
        setSummary(summaryData);
      } catch {
        setError("Failed to load expenses. Make sure the server is running.");
      }
    };

    fetchData();
  }, []);

  const handleAdd = async (form) => {
    try {
      await createExpense({
        ...form,
        amount: Number(form.amount),
      });
      const [expensesData, summaryData] = await Promise.all([
        getExpenses(),
        getSummary(),
      ]);
      setExpenses(expensesData);
      setSummary(summaryData);
    } catch {
      setError("Failed to add expense. Please try again.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteExpense(id);
      const [expensesData, summaryData] = await Promise.all([
        getExpenses(),
        getSummary(),
      ]);
      setExpenses(expensesData);
      setSummary(summaryData);
    } catch {
      setError("Failed to delete expense. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0F172A] transition-colors duration-300">
      {/* Header */}
      <header className="bg-white dark:bg-[#1E293B] border-b border-[#E2E8F0] dark:border-[#334155] px-6 py-4 flex justify-between items-center shadow-sm">
        <h1 className="text-2xl font-bold text-[#0F172A] dark:text-[#F8FAFC]">
          Expense Manager
        </h1>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3 mb-6">
            {error}
          </div>
        )}

        {/* Summary */}
        <Summary total={summary.total} breakdown={summary.breakdown} />

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mt-6">
          <div className="md:col-span-2">
            <ExpenseForm onAdd={handleAdd} />
          </div>
          <div className="md:col-span-3">
            <ExpenseList expenses={expenses} onDelete={handleDelete} />
          </div>
        </div>
      </main>

      <footer className="text-center text-sm text-[#64748B] dark:text-[#94A3B8] py-6">
        © 2026 Expense Manager. All rights reserved.
      </footer>
    </div>
  );
}

export default App;
