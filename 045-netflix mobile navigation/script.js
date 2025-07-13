const openButton = document.querySelector(".open-btn");
const closeButton = document.querySelector(".close-btn");
const navs = document.querySelectorAll(".nav");
const navMenu = navs[0];

const closeMenu = () => {
  navs.forEach((nav) => nav.classList.remove("visible"));
};

const openMenu = () => {
  navs.forEach((nav) => nav.classList.add("visible"));
};

openButton.addEventListener("click", openMenu);

// Close Menu on Link Click
closeButton.addEventListener("click", closeMenu);

navMenu.addEventListener("click", (e) => {
  if (e.target.tagName === "A") closeMenu();
});

// Close Menu by Clicking Outside
document.body.addEventListener("click", (e) => {
  if (!e.target.closest(".nav") && !e.target.closest(".open-btn")) closeMenu();
});

// Add Keyboard Accessibility
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && navMenu.classList.contains("visible")) closeMenu();
  if (e.key === "Enter" && e.target.classList.contains("open-btn")) openMenu();
});
