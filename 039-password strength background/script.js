const password = document.getElementById("password");
const background = document.getElementById("background");
// Optimize Performance with requestAnimationFrame
let blurValue = 20;

function updateBlur() {
  // background.style.filter = `blur(${blurValue}px)`;
  // Use a CSS Variable for the Blur Value
  background.style.setProperty("--blur-amount", `${blurValue}px`);
}

password.addEventListener("input", (e) => {
  const input = e.target.value;
  const length = input.length;
  // Adjust the Blurring Effect
  blurValue = 20 - length * 1.5;
  requestAnimationFrame(updateBlur);
});
