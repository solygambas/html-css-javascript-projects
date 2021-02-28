const container = document.querySelector(".container");
const slider = document.querySelector(".slider");
const before = document.querySelector(".img-container-before");
const after = document.querySelector(".img-container-after");

const dragSlider = (e) => {
  let x = e.type.includes("mouse") ? e.layerX : e.touches[0].clientX;
  let size = container.offsetWidth;
  before.style.width = x + "px";
  slider.style.left = x + "px";
  if (x < 30) {
    before.style.width = 0;
    slider.style.left = 0;
  }
  if (x + 30 > size) {
    before.style.width = size + "px";
    slider.style.left = size + "px";
  }
};

// Mouse event
container.addEventListener("mousemove", dragSlider);
// Touch and drag events
container.addEventListener("touchstart", dragSlider);
container.addEventListener("touchmove", dragSlider);
