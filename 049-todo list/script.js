const form = document.getElementById("form");
const input = document.getElementById("input");
const todosList = document.getElementById("todos");
const todos = JSON.parse(localStorage.getItem("todos"));

const updateLocalStorage = () => {
  const todosElements = document.querySelectorAll("li");
  const todos = [];
  todosElements.forEach((todoElement) => {
    todos.push({
      text: todoElement.innerText,
      completed: todoElement.classList.contains("completed"),
    });
  });
  localStorage.setItem("todos", JSON.stringify(todos));
};

const addTodo = (todo) => {
  let todoText = input.value;
  if (todo) todoText = todo.text;
  if (todoText) {
    const todoElement = document.createElement("li");
    if (todo && todo.completed) {
      todoElement.classList.add("completed");
    }
    todoElement.innerText = todoText;
    todosList.appendChild(todoElement);
    input.value = "";
    updateLocalStorage();
  }
};

if (todos) {
  todos.forEach((todo) => addTodo(todo));
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  addTodo();
});

todosList.addEventListener("click", (e) => {
  if (e.target.tagName === "LI") {
    e.target.classList.toggle("completed");
    updateLocalStorage();
  }
});

todosList.addEventListener("contextmenu", (e) => {
  if (e.target.tagName === "LI") {
    e.preventDefault();
    e.target.remove();
    updateLocalStorage();
  }
});
