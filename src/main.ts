import "./style.css";
import { v4 } from "uuid";

type Task = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
};

const addTaskForm = document.getElementById("add-task-form") as HTMLFormElement;
const taskInput = document.getElementById("task-input") as HTMLInputElement;
const taskList = document.getElementById("task-list") as HTMLUListElement;
const tasks: Array<Task> = getTasks();
tasks.forEach(addTaskItem);

addTaskForm?.addEventListener("submit", (event): void => {
  event.preventDefault();

  if (taskInput.value == "" || taskInput.value == null) return;

  const newTask: Task = {
    id: v4(),
    title: taskInput.value,
    completed: true,
    createdAt: new Date(),
  };

  tasks.push(newTask);
  storeTasks();
  addTaskItem(newTask);
  taskInput.value = "";
});

function addTaskItem(task: Task): void {
  const taskItem = document.createElement("li");
  const label = document.createElement("label");
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = task.completed;
  checkbox.addEventListener("change", () => {
    task.completed = checkbox.checked;
    storeTasks();
  });
  label.append(checkbox, task.title);
  taskItem.append(label);
  taskList?.appendChild(taskItem);
}

function storeTasks(): void {
  localStorage.setItem("TASKS", JSON.stringify(tasks));
}

function getTasks(): Array<Task> {
  let tasksJSON = localStorage.getItem("TASKS");
  if (tasksJSON == null) return [];
  return JSON.parse(tasksJSON);
}
