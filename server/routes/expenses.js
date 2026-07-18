const express = require("express");
const router = express.Router();
const pool = require("../database");

// 1. Create an expense
router.post("/", async (req, res) => {
  const { amount, category, date, description } = req.body;

  if (!amount || amount <= 0) {
    return res.status(400).json({ error: "Amount must be greater than 0" });
  }
  if (!category) {
    return res.status(400).json({ error: "Category is required" });
  }

  const expenseDate = date || new Date().toISOString().split("T")[0];

  try {
    const result = await pool.query(
      "INSERT INTO expenses (amount, category, date, description) VALUES ($1, $2, $3, $4) RETURNING *",
      [amount, category, expenseDate, description || null],
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error creating expense:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 2. List all expenses, newest first
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM expenses ORDER BY date DESC",
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching expenses:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 3. Retrieve a single expense by ID
router.get("/:id", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM expenses WHERE id = $1", [
      req.params.id,
    ]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Expense not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Failed to fetch expense:", err);
    res.status(500).json({ error: "Failed to fetch expense" });
  }
});

// 4. Update an existing expense
router.put("/:id", async (req, res) => {
  try {
    const existing = await pool.query("SELECT * FROM expenses WHERE id = $1", [
      req.params.id,
    ]);
    if (existing.rows.length === 0) {
      return res.status(404).json({ error: "Expense not found" });
    }

    const expense = existing.rows[0];
    const { amount, category, date, description } = req.body;

    if (amount !== undefined && amount <= 0) {
      return res.status(400).json({ error: "Amount must be greater than 0" });
    }

    const updated = {
      amount: amount ?? expense.amount,
      category: category ?? expense.category,
      date: date ?? expense.date,
      description: description ?? expense.description,
    };

    const result = await pool.query(
      "UPDATE expenses SET amount = $1, category = $2, date = $3, description = $4 WHERE id = $5 RETURNING *",
      [
        updated.amount,
        updated.category,
        updated.date,
        updated.description,
        req.params.id,
      ],
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Failed to update expense");
    res.status(500).json({ error: "Failed to update expense" });
  }
});

// 5. Delete an expense
router.delete("/:id", async (req, res) => {
  try {
    const existing = await pool.query("SELECT * FROM expenses WHERE id = $1", [
      req.params.id,
    ]);
    if (existing.rows.length === 0) {
      return res.status(404).json({ error: "Expense not found" });
    }
    await pool.query("DELETE FROM expenses WHERE id = $1", [req.params.id]);
    res.json({ message: "Expense deleted successfully" });
  } catch (err) {
    console.error("Failed to delete expense:", err);
    res.status(500).json({ error: "Failed to delete expense" });
  }
});

// 6. Summary
router.get("/summary/total", async (req, res) => {
  try {
    const totalResult = await pool.query(
      "SELECT SUM(amount) as total FROM expenses",
    );
    const breakdownResult = await pool.query(
      "SELECT category, SUM(amount) as total FROM expenses GROUP BY category",
    );

    res.json({
      total: totalResult.rows[0].total || 0,
      breakdown: breakdownResult.rows,
    });
  } catch (err) {
    console.error("Failed to fetch summary:", err);
    res.status(500).json({ error: "Failed to fetch summary" });
  }
});

module.exports = router;
