# Expense Manager

A simple full-stack expense tracking application built with Node.js, Express, SQLite, React, and Tailwind CSS.

## Project Structure
Expense-manager
├── client
│   ├── public
│   ├── src
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── server
│   ├── routes
│   ├── database.js
│   ├── index.js
│   ├── expenses.db
│   └── package.json
│
└── README.md


## Tech Stack

**Backend**
- Node.js
- Express
- SQLite (via better-sqlite3)
- dotenv
- cors

**Frontend**
- React (via Vite)
- Tailwind CSS
- Axios

## Getting Started

### Prerequisites
Make sure you have the following installed:
- Node.js (v18 or higher)
- npm

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

Create a `.env` file inside the server folder:
PORT=5000

Start the server:

```bash
node index.js
```

The server will run on `http://localhost:5000`

### 3. Set Up the Frontend

Open a new terminal:

```bash
cd client
npm install
npm run dev
```

The frontend will run on `http://localhost:5173`

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/expenses | Create a new expense |
| GET | /api/expenses | Get all expenses (newest first) |
| GET | /api/expenses/:id | Get a single expense by ID |
| PUT | /api/expenses/:id | Update an existing expense |
| DELETE | /api/expenses/:id | Delete an expense |
| GET | /api/expenses/summary/total | Get total and category breakdown |

## Features

- Add expenses with amount, category, date and optional description
- View all expenses listed newest first
- Delete expenses
- View total amount spent
- View spending breakdown by category
- Form validation on both frontend and backend
- Error handling for invalid requests and missing fields
- Data persists after server restarts using SQLite
- Responsive layout — stacks vertically on mobile
- Nigerian Naira (₦) currency formatting

## What I Skipped and Why

- Edit expense from the UI — I focused on getting the core features clean and working rather than adding extras
- Filtering by category or date range — not required for core functionality
- Charts — not required and would have added unnecessary complexity

## AI Usage

I used Claude (Anthropic) as an AI assistant during this project. Specifically:
- To help structure the Express route handlers and SQLite query syntax for the endpoints
- To help set up the initial database schema and table creation
- To help with Tailwind CSS class combinations when i was unsure

All code was reviewed and understood before submission. I am able to explain any part of this codebase.

## Time Spent

Approximately 20 hours total across backend setup, frontend development, styling and documentation.