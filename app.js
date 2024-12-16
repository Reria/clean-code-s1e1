document.addEventListener("DOMContentLoaded", () => {
  const taskInput = document.querySelector(".add-task__input");
  const addButton = document.querySelector(".add-task__add-button");
  const incompleteTaskHolder = document.querySelector(".tasks__list");
  const completedTasksHolder = document.querySelector(".completed__list");

  // Mark task completed
  const taskCompleted = function () {
    const listItem = this.parentNode;
    const label = listItem.querySelector(".task__label");
    if (label) label.classList.add("task__label_completed");
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);
  };

  // Mark task as incomplete
  const taskIncomplete = function () {
    const listItem = this.parentNode;
    const label = listItem.querySelector(".task__label");
    if (label) label.classList.remove("task__label_completed");
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
  };

  // Edit an existing task
  const editTask = function () {
    const listItem = this.parentNode; 
    const editInput = listItem.querySelector(".task__input"); 
    const label = listItem.querySelector(".task__label"); 
    const editButton = this; 
    const isEditMode = listItem.classList.contains("task--edit-mode");
  
    if (isEditMode) {
      label.innerText = editInput.value;
      editButton.innerText = "Edit";
    } else {
      editInput.value = label.innerText; 
      editButton.innerText = "Save"; 
    }
  
    listItem.classList.toggle("task--edit-mode");
  };

  // Delete task
  const deleteTask = function () {
    const listItem = this.parentNode;
    const ul = listItem.parentNode;
    ul.removeChild(listItem);
  };

  // Create a new task element
  const createNewTaskElement = (taskString) => {
    const listItem = document.createElement("li");
    listItem.className = "task";

    const checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.className = "task__checkbox";

    const label = document.createElement("label");
    label.className = "task__label";
    label.innerText = taskString;

    const editInput = document.createElement("input");
    editInput.type = "text";
    editInput.className = "task__input";

    const editButton = document.createElement("button");
    editButton.className = "task__edit-button";
    editButton.innerText = "Edit";

    const deleteButton = document.createElement("button");
    deleteButton.className = "task__delete-button";

    const deleteButtonImg = document.createElement("img");
    deleteButtonImg.className = "task__delete-icon";
    deleteButtonImg.src = "./remove.svg";
    deleteButtonImg.alt = "remove icon for task";
    deleteButton.appendChild(deleteButtonImg);

    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);

    return listItem;
  };

  // Add a new task
  const addTask = () => {
    if (!taskInput.value) return;
    const listItem = createNewTaskElement(taskInput.value);
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
    taskInput.value = "";
  };

  // Bind task events to list items
  const bindTaskEvents = (taskListItem, checkBoxEventHandler) => {
    const checkBox = taskListItem.querySelector(".task__checkbox");
    const editButton = taskListItem.querySelector(".task__edit-button");
    const saveButton = taskListItem.querySelector(".task__save-button");
    const deleteButton = taskListItem.querySelector(".task__delete-button");
  
    if (checkBox) checkBox.onchange = checkBoxEventHandler;
    if (editButton) editButton.onclick = editTask; 
    if (saveButton) saveButton.onclick = editTask; 
    if (deleteButton) deleteButton.onclick = deleteTask;
  };

  // Initialize tasks
  for (let i = 0; i < incompleteTaskHolder.children.length; i++) {
    bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
  }

  for (let i = 0; i < completedTasksHolder.children.length; i++) {
    bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
  }

  // Add task event
  addButton.addEventListener("click", addTask);
});