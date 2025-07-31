const sections = document.querySelectorAll(".cli, .cloud, .languages");
const hamburger = document.querySelector(".hamburger");
const nav = document.querySelector(".navbar__nav");

// Implement a Hamburger Menu for Mobile
hamburger.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("is-open");
  hamburger.setAttribute("aria-expanded", isOpen);
});

// Animate Elements on Scroll
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target); // runs only once on load
      }
    });
  },
  { threshold: 0.05 }
);

sections.forEach((section) => observer.observe(section));
