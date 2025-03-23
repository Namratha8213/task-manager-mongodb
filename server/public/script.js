const taskForm = document.getElementById("taskForm");
const taskTitle = document.getElementById("taskTitle");
const taskList = document.getElementById("taskList");

// Fetch tasks from API
async function fetchTasks() {
    const response = await fetch("/api/tasks");
    const tasks = await response.json();
    taskList.innerHTML = "";
    tasks.forEach(task => {
        const li = document.createElement("li");
        li.innerHTML = `
            ${task.title} - ${task.status}
            <button onclick="deleteTask('${task._id}')">Delete</button>
        `;
        taskList.appendChild(li);
    });
}

// Add a new task
taskForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: taskTitle.value, status: "Pending" })
    });
    taskTitle.value = "";
    fetchTasks();
});

// Delete a task
async function deleteTask(id) {
    await fetch(`/api/tasks/${id}`, { method: "DELETE" });
    fetchTasks();
}

// Load tasks on page load
fetchTasks();
