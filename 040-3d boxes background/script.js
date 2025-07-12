const boxesContainer = document.getElementById("boxes");
const button = document.getElementById("btn");
// Make the Grid Size Configurable
// Refactor with CSS Variables
const containerStyles = getComputedStyle(document.documentElement);
const containerSize = parseInt(
  containerStyles.getPropertyValue("--container-size")
);
const gridSize = parseInt(containerStyles.getPropertyValue("--grid-size"));
const boxSize = containerSize / gridSize;

const createBoxes = () => {
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      const box = document.createElement("div");
      box.classList.add("box");
      box.style.width = `${boxSize}px`;
      box.style.height = `${boxSize}px`;
      box.style.backgroundPosition = `${-j * boxSize}px ${-i * boxSize}px`;
      boxesContainer.appendChild(box);
    }
  }
};

createBoxes();

button.addEventListener("click", () => boxesContainer.classList.toggle("big"));
