const draggableList = document.getElementById("draggable-list");
const check = document.getElementById("check");
const reset = document.getElementById("reset");

const richestPeople = [
  "Elon Musk",
  "Larry Ellison",
  "Mark Zuckerberg",
  "Jeff Bezos",
  "Larry Page",
  "Sergey Brin",
  "Bernard Arnault",
  "Jensen Huang",
  "Warren Buffett",
  "Steve Ballmer",
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
      listItem.setAttribute("tabindex", "0");
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
  addListeners();
}

// Add a Reset Button
function resetList() {
  draggableList.innerHTML = "";
  listItems.length = 0;
  createList();
}

function dragStart() {
  dragStartIndex = +this.closest("li").getAttribute("data-index");
}

function dragEnter() {
  this.classList.add("over");
}

function dragLeave() {
  this.classList.remove("over");
}

function dragOver(e) {
  e.preventDefault(); // dragDrop is not executed otherwise
}

function dragDrop() {
  const dragEndIndex = +this.getAttribute("data-index");
  swapItems(dragStartIndex, dragEndIndex);
  this.classList.remove("over");
}

// Animate Item Swaps
function animateSwap(element, deltaY) {
  element.animate(
    [{ transform: `translateY(${deltaY}px)` }, { transform: "translateY(0)" }],
    {
      duration: 300,
      easing: "cubic-bezier(0,0,0.32,1)",
    }
  );
}

function swapItems(fromIndex, toIndex) {
  // Get Items
  const itemOne = listItems[fromIndex].querySelector(".draggable");
  const itemTwo = listItems[toIndex].querySelector(".draggable");
  // FLIP: First
  const rectOne = itemOne.getBoundingClientRect();
  const rectTwo = itemTwo.getBoundingClientRect();
  // Swap Items
  listItems[fromIndex].appendChild(itemTwo);
  listItems[toIndex].appendChild(itemOne);
  // FLIP: Last
  const newRectOne = itemOne.getBoundingClientRect();
  const newRectTwo = itemTwo.getBoundingClientRect();
  // Calculate the translation
  const deltaOneY = rectOne.top - newRectOne.top;
  const deltaTwoY = rectTwo.top - newRectTwo.top;
  // Animate itemOne
  animateSwap(itemOne, deltaOneY);
  // Animate itemTwo
  animateSwap(itemTwo, deltaTwoY);
}

// Improve Accessibility with Keyboard Support
function handleKeyDown(e) {
  if (e.key === "ArrowUp" || e.key === "ArrowDown") {
    e.preventDefault();
    const fromIndex = +this.getAttribute("data-index");
    let toIndex = fromIndex;
    if (e.key === "ArrowUp" && fromIndex > 0) toIndex = fromIndex - 1;
    if (e.key === "ArrowDown" && fromIndex < listItems.length - 1)
      toIndex = fromIndex + 1;
    if (toIndex !== fromIndex) {
      swapItems(fromIndex, toIndex);
      listItems[toIndex].focus();
    }
  }
}

function checkOrder() {
  listItems.forEach((listItem, index) => {
    const personName = listItem.querySelector(".draggable").innerText.trim();
    // Refactor checkOrder for Efficiency
    listItem.classList.remove("right", "wrong");
    if (personName !== richestPeople[index]) listItem.classList.add("wrong");
    else listItem.classList.add("right");
  });
}

// Event Listeners
function addListeners() {
  const draggables = document.querySelectorAll(".draggable");
  const dragListItems = document.querySelectorAll(".draggable-list li");
  draggables.forEach((draggable) => {
    draggable.addEventListener("dragstart", dragStart);
  });
  dragListItems.forEach((item) => {
    item.addEventListener("dragover", dragOver);
    item.addEventListener("drop", dragDrop);
    item.addEventListener("dragenter", dragEnter);
    item.addEventListener("dragleave", dragLeave);
    item.addEventListener("keydown", handleKeyDown);
  });
}

check.addEventListener("click", checkOrder);
reset.addEventListener("click", resetList);

// Init
createList();
