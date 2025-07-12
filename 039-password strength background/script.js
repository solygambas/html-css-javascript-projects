const password = document.getElementById("password");
const background = document.getElementById("background");
// Optimize Performance with Throttling
let isThrottled = false;

password.addEventListener("input", (e) => {
  if (isThrottled) return;
  isThrottled = true;
  const input = e.target.value;
  const length = input.length;
  // Adjust the Blurring Effect
  const blurValue = 20 - length * 1;
  // background.style.filter = `blur(${blurValue}px)`;
  // Use a CSS Variable for the Blur Value
  background.style.setProperty("--blur-amount", `${blurValue}px`);
  setTimeout(() => {
    isThrottled = false;
  }, 100);
});
