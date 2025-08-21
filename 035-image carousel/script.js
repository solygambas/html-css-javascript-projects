const images = document.getElementById("images");
const leftButton = document.getElementById("left");
const rightButton = document.getElementById("right");

// Implement an Infinite Loop with Cloning
let imagesList = Array.from(document.querySelectorAll("#images img"));

const firstClone = imagesList[0].cloneNode(true);
const lastClone = imagesList[imagesList.length - 1].cloneNode(true);
firstClone.id = "first-clone";
lastClone.id = "last-clone";
images.appendChild(firstClone);
images.insertBefore(lastClone, imagesList[0]);
imagesList.unshift(lastClone);
imagesList.push(firstClone);

let index = 1;
// Adjust the Automatic Slide Interval
const duration = 1500;

const changeImage = (withTransition = true) => {
  // if (index > imagesList.length - 1) index = 0;
  // else if (index < 0) index = imagesList.length - 1;
  images.style.transition = withTransition
    ? "transform 0.5s ease-in-out"
    : "none";
  // Refactor Image Sizing
  const imageWidth = imagesList[0].offsetWidth;
  images.style.transform = `translateX(${-index * imageWidth}px)`;
};

const run = () => {
  index++;
  changeImage();
};

let interval = setInterval(run, duration);

const resetInterval = () => {
  clearInterval(interval);
  interval = setInterval(run, duration);
};

rightButton.addEventListener("click", () => {
  index++;
  changeImage();
  resetInterval();
});

leftButton.addEventListener("click", () => {
  index--;
  changeImage();
  resetInterval();
});

// Make the Carousel Responsive
window.addEventListener("resize", () => {
  changeImage(false);
});

// Fix Carousel Sync When Switching Browser Tabs
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "hidden") {
    clearInterval(interval);
  } else if (document.visibilityState === "visible") {
    resetInterval();
    changeImage(false);
  }
});

images.addEventListener("transitionend", () => {
  if (imagesList[index].id === "first-clone") {
    index = 1;
    changeImage(false);
  }
  if (imagesList[index].id === "last-clone") {
    index = imagesList.length - 2;
    changeImage(false);
  }
});

changeImage(false);
