const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const expenseRoutes = require("./routes/expenses");
const chatRoutes = require("./routes/chat");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://expense-manager-three-tau.vercel.app",
    ],
  }),
);
app.use(express.json());

app.use("/api/expenses", expenseRoutes);
app.use("/api/chat", chatRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
