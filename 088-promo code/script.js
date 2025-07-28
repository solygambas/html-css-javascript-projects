const present = document.getElementById("present");
const copyBtn = document.getElementById("copy-btn");

// Customize Confetti Animation
const options = {
  particleCount: 200,
  spread: 90,
  gravity: 0.8,
  shapes: ["star"],
  colors: [
    "#34D963",
    "#068C2C",
    "#FF5757",
    "#8C1414",
    "#D9D74A",
    "#1E91D9",
    "#1B608C",
  ],
};

// present.addEventListener("mouseenter", () => {
//   confetti(options);
// });
// present.addEventListener("touchstart", () => {
//   confetti(options);
// });

// Toggle Animation on Click
present.addEventListener("click", () => {
  const isOpening = !present.classList.contains("open");
  present.classList.toggle("open");
  if (isOpening) {
    confetti(options);
  }
});

present.addEventListener("keydown", (e) => {
  if ((e.key === "Enter" || e.key === " ") && e.target === present) {
    e.preventDefault();
    present.click();
  }
});

// Add a "Copy to Clipboard" Button
copyBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  const promoCode = copyBtn.parentElement.firstChild.textContent.trim();
  navigator.clipboard.writeText(promoCode).then(() => {
    const originalText = copyBtn.textContent;
    copyBtn.textContent = "Copied!";
    setTimeout(() => {
      copyBtn.textContent = originalText;
    }, 1500);
  });
});
