const express = require("express");
const path = require("path");
const fs = require("fs");
const initSqlJs = require("sql.js");
const { exec } = require("child_process");

const app = express();
app.use(express.json());

//Adatbázis útvonal
const DB_PATH = process.env.DB_PATH || path.join(
  process.pkg ? path.dirname(process.execPath) : __dirname,
  "app.db"
);

const wasmPath = path.join(__dirname, "node_modules/sql.js/dist/sql-wasm.wasm");

let db;

async function initDB() {
  const SQL = await initSqlJs({
    locateFile: () => wasmPath
  });

  if (fs.existsSync(DB_PATH)) {
    const fileBuffer = fs.readFileSync(DB_PATH);
    db = new SQL.Database(fileBuffer);
  } else {
    db = new SQL.Database();
  }

  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      name TEXT PRIMARY KEY
    );
    CREATE TABLE IF NOT EXISTS progress (
      user_name TEXT NOT NULL,
      lesson_id TEXT NOT NULL,
      completed INTEGER NOT NULL DEFAULT 0,
      PRIMARY KEY (user_name, lesson_id),
      FOREIGN KEY (user_name) REFERENCES users(name) ON DELETE CASCADE
    );
  `);

  saveDB();
}

function saveDB() {
  const data = db.export();
  fs.writeFileSync(DB_PATH, Buffer.from(data));
}

//Frontend
app.use(express.static(path.join(__dirname, "public")));

app.get("/api/health", (req, res) => res.json({ ok: true }));

app.get("/api/users", (req, res) => {
  try {
    const result = db.exec("SELECT name FROM users ORDER BY name ASC");
    const rows = result[0] ? result[0].values.map(r => r[0]) : [];
    res.json(rows);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.post("/api/users", (req, res) => {
  try {
    const name = String(req.body?.name || "").trim();
    if (!name) return res.status(400).json({ error: "Hiányzó név" });
    db.run("INSERT OR IGNORE INTO users(name) VALUES (?)", [name]);
    saveDB();
    res.json({ ok: true });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.delete("/api/users/:name", (req, res) => {
  try {
    db.run("DELETE FROM users WHERE name = ?", [req.params.name]);
    saveDB();
    res.json({ ok: true });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.get("/api/progress/:user", (req, res) => {
  try {
    const user = req.params.user;
    const uRes = db.exec("SELECT name FROM users WHERE name=?", [user]);
    if (!uRes[0]) return res.json({});
    const rows = db.exec("SELECT lesson_id, completed FROM progress WHERE user_name=?", [user]);
    const result = {};
    if (rows[0]) rows[0].values.forEach(r => { result[String(r[0])] = r[1] === 1; });
    res.json(result);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.post("/api/progress/:user", (req, res) => {
  try {
    const user = req.params.user;
    const progress = req.body || {};
    db.run("INSERT OR IGNORE INTO users(name) VALUES (?)", [user]);
    db.run("DELETE FROM progress WHERE user_name=?", [user]);
    for (const [lessonId, done] of Object.entries(progress)) {
      if (done === true) db.run(
        "INSERT INTO progress(user_name, lesson_id, completed) VALUES (?, ?, 1)",
        [user, String(lessonId)]
      );
    }
    saveDB();
    res.json({ ok: true });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.post("/api/progress/:user/reset", (req, res) => {
  try {
    db.run("DELETE FROM progress WHERE user_name=?", [req.params.user]);
    saveDB();
    res.json({ ok: true });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

const PORT = process.env.PORT || 3000;

initDB().then(() => {
  app.listen(PORT, () => {
    console.log("Fut: http://localhost:" + PORT);
    exec("start http://localhost:" + PORT);
  });
});
