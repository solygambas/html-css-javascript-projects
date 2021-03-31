const present = document.getElementById("present");
const options = {
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

present.addEventListener("mouseenter", () => {
  confetti(options);
});
present.addEventListener("touchstart", () => {
  confetti(options);
});
