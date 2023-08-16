const addButton = document.getElementById("add");
const toggleDarkModeButton = document.getElementById("toggleDarkMode");
const notes = JSON.parse(localStorage.getItem("notes")) || [];

const updateLocalStorage = () => {
  const noteElements = document.querySelectorAll(".note");
  const updatedNotes = [];

  noteElements.forEach((noteElement) => {
    const textArea = noteElement.querySelector("textarea");
    const categoryDropdown = noteElement.querySelector(".category");
    const reminderInput = noteElement.querySelector(".reminder-input");

    updatedNotes.push({
      text: textArea.value,
      category: categoryDropdown.value,
      reminder: reminderInput.value
    });
  });

  localStorage.setItem("notes", JSON.stringify(updatedNotes));
};

const addNewNote = (text = "", category = "Personal", reminder = "") => {
  const note = document.createElement("div");
  note.classList.add("note");
  note.innerHTML = `
    <div class="tools">
      <button class="edit"><i class="fas fa-edit"></i></button>
      <button class="delete"><i class="fas fa-trash-alt"></i></button>
    </div>
    <div class="main ${text ? "" : "hidden"}"></div>
    <div class="markdown-editor">
      <textarea class="${text ? "hidden" : ""}">${text}</textarea>
      <div class="toolbar">
        <button class="format" data-format="#">Heading</button>
        <button class="format" data-format="*">List</button>
        <button class="format" data-format="[Link Text](URL)">Link</button>
      </div>
    </div>
    <input type="datetime-local" class="reminder-input" value="${reminder}">
    <select class="category">
      <option value="Personal">Personal</option>
      <option value="Work">Work</option>
      <option value="Ideas">Ideas</option>
    </select>`;

  const editButton = note.querySelector(".edit");
  const deleteButton = note.querySelector(".delete");
  const main = note.querySelector(".main");
  const markdownEditor = note.querySelector(".markdown-editor");
  const textArea = note.querySelector("textarea");
  const categoryDropdown = note.querySelector(".category");
  const reminderInput = note.querySelector(".reminder-input");
  const formatButtons = note.querySelectorAll(".format");

  categoryDropdown.value = category;
  main.innerHTML = marked(text);

  formatButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const format = button.getAttribute("data-format");
      const selectionStart = textArea.selectionStart;
      const selectionEnd = textArea.selectionEnd;

      const newText = textArea.value.substring(0, selectionStart) +
        format + textArea.value.substring(selectionStart, selectionEnd) + format +
        textArea.value.substring(selectionEnd);

      textArea.value = newText;
      textArea.focus();
      textArea.setSelectionRange(selectionStart + format.length, selectionEnd + format.length);
    });
  });

  deleteButton.addEventListener("click", () => {
    note.remove();
    updateLocalStorage();
  });
  editButton.addEventListener("click", () => {
    main.classList.toggle("hidden");
    markdownEditor.classList.toggle("hidden");
  });
  textArea.addEventListener("input", (e) => {
    const { value } = e.target;
    main.innerHTML = marked(value);
    updateLocalStorage();
  });
  reminderInput.addEventListener("change", () => {
    updateLocalStorage();
    if (reminderInput.value) {
      scheduleReminder(reminderInput.value, text);
    }
  });

  document.body.appendChild(note);
};

addButton.addEventListener("click", () => addNewNote());

if (notes) {
  notes.forEach((note) => {
    const { text, category, reminder } = note;
    addNewNote(text, category, reminder);
  });
}

// Toggle Dark Mode
toggleDarkModeButton.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

// Helper function to schedule a reminder
const scheduleReminder = (dateTime, text) => {
  const now = new Date();
  const reminderTime = new Date(dateTime);

  if (reminderTime > now) {
    const timeUntilReminder = reminderTime - now;
    setTimeout(() => {
      showNotification(`Reminder: ${text}`);
    }, timeUntilReminder);
  }
};

// Helper function to show a notification
const showNotification = (message) => {
  // Implement your notification logic here
  alert(message);
};
