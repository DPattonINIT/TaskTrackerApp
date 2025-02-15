export function createTask(name, description, priority, dueDate) {
    return {
        name: name,
        description: description,
        priority: priority,
        dueDate: dueDate,
        status: "ToDo"  
    };
}
export function saveTasks(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
export function loadTasks() {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
        return JSON.parse(savedTasks);
    }
    return [];
}
export function moveTask(task) {
    if (task.status === "ToDo") {
        task.status = "In Progress";
    } else if (task.status === "In Progress") {
        task.status = "Complete";
    } else {
        task.status = "ToDo";
    }
}
