import { useState, useEffect } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import Summary from "./components/Summary";
import ExpenseChat from "./components/ExpenseChat";
import {
  getExpenses,
  createExpense,
  updateExpense,
  deleteExpense,
  getSummary,
} from "./api/expenses";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [summary, setSummary] = useState({ total: 0, breakdown: [] });
  const [error, setError] = useState("");
  const [editingExpense, setEditingExpense] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [expensesData, summaryData] = await Promise.all([
          getExpenses(),
          getSummary(),
        ]);
        setExpenses(expensesData);
        setSummary(summaryData);
      } catch (err) {
         console.error("Failed to load expenses/summary:", err);
        setError("Failed to load expenses. Make sure the server is running.");
      }
    };

    fetchData();
  }, []);

  const refetch = async () => {
    const [expensesData, summaryData] = await Promise.all([
      getExpenses(),
      getSummary(),
    ]);
    setExpenses(expensesData);
    setSummary(summaryData);
  };

  const handleAdd = async (form) => {
    try {
      await createExpense({ ...form, amount: Number(form.amount) });
      await refetch();
    } catch {
      setError("Failed to add expense. Please try again.");
    }
  };

  const handleUpdate = async (id, form) => {
    try {
      await updateExpense(id, { ...form, amount: Number(form.amount) });
      setEditingExpense(null);
      await refetch();
    } catch {
      setError("Failed to update expense. Please try again.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteExpense(id);
      await refetch();
    } catch {
      setError("Failed to delete expense. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-paper">
      {/* Header */}
      <header className="px-6 pt-10 pb-6 max-w-5xl mx-auto">
        <h1 className="font-display text-3xl font-semibold text-ink">
          Expense Manager
        </h1>
        <div className="mt-3 border-t-2 border-ink" />
        <div className="mt-0.5 border-t border-line" />
      </header>

      <main className="max-w-5xl mx-auto px-6 pb-8">
        {error && (
          <div className="bg-surface border-2 border-stamp-red text-stamp-red text-sm rounded-sm px-4 py-3 mb-6">
            {error}
          </div>
        )}

        <Summary total={summary.total} breakdown={summary.breakdown} />

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mt-6">
          <div className="md:col-span-2">
            <ExpenseForm
              key={editingExpense ? editingExpense.id : "new"}
              onAdd={handleAdd}
              onUpdate={handleUpdate}
              editingExpense={editingExpense}
              onCancelEdit={() => setEditingExpense(null)}
            />
          </div>
          <div className="md:col-span-3">
            <ExpenseList
              expenses={expenses}
              onDelete={handleDelete}
              onEdit={setEditingExpense}
            />
          </div>
        </div>

        <div className="mt-6">
          <ExpenseChat />
        </div>
      </main>

      <footer className="text-center text-xs text-ink-soft py-8">
        © 2026 Expense Manager. All rights reserved.
      </footer>
    </div>
  );
}

export default App;
