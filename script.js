const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === "") return;

    createTask(taskText, false);
    saveTask(taskText, false);

    taskInput.value = "";
}

function createTask(text, completed) {
    const li = document.createElement("li");
    li.textContent = text;

    if (completed) {
        li.classList.add("completed");
    }

    li.addEventListener("click", () => {
        li.classList.toggle("completed");
        updateStorage();
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "X";
    deleteBtn.className = "delete-btn";

    deleteBtn.onclick = () => {
        li.remove();
        updateStorage();
    };

    li.appendChild(deleteBtn);
    taskList.appendChild(li);
}

function saveTask(text, completed) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push({ text, completed });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => createTask(task.text, task.completed));
}

function updateStorage() {
    let tasks = [];
    document.querySelectorAll("li").forEach(li => {
        tasks.push({
            text: li.firstChild.textContent,
            completed: li.classList.contains("completed")
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
