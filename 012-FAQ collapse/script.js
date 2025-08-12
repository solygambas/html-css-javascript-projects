const faqContainer = document.querySelector(".faq-container");
const toggles = faqContainer.querySelectorAll(".faq-toggle");

toggles.forEach((toggle) => {
  toggle.addEventListener("click", () => {
    toggle.parentNode.classList.toggle("active");
  });
});
