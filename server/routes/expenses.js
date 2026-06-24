const express = require("express");
const router = express.Router();
const db = require("../database");

// 1. Create an expense
router.post("/", (req, res) => {
  const { amount, category, date, description } = req.body;

  if (!amount || amount <= 0) {
    return res.status(400).json({ error: "Amount must be greater than 0" });
  }
  if (!category) {
    return res.status(400).json({ error: "Category is required" });
  }

  const expenseDate = date || new Date().toISOString().split("T")[0];

  const stmt = db.prepare(
    "INSERT INTO expenses (amount, category, date, description) VALUES (?, ?, ?, ?)",
  );
  const result = stmt.run(amount, category, expenseDate, description || null);

  const newExpense = db
    .prepare("SELECT * FROM expenses WHERE id = ?")
    .get(result.lastInsertRowid);
  res.status(201).json(newExpense);
});

// 2. List all expenses, newest first
router.get("/", (req, res) => {
  const expenses = db
    .prepare("SELECT * FROM expenses ORDER BY date DESC")
    .all();
  res.json(expenses);
});

// 3. Retrieve a single expense by ID
router.get("/:id", (req, res) => {
  const expense = db
    .prepare("SELECT * FROM expenses WHERE id = ?")
    .get(req.params.id);
  if (!expense) {
    return res.status(404).json({ error: "Expense not found" });
  }
  res.json(expense);
});

// 4. Update an existing expense
router.put("/:id", (req, res) => {
  const expense = db
    .prepare("SELECT * FROM expenses WHERE id = ?")
    .get(req.params.id);
  if (!expense) {
    return res.status(404).json({ error: "Expense not found" });
  }

  const { amount, category, date, description } = req.body;

  if (amount !== undefined && amount <= 0) {
    return res.status(400).json({ error: "Amount must be greater than 0" });
  }

  const updatedExpense = {
    amount: amount ?? expense.amount,
    category: category ?? expense.category,
    date: date ?? expense.date,
    description: description ?? expense.description,
  };

  db.prepare(
    "UPDATE expenses SET amount = ?, category = ?, date = ?, description = ? WHERE id = ?",
  ).run(
    updatedExpense.amount,
    updatedExpense.category,
    updatedExpense.date,
    updatedExpense.description,
    req.params.id,
  );

  res.json(
    db.prepare("SELECT * FROM expenses WHERE id = ?").get(req.params.id),
  );
});

// 5. Delete an expense
router.delete("/:id", (req, res) => {
  const expense = db
    .prepare("SELECT * FROM expenses WHERE id = ?")
    .get(req.params.id);
  if (!expense) {
    return res.status(404).json({ error: "Expense not found" });
  }
  db.prepare("DELETE FROM expenses WHERE id = ?").run(req.params.id);
  res.json({ message: "Expense deleted successfully" });
});

// 6. Summary
router.get("/summary/total", (req, res) => {
  const total = db.prepare("SELECT SUM(amount) as total FROM expenses").get();
  const breakdown = db
    .prepare(
      "SELECT category, SUM(amount) as total FROM expenses GROUP BY category",
    )
    .all();
  res.json({ total: total.total || 0, breakdown });
});

module.exports = router;
