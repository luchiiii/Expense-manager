# Expense Manager

A full-stack expense tracking application with an AI-powered chat feature for asking natural-language questions about your spending.

**Live app:** https://expense-manager-three-tau.vercel.app
**Backend API:** https://expense-manager-n4t2.onrender.com

## Features

- Add, edit, and delete expenses with amount, category, date, and optional description
- View all expenses, newest first
- View total amount spent and spending breakdown by category
- Ask questions about your spending in plain English, e.g. "how much did I spend on food this month?", answered by an AI assistant grounded in your real expense data, with streamed responses
- Form validation on both frontend and backend
- Data persists via PostgreSQL (Supabase)
- Nigerian Naira (₦) currency formatting
- Responsive, ledger-inspired UI

## Project Structure

```
Expense-manager
├── client
│   ├── public
│   ├── src
│   │   ├── api/            # Axios calls to the backend
│   │   ├── components/     # ExpenseForm, ExpenseList, ExpenseItem, Summary, ExpenseChat
│   │   └── App.jsx
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── server
│   ├── routes/
│   │   ├── expenses.js     # CRUD + summary endpoints
│   │   └── chat.js         # AI chat endpoint
│   ├── database.js         # Postgres connection pool (Supabase)
│   ├── index.js
│   └── package.json
│
└── README.md
```

## Tech Stack

**Backend**
- Node.js, Express
- PostgreSQL via [Supabase](https://supabase.com), accessed with `pg`
- Google Gemini via the [Vercel AI SDK](https://ai-sdk.dev) (`ai`, `@ai-sdk/google`)
- dotenv, cors

**Frontend**
- React (via Vite)
- Tailwind CSS
- Axios
- `@ai-sdk/react` (`useChat`) for the AI chat interface

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm
- A free [Supabase](https://supabase.com) project (for the database)
- A free [Google AI Studio](https://aistudio.google.com/app/apikey) API key (for the chat feature)

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd expense-manager
```

### 2. Set Up the Backend

```bash
cd server
npm install
```

Create a `.env` file inside the `server` folder:

```
PORT=5000
DATABASE_URL=your_supabase_pooler_connection_string
GOOGLE_GENERATIVE_AI_API_KEY=your_gemini_api_key
```

Start the server:

```bash
node index.js
```

The server runs on `http://localhost:5000` and creates the `expenses` table automatically on first run if it doesn't already exist.

### 3. Set Up the Frontend

Open a new terminal:

```bash
cd client
npm install
npm run dev
```

The frontend runs on `http://localhost:5173`.

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/expenses | Create a new expense |
| GET | /api/expenses | Get all expenses (newest first) |
| GET | /api/expenses/:id | Get a single expense by ID |
| PUT | /api/expenses/:id | Update an existing expense |
| DELETE | /api/expenses/:id | Delete an expense |
| GET | /api/expenses/summary/total | Get total and category breakdown |
| POST | /api/chat | Ask a natural-language question about your expenses (streamed response) |