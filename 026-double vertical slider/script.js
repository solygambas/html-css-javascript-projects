const sliderContainer = document.querySelector(".slider-container");
const slideRight = document.querySelector(".right-slide");
const slideLeft = document.querySelector(".left-slide");
const upButton = document.querySelector(".up-button");
const downButton = document.querySelector(".down-button");
const slidesLength = slideRight.querySelectorAll("div").length;

let activeSlideIndex = 0;

slideLeft.style.top = `-${(slidesLength - 1) * 100}vh`;

const changeSlide = (direction) => {
  const sliderHeight = sliderContainer.clientHeight;
  if (direction === "up") {
    activeSlideIndex++;
    if (activeSlideIndex > slidesLength - 1) activeSlideIndex = 0;
  } else if (direction === "down") {
    activeSlideIndex--;
    if (activeSlideIndex < 0) activeSlideIndex = slidesLength - 1;
  }
  slideRight.style.transform = `translateY(-${
    activeSlideIndex * sliderHeight
  }px)`;
  slideLeft.style.transform = `translateY(${
    activeSlideIndex * sliderHeight
  }px)`;
};

upButton.addEventListener("click", () => changeSlide("up"));
downButton.addEventListener("click", () => changeSlide("down"));

// Add Keyboard Navigation
window.addEventListener("keydown", (event) => {
  if (event.key === "ArrowUp") {
    changeSlide("down");
  } else if (event.key === "ArrowDown") {
    changeSlide("up");
  }
});

// Implement Autoplay
let autoplayInterval = setInterval(() => changeSlide("up"), 5000);

slideRight.addEventListener("mouseover", () => {
  clearInterval(autoplayInterval);
});

slideRight.addEventListener("mouseout", () => {
  autoplayInterval = setInterval(() => changeSlide("up"), 5000);
});
