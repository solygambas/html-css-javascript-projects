const darkModeToggle = document.getElementById("darkModeToggle");
const iconSun = darkModeToggle.querySelector(".icon-sun");
const iconMoon = darkModeToggle.querySelector(".icon-moon");
const products = document.querySelectorAll(".product");

function updateIcons() {
  const isDark = document.body.classList.contains("dark-mode");
  iconSun.style.display = isDark ? "none" : "inline";
  iconMoon.style.display = isDark ? "inline" : "none";
}

// Create a Dark Mode Toggle
darkModeToggle.addEventListener("click", function () {
  document.body.classList.toggle("dark-mode");
  updateIcons();
});

// Animate Products on Scroll
const observer = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.remove("hidden");
        obs.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

products.forEach((product) => observer.observe(product));
