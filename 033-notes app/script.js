const addButton = document.getElementById("add");
const searchInput = document.getElementById("search");
const notes = JSON.parse(localStorage.getItem("notes"));

const updateLocalStorage = () => {
  const notesText = document.querySelectorAll("textarea");
  // Add a "Last Edited" Timestamp
  const notesTimestamps = document.querySelectorAll(".timestamp");
  const notes = [];
  notesText.forEach((note) => {
    notes.push({
      text: note.value,
      timestamp: +notesTimestamps[notes.length].getAttribute("data-timestamp"),
    });
  });
  localStorage.setItem("notes", JSON.stringify(notes));
};

const addNewNote = (noteObj = {}) => {
  const { text = "", timestamp = Date.now() } = noteObj;
  const note = document.createElement("div");
  note.classList.add("note");
  note.innerHTML = `
  <div class="tools">
        <span class="timestamp" data-timestamp="${timestamp}">
          ${new Date(timestamp).toLocaleString("en-US")}
        </span>
        <button class="edit"><i class="fas fa-edit"></i></button>
        <button class="delete"><i class="fas fa-trash-alt"></i></button>
  </div>
  <div class="main ${text ? "" : "hidden"}"></div>
  <textarea class="${text ? "hidden" : ""}"></textarea>`;

  const editButton = note.querySelector(".edit");
  const deleteButton = note.querySelector(".delete");
  const main = note.querySelector(".main");
  const textArea = note.querySelector("textarea");
  textArea.value = text;
  main.innerHTML = marked(text);

  deleteButton.addEventListener("click", () => {
    // Confirm Before Deleting a Note
    if (confirm("Are you sure?")) {
      note.remove();
      updateLocalStorage();
    }
  });
  editButton.addEventListener("click", () => {
    main.classList.toggle("hidden");
    textArea.classList.toggle("hidden");
    // Auto-focus on Edit
    if (!textArea.classList.contains("hidden")) {
      textArea.focus();
    } else {
      main.innerHTML = marked(textArea.value);
      const newTimestamp = Date.now();
      const timestampSpan = note.querySelector(".timestamp");
      timestampSpan.setAttribute("data-timestamp", newTimestamp);
      timestampSpan.textContent = new Date(newTimestamp).toLocaleString(
        "en-US"
      );
      updateLocalStorage();
    }
  });
  textArea.addEventListener("input", (e) => {
    const { value } = e.target;
    main.innerHTML = marked(value);
    updateLocalStorage();
  });
  document.body.appendChild(note);
};

addButton.addEventListener("click", () => addNewNote());

if (notes) {
  notes.forEach((note) => addNewNote(note));
}

// Implement Search Functionality
searchInput.addEventListener("input", (e) => {
  const searchTerm = e.target.value.toLowerCase();
  const noteElements = document.querySelectorAll(".note");
  noteElements.forEach((note) => {
    const main = note.querySelector(".main");
    if (main.innerText.toLowerCase().includes(searchTerm)) {
      note.style.display = "block";
    } else {
      note.style.display = "none";
    }
  });
});
