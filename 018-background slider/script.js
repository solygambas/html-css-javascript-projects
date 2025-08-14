const body = document.body;
const slides = document.querySelectorAll(".slide");
const leftButton = document.getElementById("left");
const rightButton = document.getElementById("right");
const dotsContainer = document.getElementById("dots-container");

let activeSlide = 0;
let autoplayInterval;
let autoplayStarted = false;

// Add Indicator Dots
const createDots = () => {
  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    if (i === 0) dot.classList.add("active");

    dot.addEventListener("click", () => {
      activeSlide = i;
      setBackground();
      setActiveSlide();
      setActiveDot();

      stopAutoplay();
      startAutoplay();
    });

    dotsContainer.appendChild(dot);
  }
};

const setBackground = () => {
  body.style.backgroundImage = slides[activeSlide].style.backgroundImage;
};

const setActiveSlide = () => {
  slides.forEach((slide) => slide.classList.remove("active"));
  slides[activeSlide].classList.add("active");
};

const setActiveDot = () => {
  const dots = document.querySelectorAll(".dot");
  dots.forEach((dot) => dot.classList.remove("active"));
  dots[activeSlide].classList.add("active");
};

const startAutoplay = () => {
  if (autoplayStarted) {
    autoplayInterval = setInterval(() => {
      rightButton.click();
    }, 5000);
  }
};

const stopAutoplay = () => {
  clearInterval(autoplayInterval);
};

slides.forEach((slide) => {
  slide.addEventListener("mouseover", stopAutoplay);
  slide.addEventListener("mouseout", startAutoplay);
});

rightButton.addEventListener("click", () => {
  activeSlide++;
  if (activeSlide > slides.length - 1) activeSlide = 0;
  setBackground();
  setActiveSlide();
  setActiveDot();

  // Enable Autoplay
  if (!autoplayStarted) {
    autoplayStarted = true;
  }
  stopAutoplay();
  startAutoplay();
});

leftButton.addEventListener("click", () => {
  activeSlide--;
  if (activeSlide < 0) activeSlide = slides.length - 1;
  setBackground();
  setActiveSlide();
  setActiveDot();

  stopAutoplay();
  startAutoplay();
});

createDots();
setBackground();
