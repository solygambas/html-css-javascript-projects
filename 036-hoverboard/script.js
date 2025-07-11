const container = document.getElementById("container");
// Customize the Color Palette
const colors = ["#D63BD9", "#7B6CD9", "#363159", "#05AFF2", "#05C7F2"];
// Adjust the Board Size
const SQUARES = 800;

const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];

const setColor = (square) => {
  const color = getRandomColor();
  square.style.background = color;
  square.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`;
};

const removeColor = (square) => {
  // Refactor with CSS Variables
  square.style.background = "";
  square.style.boxShadow = "";
};

for (let i = 0; i < SQUARES; i++) {
  const square = document.createElement("div");
  square.classList.add("square");
  // square.addEventListener("mouseover", () => setColor(square));
  // square.addEventListener("mouseout", () => removeColor(square));
  container.appendChild(square);
}

// Optimize with Event Delegation
container.addEventListener("mouseover", (event) => {
  if (event.target.classList.contains("square")) {
    setColor(event.target);
  }
});

container.addEventListener("mouseout", (event) => {
  if (event.target.classList.contains("square")) {
    removeColor(event.target);
  }
});
