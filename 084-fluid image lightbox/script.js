const modal = document.querySelector(".modal");
const previews = document.querySelectorAll(".gallery img");
const original = document.querySelector(".full-img");
const caption = document.querySelector(".caption");
const spinner = document.querySelector(".spinner");
const nextButton = document.querySelector(".next");
const prevButton = document.querySelector(".prev");

let currentIndex = 0;
let touchStartX = 0;
let touchEndX = 0;
const swipeThreshold = 50; // Minimum pixel distance for swipe

function setModalState({ loading }) {
  if (loading) {
    spinner.style.display = "block";
    original.style.display = "none";
    caption.style.display = "none";
  } else {
    spinner.style.display = "none";
    original.style.display = "";
    caption.style.display = "";
  }
}

function navigateImage(direction) {
  if (direction === "next") {
    currentIndex = (currentIndex + 1) % previews.length;
  } else if (direction === "prev") {
    currentIndex = (currentIndex - 1 + previews.length) % previews.length;
  }
  showImage(currentIndex);
}

function showImage(index) {
  // Add Image Preloading
  setModalState({ loading: true });
  const preview = previews[index];
  const originalUrl = new URL(preview.src);
  const originalSize = preview.getAttribute("data-original");
  originalUrl.searchParams.set("w", originalSize);
  const img = new Image();
  img.src = originalUrl.toString();
  img.onload = () => {
    original.src = img.src;
    caption.textContent = preview.alt;
    // Reference: https://stackoverflow.com/questions/35213147/difference-between-textcontent-vs-innertext
    original.classList.add("open");
    setModalState({ loading: false });
  };
}

previews.forEach((preview, index) => {
  preview.addEventListener("click", () => {
    currentIndex = index;
    modal.showModal();
    showImage(currentIndex);
  });
});

modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.close();
    original.classList.remove("open");
  }
});

// Close Modal with Escape Key
// document.addEventListener("keydown", (e) => {
//   if (e.key === "Escape" && modal.classList.contains("open")) {
//     modal.classList.remove("open");
//     original.classList.remove("open");
//   }
// });

nextButton.addEventListener("click", (e) => {
  e.stopPropagation();
  navigateImage("next");
});

prevButton.addEventListener("click", (e) => {
  e.stopPropagation();
  navigateImage("prev");
});

// Implement Touch/Swipe Navigation
modal.addEventListener("touchstart", (e) => {
  if (e.touches.length === 1 && !e.target.closest("button")) {
    touchStartX = e.touches[0].clientX;
  }
});

modal.addEventListener("touchmove", (e) => {
  if (e.touches.length === 1) {
    touchEndX = e.touches[0].clientX;
    e.preventDefault(); // Prevent scrolling
  }
});

modal.addEventListener("touchend", () => {
  const deltaX = touchEndX - touchStartX;
  if (Math.abs(deltaX) > swipeThreshold) {
    if (deltaX < 0) {
      navigateImage("next");
    } else {
      navigateImage("prev");
    }
  }
  touchStartX = 0;
  touchEndX = 0;
});
