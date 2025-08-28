const form = document.getElementById("form");
const input = document.getElementById("input");
const todosList = document.getElementById("todos");
const clearCompleted = document.getElementById("clear-completed");
let todos = JSON.parse(localStorage.getItem("todos")) || [];
let draggedIndex = null;

// Refactor with a "Source of Truth"
const updateLocalStorage = () => {
  // const todosElements = document.querySelectorAll("li");
  // const todos = [];
  // todosElements.forEach((todoElement) => {
  //   todos.push({
  //     text: todoElement.innerText,
  //     completed: todoElement.classList.contains("completed"),
  //   });
  // });
  localStorage.setItem("todos", JSON.stringify(todos));
};

const renderTodos = () => {
  todosList.innerHTML = "";
  // Conditionally Show "Clear" Button (Boolean Flag)
  // let hasCompleted = false;
  todos.forEach((todo, index) => {
    const todoElement = document.createElement("li");
    // Add Drag-and-Drop Reordering
    todoElement.setAttribute("draggable", "true");
    if (todo.completed) {
      todoElement.classList.add("completed");
      // hasCompleted = true;
    }
    todoElement.innerText = todo.text;
    todoElement.addEventListener("click", () => {
      todos[index].completed = !todos[index].completed;
      updateLocalStorage();
      renderTodos();
    });
    todoElement.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      todos.splice(index, 1);
      updateLocalStorage();
      renderTodos();
    });
    todoElement.addEventListener("dragstart", () => {
      draggedIndex = index;
    });
    todoElement.addEventListener("dragover", (e) => {
      e.preventDefault();
    });
    todoElement.addEventListener("drop", (e) => {
      e.preventDefault();
      if (draggedIndex === null || draggedIndex === index) return;
      const draggedTodo = todos[draggedIndex];
      todos.splice(draggedIndex, 1);
      todos.splice(index, 0, draggedTodo);
      updateLocalStorage();
      renderTodos();
    });

    todosList.appendChild(todoElement);
  });
  // clearCompleted.style.display = hasCompleted ? "block" : "none";
  // Conditionally Show "Clear" Button (Some Completed)
  clearCompleted.style.display = todos.some((todo) => todo.completed)
    ? "block"
    : "none";
};

const addTodo = (todo) => {
  let todoText = input.value;
  if (todo) todoText = todo.text;
  // Prevent Empty Todos
  if (todoText.trim() !== "") {
    const newTodo = {
      text: todoText,
      completed: todo && todo.completed ? true : false,
    };
    todos.push(newTodo);
    updateLocalStorage();
    renderTodos();
    input.value = "";
  }
};

// if (todos) {
//   todos.forEach((todo) => addTodo(todo));
// }

form.addEventListener("submit", (e) => {
  e.preventDefault();
  addTodo();
});

// Add a "Clear Completed" Button
clearCompleted.addEventListener("click", () => {
  todos = todos.filter((todo) => !todo.completed);
  updateLocalStorage();
  renderTodos();
});

renderTodos();
