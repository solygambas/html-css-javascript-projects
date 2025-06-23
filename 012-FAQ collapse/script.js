const toggles = document.querySelectorAll(".faq-toggle");

toggles.forEach((toggle) => {
  toggle.addEventListener("click", () => {
    // Only One FAQ Open at a Time
    toggles.forEach((item) => {
      if (item !== toggle) {
        item.parentNode.classList.remove("active");
      }
    });
    toggle.parentNode.classList.toggle("active");
  });
});
