import "./style.css";
import { v4 } from "uuid";

type Task = {
  id: string,
  title: string,
  completed: boolean,
  createdAt: Date
}

const addButton = document.getElementById("add-button") as HTMLButtonElement;
const addTaskForm = document.getElementById("add-task-form") as HTMLFormElement;
const taskInput = document.getElementById("task-input") as HTMLInputElement;
const taskList = document.getElementById("task-list") as HTMLUListElement;

addTaskForm?.addEventListener("submit", (event): void => {
  event.preventDefault();

  if (taskInput.value == "" || taskInput.value == null) return;

  const newTask: Task = {
    id: v4(),
    title: taskInput.value,
    completed: false,
    createdAt: new Date(),
  };

  addTaskItem(newTask);
});

function addTaskItem(task: Task): void {
  const taskItem = document.createElement("li");
  const title = document.createTextNode(task.title);
  taskItem.appendChild(title);
  taskList.appendChild(taskItem);
}
