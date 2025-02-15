import { createTask, saveTasks, loadTasks, moveTask } from './duty.js';

let tasks = loadTasks(); 

function addTask() {
    console.log("Add Task Button Clicked!");
    const taskName = document.getElementById("name").value;
    const taskDescription = document.getElementById("description").value;
    const taskPriority = document.getElementById("priority").value;
    const taskDueDate = document.getElementById("due").value;

    const task = createTask(taskName, taskDescription, taskPriority, taskDueDate);
    
    tasks.push(task);
    saveTasks(tasks);
    displayTasks();
}

function displayTasks() {
    document.getElementById("todoist").innerHTML = '';
    document.getElementById("workingList").innerHTML = '';
    document.getElementById("finsihedList").innerHTML = '';

    for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];
        const li = document.createElement("li");
        li.textContent = `${task.name} - ${task.description} - ${task.priority} - ${task.dueDate}`;

        const moveButton = document.createElement("button");
        moveButton.textContent = "Move";
        moveButton.classList.add("move-btn");
        moveButton.onclick = function() {
            moveTask(task);
            saveTasks(tasks);
            displayTasks();
        };

        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.classList.add("edit-btn");
        editButton.onclick = function() {
            editTask(task);
        };

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("delete-btn");
        deleteButton.onclick = function() {
            deleteTask(task);
        };

        li.appendChild(editButton);
        li.appendChild(moveButton);
        li.appendChild(deleteButton);

        if (task.status === "ToDo") {
            document.getElementById("todoist").appendChild(li);
        } else if (task.status === "In Progress") {
            document.getElementById("workingList").appendChild(li);
        } else if (task.status === "Complete") {
            document.getElementById("finsihedList").appendChild(li);
        }
    }
}
function editTask(task) {
    const newDescription = prompt("Edit task description:", task.description);
    if (newDescription !== null) {
        task.description = newDescription;
    }
    saveTasks(tasks);
    displayTasks();
}
function deleteTask(task) {
    const index = tasks.indexOf(task);
    if (index !== -1) {
        tasks.splice(index, 1);
        saveTasks(tasks);
        displayTasks();
    }
}
document.getElementById("addTaskButton").addEventListener("click", addTask);
displayTasks();

