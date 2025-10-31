const API_URL = "http://localhost:3000/tasks";

const taskInput = document.getElementById("new-task");
const addButton = document.getElementById("add-task");
const taskList = document.getElementById("task-list");

// 🧾 Cargar tareas del servidor
async function loadTasks() {
  const response = await fetch(API_URL);
  const tasks = await response.json();
  renderTasks(tasks);
}

// 🎨 Renderizar tareas en la lista
function renderTasks(tasks) {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.textContent = task.text;
    if (task.done) li.classList.add("done");

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "❌";
    deleteBtn.onclick = () => deleteTask(index);
    li.appendChild(deleteBtn);

    taskList.appendChild(li);
  });
}

// ➕ Agregar nueva tarea
async function addTask() {
  const text = taskInput.value.trim();
  if (!text) return;

  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text, done: false }),
  });

  taskInput.value = "";
  loadTasks();
}

// ❌ Eliminar tarea
async function deleteTask(index) {
  await fetch(`${API_URL}/${index}`, { method: "DELETE" });
  loadTasks();
}

addButton.addEventListener("click", addTask);
loadTasks();
