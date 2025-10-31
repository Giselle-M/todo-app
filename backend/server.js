const express = require("express");
const fs = require("fs");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 3000;
const DB_FILE = path.join(__dirname, "database.json");

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../frontend")));

// 📖 Leer tareas
app.get("/tasks", (req, res) => {
  const tasks = JSON.parse(fs.readFileSync(DB_FILE, "utf8"));
  res.json(tasks);
});

// ➕ Agregar tarea
app.post("/tasks", (req, res) => {
  const tasks = JSON.parse(fs.readFileSync(DB_FILE, "utf8"));
  tasks.push(req.body);
  fs.writeFileSync(DB_FILE, JSON.stringify(tasks, null, 2));
  res.status(201).json({ message: "Tarea agregada" });
});

// ❌ Eliminar tarea
app.delete("/tasks/:index", (req, res) => {
  const tasks = JSON.parse(fs.readFileSync(DB_FILE, "utf8"));
  const index = parseInt(req.params.index);
  if (index >= 0 && index < tasks.length) {
    tasks.splice(index, 1);
    fs.writeFileSync(DB_FILE, JSON.stringify(tasks, null, 2));
    res.json({ message: "Tarea eliminada" });
  } else {
    res.status(400).json({ error: "Índice inválido" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});
