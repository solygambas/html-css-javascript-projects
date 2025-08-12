const faqContainer = document.querySelector(".faq-container");
const toggles = faqContainer.querySelectorAll(".faq-toggle");

function toggleActive(selectedToggle) {
  // Only One FAQ Open at a Time
  toggles.forEach((toggle) => {
    if (toggle !== selectedToggle) {
      toggle.parentNode.classList.remove("active");
    }
  });
  selectedToggle.parentNode.classList.toggle("active");
}

toggles.forEach((toggle) => {
  toggle.addEventListener("click", () => {
    toggleActive(toggle);
  });
});
