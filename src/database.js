const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(":memory:");

db.serialize(() => {
    db.run(`CREATE TABLE recipes (
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
