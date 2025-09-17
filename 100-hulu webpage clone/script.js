const modal = document.querySelector(".modal");
const loginButtons = document.querySelectorAll(".login-btn");
const closeButton = document.querySelector(".close");
const hamburger = document.querySelector(".hamburger");
const nav = document.querySelector(".nav-overlay");

let lastLoginButton = null;

// Improve Modal Accessibility
const openModal = () => {
  modal.showModal();
  // Focus first input inside dialog
  const firstInput = modal.querySelector("input");
  if (firstInput) firstInput.focus();
  // Store the button that opened the modal
  lastLoginButton = e.currentTarget;
};

const closeModal = () => {
  modal.close();
  if (lastLoginButton) lastLoginButton.focus();
};

loginButtons.forEach((btn) => btn.addEventListener("click", openModal));
closeButton.addEventListener("click", closeModal);

modal.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeModal();
  }
});

// Add a Hamburger Menu for Mobile
hamburger.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("is-open");
  hamburger.setAttribute("aria-expanded", isOpen ? "true" : "false");
});

nav.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON" && nav.classList.contains("is-open")) {
    nav.classList.remove("is-open");
    hamburger.setAttribute("aria-expanded", "false");
  }
});
