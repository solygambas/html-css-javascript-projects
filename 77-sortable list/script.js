const draggableList = document.getElementById("draggable-list");
const check = document.getElementById("check");

const richestPeople = [
  "Jeff Bezos",
  "Bill Gates",
  "Bernard Arnault",
  "Warren Buffett",
  "Larry Ellison",
  "Amancio Ortega",
  "Mark Zuckerberg",
  "Jim Walton",
  "Alice Walton",
  "S. Robson Walton",
];

const listItems = [];

let dragStartIndex;

function createList() {
  const newList = [...richestPeople];
  newList
    .map((person) => ({ value: person, sort: Math.random() })) // randomize list
    .sort((a, b) => a.sort - b.sort) // generate new order
    .map((person) => person.value) // retrieve original strings
    .forEach((person, index) => {
      const listItem = document.createElement("li");
      listItem.setAttribute("data-index", index);
      listItem.innerHTML = `
        <span class="number">${index + 1}</span>
        <div class="draggable" draggable="true">
          <p class="person-name">${person}</p>
          <i class="fas fa-grip-lines"></i>
        </div>
      `;
      listItems.push(listItem);
      draggableList.appendChild(listItem);
    });
}

// Init
createList();
