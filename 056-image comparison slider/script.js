const container = document.querySelector(".container");
const slider = document.querySelector(".slider");
const before = document.querySelector(".img-container-before");
const after = document.querySelector(".img-container-after");

// Store Global Configuration Variables
let containerSize = container.offsetWidth;
let centerX = containerSize / 2;
let step = 10;
let boundary = 30;

const dragSlider = (e) => {
  let x = e.type.includes("mouse") ? e.layerX : e.touches[0].clientX;
  before.style.width = x + "px";
  slider.style.left = x + "px";
  if (x < boundary) {
    before.style.width = 0;
    slider.style.left = 0;
  }
  if (x + boundary > containerSize) {
    before.style.width = containerSize + "px";
    slider.style.left = containerSize + "px";
  }
};

// // Mouse event
// container.addEventListener("mousemove", dragSlider);
// // Touch and drag events
// container.addEventListener("touchstart", dragSlider);
// container.addEventListener("touchmove", dragSlider);

// Refactor Event Handlers
const events = ["mousemove", "touchstart", "touchmove"];
events.forEach((event) => {
  container.addEventListener(event, dragSlider, { passive: false });
});

// Add Keyboard Accessibility
container.addEventListener("keydown", (e) => {
  e.preventDefault();
  let currentX = before.offsetWidth;
  if (e.key === "ArrowLeft") {
    currentX = Math.max(0, currentX - step);
  } else if (e.key === "ArrowRight") {
    currentX = Math.min(containerSize, currentX + step);
  } else {
    return;
  }
  before.style.width = currentX + "px";
  slider.style.left = currentX + "px";
});

// Make the Slider Responsive
window.addEventListener("resize", () => {
  containerSize = container.offsetWidth;
  centerX = containerSize / 2;
  before.style.width = centerX + "px";
  slider.style.left = centerX + "px";
});
