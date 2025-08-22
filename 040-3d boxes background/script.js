const boxesContainer = document.getElementById("boxes");
const button = document.getElementById("btn");

// Refactor with CSS Variables
const containerStyles = getComputedStyle(document.documentElement);
const containerSize = parseInt(
  containerStyles.getPropertyValue("--container-size")
);

// Make the Grid Size Configurable
// const gridSize = 4;
// const boxSize = 500 / gridSize;
const gridSize = parseInt(containerStyles.getPropertyValue("--grid-size"));
const boxSize = containerSize / gridSize;

const createBoxes = () => {
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      const box = document.createElement("div");
      box.classList.add("box");
      // box.style.width = `${boxSize}px`;
      // box.style.height = `${boxSize}px`;
      // box.style.backgroundPosition = `${-j * 125}px ${-i * 125}px`;
      box.style.backgroundPosition = `${-j * boxSize}px ${-i * boxSize}px`;
      boxesContainer.appendChild(box);
    }
  }
};

createBoxes();

button.addEventListener("click", () => boxesContainer.classList.toggle("big"));
