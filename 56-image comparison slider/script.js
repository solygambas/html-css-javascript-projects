const container = document.querySelector(".container");
const slider = document.querySelector(".slider");
const before = document.querySelector(".img-container-before");
const after = document.querySelector(".img-container-after");

const dragSlider = (e) => {
  let x = e.layerX;
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

container.addEventListener("mousemove", dragSlider);
