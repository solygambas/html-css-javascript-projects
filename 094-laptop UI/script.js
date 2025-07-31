const hamburger = document.querySelector(".hamburger");
const nav = document.getElementById("main-nav");
const bigCircle = document.querySelector(".big-circle");
const mediumCircle = document.querySelector(".medium-circle");
const mainImage = document.getElementById("main-image");
const dots = document.querySelectorAll(".laptop-dot");
const arrows = document.querySelectorAll(".laptop-arrow");

let currentIndex = 0;

const laptopImages = [
  "https://i.ibb.co/FJrnpsL/matebook.png",
  "https://i.ibb.co/9kH7Y320/matebook2.png",
  "https://i.ibb.co/yBP10fsM/matebook3.png",
];

// Improve Navigation Accessibility
hamburger.addEventListener("click", function () {
  const expanded = hamburger.getAttribute("aria-expanded") === "true";
  hamburger.setAttribute("aria-expanded", !expanded);
  nav.classList.toggle("nav-open");
});

// Animate Decorative Circles on Scroll
function parallaxCircles() {
  const scrollY = window.scrollY;
  const isMobile = window.innerWidth <= 768;
  const bigFactor = isMobile ? 0.4 : 0.6;
  const mediumFactor = isMobile ? 0.25 : 0.3;
  if (bigCircle)
    bigCircle.style.transform = `translateY(${scrollY * bigFactor}px)`;
  if (mediumCircle)
    mediumCircle.style.transform = `translateY(${scrollY * mediumFactor}px)`;
}

let ticking = false;
window.addEventListener("scroll", function () {
  if (!ticking) {
    window.requestAnimationFrame(function () {
      parallaxCircles();
      ticking = false;
    });
    ticking = true;
  }
});

// Implement an Image Switcher
function updateImage(index) {
  currentIndex = index;
  mainImage.src = laptopImages[currentIndex];
  dots.forEach((dot, dotIndex) => {
    dot.classList.toggle("active", dotIndex === currentIndex);
  });
}

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => updateImage(index));
});

arrows.forEach((arrow) => {
  arrow.addEventListener("click", () => {
    if (arrow.dataset.action === "prev") {
      updateImage(
        (currentIndex - 1 + laptopImages.length) % laptopImages.length
      );
    } else {
      updateImage((currentIndex + 1) % laptopImages.length);
    }
  });
});

// Initialize
updateImage(0);
