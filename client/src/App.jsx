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

  const fetchData = async () => {
    try {
      const [expensesData, summaryData] = await Promise.all([
        getExpenses(),
        getSummary(),
      ]);
      setExpenses(expensesData);
      setSummary(summaryData);
    } catch (err) {
      setError("Failed to load expenses. Make sure the server is running.");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAdd = async (form) => {
    try {
      await createExpense({
        ...form,
        amount: Number(form.amount),
      });
      fetchData();
    } catch (err) {
      setError("Failed to add expense. Please try again.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteExpense(id);
      fetchData();
    } catch (err) {
      setError("Failed to delete expense. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-2xl mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Expense Manager
        </h1>
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-4 py-3 mb-6">
            {error}
          </div>
        )}
        <Summary total={summary.total} breakdown={summary.breakdown} />
        <ExpenseForm onAdd={handleAdd} />
        <ExpenseList expenses={expenses} onDelete={handleDelete} />
      </div>
    </div>
  );
}

export default App;
