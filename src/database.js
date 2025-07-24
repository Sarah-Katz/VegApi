const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// Define the path to the database file
const dbPath = path.resolve(__dirname, "vegapi.db");

// Create a new database file or open an existing one
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS recipes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        description TEXT,
        authors TEXT,
        tags TEXT,
        ingredients TEXT,
        image TEXT,
        cookingTime TEXT,
        instructions TEXT
    )`);
});

module.exports = db;
