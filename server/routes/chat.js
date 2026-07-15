const express = require("express");
const router = express.Router();
const {
  streamText,
  convertToModelMessages,
  toUIMessageStream,
  pipeUIMessageStreamToResponse,
} = require("ai");
const { google } = require("@ai-sdk/google");
const db = require("../database");

// Builds a compact snapshot of the user's expense data to ground the
// model's answers. Keeps it to recent rows + the same totals your
// summary endpoint already returns, rather than sending the whole table.
function buildExpenseContext() {
  const expenses = db
    .prepare(
      "SELECT amount, category, date, description FROM expenses ORDER BY date DESC LIMIT 200",
    )
    .all();

  const total = db.prepare("SELECT SUM(amount) as total FROM expenses").get();
  const breakdown = db
    .prepare(
      "SELECT category, SUM(amount) as total FROM expenses GROUP BY category",
    )
    .all();

  const expenseLines = expenses
    .map(
      (e) =>
        `${e.date} | ${e.category} | ₦${e.amount} | ${e.description || "no description"}`,
    )
    .join("\n");

  const categoryLines = breakdown
    .map((c) => `${c.category}: ₦${c.total}`)
    .join("\n");

  return `TOTAL SPENT: ₦${total.total || 0}

SPENDING BY CATEGORY:
${categoryLines || "No data yet"}

RECENT EXPENSES (most recent first, max 200 rows):
${expenseLines || "No expenses recorded yet"}`;
}

// POST /api/chat — ask a question about your expenses
router.post("/", async (req, res) => {
  const { messages } = req.body;

  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: "No message provided" });
  }

  try {
    const context = buildExpenseContext();

    const result = streamText({
      model: google("gemini-flash-latest"),
      instructions: `You are a helpful assistant inside a personal expense tracking app.
Answer questions ONLY using the expense data below — do not invent numbers.
All amounts are in Nigerian Naira (NGN). If the data doesn't answer the
question, say so plainly instead of guessing. Keep answers short.

EXPENSE DATA:
${context}`,
      messages: await convertToModelMessages(messages),
    });

    pipeUIMessageStreamToResponse({
      stream: toUIMessageStream({ stream: result.stream }),
      response: res,
    });
  } catch (err) {
    console.error("Chat route error:", err);
    if (!res.headersSent) {
      res.status(500).json({
        error: "Failed to get a response from the AI. Please try again.",
      });
    } else {
      res.end();
    }
  }
});

module.exports = router;
