const slider = document.querySelector(".slider");
const slides = slider.querySelectorAll(".slide");
const nextButton = document.getElementById("next");
const prevButton = document.getElementById("prev");
const indicatorsContainer = document.querySelector(".indicators");

const auto = true;
const intervalTime = 5000;
let slideInterval;

// Implement Slide Indicators
function generateIndicators() {
  indicatorsContainer.innerHTML = "";
  slides.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.classList.add("indicator-dot");
    if (index === 0) dot.classList.add("active");
    dot.addEventListener("click", () => {
      document.querySelector(".slide.current").classList.remove("current");
      slides[index].classList.add("current");
      updateIndicators(index);
      resetAutoSlide();
    });
    indicatorsContainer.appendChild(dot);
  });
}

function updateIndicators(activeIndex) {
  document.querySelectorAll(".indicator-dot").forEach((dot, index) => {
    dot.classList.toggle("active", index === activeIndex);
  });
}

function changeSlide(offset) {
  const current = document.querySelector(".current");
  current.classList.remove("current");
  current.classList.add("exiting");
  const slidesArr = Array.from(slides);
  let newIndex = slidesArr.indexOf(current) + offset;
  if (newIndex < 0) newIndex = slides.length - 1;
  if (newIndex >= slides.length) newIndex = 0;
  slides[newIndex].classList.add("current");
  updateIndicators(newIndex);
  current.addEventListener("transitionend", function handler() {
    current.classList.remove("exiting");
    current.removeEventListener("transitionend", handler);
  });
}

function resetAutoSlide() {
  if (auto) {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, intervalTime);
  }
}

function nextSlide() {
  changeSlide(1);
}

function prevSlide() {
  changeSlide(-1);
}

function goToNextSlide() {
  nextSlide();
  resetAutoSlide();
}

function goToPrevSlide() {
  prevSlide();
  resetAutoSlide();
}

nextButton.addEventListener("click", goToNextSlide);
prevButton.addEventListener("click", goToPrevSlide);

// Add Keyboard Navigation
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") {
    goToNextSlide();
  } else if (e.key === "ArrowLeft") {
    goToPrevSlide();
  }
});

// Pause on Hover
slider.addEventListener("mouseenter", () => {
  clearInterval(slideInterval);
});

slider.addEventListener("mouseleave", resetAutoSlide);

generateIndicators();
if (auto) {
  slideInterval = setInterval(nextSlide, intervalTime);
}
