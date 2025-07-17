const slider = document.querySelector(".slider-container"),
  slides = Array.from(document.querySelectorAll(".slide"));

// Implement an Infinite Loop
const firstClone = slides[0].cloneNode(true);
const lastClone = slides[slides.length - 1].cloneNode(true);
firstClone.classList.add("first-clone");
lastClone.classList.add("last-clone");
slider.appendChild(firstClone);
slider.insertBefore(lastClone, slides[0]);

let allSlides = Array.from(document.querySelectorAll(".slide"));
let currentIndex = 1;
const targetPosition = -window.innerWidth * currentIndex;
slider.style.transform = `translateX(${targetPosition}px)`;

let isDragging = false,
  startPos = 0,
  currentTranslate = targetPosition,
  prevTranslate = targetPosition,
  animationID = 0;

// Disable context menu
window.oncontextmenu = (event) => {
  event.preventDefault();
  event.stopPropagation();
  return false;
};

const getPositionX = (event) =>
  event.type.includes("mouse") ? event.pageX : event.touches[0].clientX;

const setSliderPosition = () => {
  slider.style.transform = `translateX(${currentTranslate}px)`;
};

const animation = () => {
  setSliderPosition();
  if (isDragging) requestAnimationFrame(animation);
};

const setPositionByIndex = (withTransition = true) => {
  currentTranslate = currentIndex * -window.innerWidth;
  prevTranslate = currentTranslate;
  slider.style.transition = withTransition ? "transform 0.3s ease-out" : "none";
  slider.style.transform = `translateX(${-window.innerWidth * currentIndex}px)`;
  // setSliderPosition();
};

// const touchStart = (index) => {
//   return (event) => {
//     currentIndex = index;
//     startPos = getPositionX(event);
//     isDragging = true;
//     // https://css-tricks.com/using-requestanimationframe/
//     animationID = requestAnimationFrame(animation);
//     slider.classList.add("grabbing");
//   };
// };

// function touchStart(index, event) {
function touchStart(event) {
  // currentIndex = index;
  startPos = getPositionX(event);
  isDragging = true;
  animationID = requestAnimationFrame(animation);
  slider.classList.add("grabbing");
}

const touchEnd = () => {
  isDragging = false;
  cancelAnimationFrame(animationID);
  const movedBy = currentTranslate - prevTranslate;
  // if (movedBy < -100 && currentIndex < slides.length - 1) currentIndex += 1;
  // if (movedBy > 100 && currentIndex > 0) currentIndex -= 1;
  if (movedBy < -100) currentIndex += 1;
  if (movedBy > 100) currentIndex -= 1;
  setPositionByIndex();
  slider.classList.remove("grabbing");
  prevTranslate = currentTranslate;
};

const touchMove = (event) => {
  if (isDragging) {
    const currentPosition = getPositionX(event);
    currentTranslate = prevTranslate + currentPosition - startPos;
  }
};

// slides.forEach((slide, index) => {
//   const slideImage = slide.querySelector("img");
//   slideImage.addEventListener("dragstart", (e) => e.preventDefault());
//   // Touch events
//   slide.addEventListener("touchstart", touchStart(index));
//   slide.addEventListener("touchend", touchEnd);
//   slide.addEventListener("touchmove", touchMove);
//   // Mouse events
//   slide.addEventListener("mousedown", touchStart(index));
//   slide.addEventListener("mouseup", touchEnd);
//   slide.addEventListener("mouseleave", touchEnd);
//   slide.addEventListener("mousemove", touchMove);
// });

function handleStart(event) {
  const slide = event.target.closest(".slide");
  if (!slide) return;
  // currentIndex = slides.indexOf(slide);
  currentIndex = allSlides.indexOf(slide);
  // touchStart(currentIndex, event);
  touchStart(event);
}

// Refactor Event Handlers
slider.addEventListener("touchstart", handleStart, { passive: false });
slider.addEventListener("touchend", touchEnd, { passive: false });
slider.addEventListener("touchmove", touchMove, { passive: false });

slider.addEventListener("mousedown", handleStart);
slider.addEventListener("mouseup", touchEnd);
slider.addEventListener("mouseleave", touchEnd);
slider.addEventListener("mousemove", touchMove);

slides.forEach((slide) => {
  const slideImage = slide.querySelector("img");
  slideImage.addEventListener("dragstart", (e) => e.preventDefault());
});

// Prevent Blank Screen on Rapid Arrow Key Press
let isTransitioning = false;

// Add Arrow Key Navigation
window.addEventListener("keydown", (event) => {
  if (isTransitioning) return;
  // if (event.key === "ArrowRight" && currentIndex < slides.length - 1) {
  if (event.key === "ArrowRight") {
    currentIndex += 1;
    setPositionByIndex();
    isTransitioning = true;
    // } else if (event.key === "ArrowLeft" && currentIndex > 0) {
  } else if (event.key === "ArrowLeft") {
    currentIndex -= 1;
    setPositionByIndex();
    isTransitioning = true;
  }
});

slider.addEventListener("transitionend", () => {
  if (allSlides[currentIndex].classList.contains("first-clone")) {
    currentIndex = 1;
    setPositionByIndex(false);
  }
  if (allSlides[currentIndex].classList.contains("last-clone")) {
    currentIndex = allSlides.length - 2;
    setPositionByIndex(false);
  }
  isTransitioning = false;
});

// Handle Window Resize
window.addEventListener("resize", () => setPositionByIndex(false));
