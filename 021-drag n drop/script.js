const fill = document.querySelector(".fill");
const empties = document.querySelectorAll(".empty");

const dragStart = function () {
  this.className += " hold";
  setTimeout(() => (this.className = "invisible"), 0);
};

const dragEnd = function () {
  this.className = "fill";
};

const dragOver = function (e) {
  // Ref: https://developer.cdn.mozilla.net/en-US/docs/Web/API/Document/dragover_event
  e.preventDefault();
};

const dragEnter = function (e) {
  e.preventDefault();
  this.className += " hovered";
};

const dragLeave = function () {
  this.className = "empty";
};

const dragDrop = function () {
  this.className = "empty";
  this.append(fill);
};

fill.addEventListener("dragstart", dragStart);
fill.addEventListener("dragend", dragEnd);

for (const empty of empties) {
  empty.addEventListener("dragover", dragOver);
  empty.addEventListener("dragenter", dragEnter);
  empty.addEventListener("dragleave", dragLeave);
  empty.addEventListener("drop", dragDrop);
}
