const toggle = document.getElementById("toggle");
const open = document.getElementById("open");
const close = document.getElementById("close");
const modal = document.getElementById("modal");

function closeNavbar(e) {
  // Refactor closeNavbar Logic
  if (!e.target.closest("#navbar") && !e.target.closest("#toggle")) {
    document.body.classList.toggle("show-nav");
    document.body.removeEventListener("click", closeNavbar);
  } else if (!document.body.classList.contains("show-nav")) {
    document.body.removeEventListener("click", closeNavbar);
  }
}

function closeModal() {
  modal.close();
  document.body.classList.remove("modal-open");
}

function openModal() {
  modal.showModal();
  // Prevent Body Scroll When Modal is Open
  document.body.classList.add("modal-open");
}

// Menu Slider
toggle.addEventListener("click", () => {
  document.body.classList.toggle("show-nav");
  document.body.addEventListener("click", closeNavbar);
});

// Modal
// Upgrade to Native Dialog Modal
open.addEventListener("click", openModal);
close.addEventListener("click", closeModal);
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});

// Enhance Navbar Accessibility
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && document.body.classList.contains("show-nav")) {
    document.body.classList.remove("show-nav");
  }
});
