const nav = document.querySelector(".nav");
const sections = document.querySelectorAll("h2[id], h3[id]");
const navLinks = document.querySelectorAll(".nav ul a[href^='#']");

let isThrottled = false;

// Highlight Active Link on Scroll
const updateActiveLink = () => {
  const scrollPosition = window.scrollY + 100;
  let currentSection = "home";
  sections.forEach((section) => {
    if (section.offsetTop <= scrollPosition) {
      currentSection = section.id;
    }
  });
  navLinks.forEach((link) => {
    link.classList.remove("current");
    if (link.getAttribute("href") === "#" + currentSection) {
      link.classList.add("current");
    }
  });
};

const fixNav = () => {
  // Adjust the Scroll Trigger Point
  if (window.scrollY > nav.offsetHeight + 50) nav.classList.add("active");
  else nav.classList.remove("active");
  updateActiveLink();
};

// Optimize Scroll Performance with Throttling
const throttledFixNav = () => {
  if (isThrottled) return;
  isThrottled = true;
  fixNav();
  setTimeout(() => {
    isThrottled = false;
  }, 100);
};

// window.addEventListener("scroll", fixNav);
window.addEventListener("scroll", throttledFixNav);

// Smooth Scrolling for Nav Links
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = e.target.getAttribute("href").substring(1);
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      window.scrollTo({
        top: targetSection.offsetTop - nav.offsetHeight - 20,
        behavior: "smooth",
      });
      history.pushState(null, null, "#" + targetId);
    }
  });
});
