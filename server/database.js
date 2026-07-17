const { Pool } = require("pg");

const pool = new Pool({
     connectionString: process.env.DATABASE_URL,
     ssl: {
         rejectUnauthorized: false,
     },
})

pool.query(`
    CREATE TABLE IF NOT EXISTS expenses (
         id SERIAL PRIMARY KEY,
         amount REAL NOT NULL,
         category TEXT NOT NULL,
         date TEXT NOT NULL,
         description TEXT
         )
    `)
     .then(() => console.log("Expenses table ready"))
     .catch((err) => console.error("Error creating expenses table:", err));

    module.exports = pool;