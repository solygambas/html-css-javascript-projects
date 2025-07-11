const numsContainer = document.querySelector(".nums");
const countdownStart = 5;
let nums = "";
const counter = document.querySelector(".counter");
const finalMessage = document.querySelector(".final");
const replay = document.querySelector("#replay");
const tickSound = document.querySelector("#tickSound");
const goSound = document.querySelector("#goSound");
const startOverlay = document.getElementById("startOverlay");
const start = document.querySelector("#start");

const resetDOM = () => {
  counter.classList.remove("hide");
  finalMessage.classList.remove("show");
  nums.forEach((num) => (num.classList.value = ""));
  nums[0].classList.add("in");
};

// Make the Countdown Configurable
const setupCountdown = (startNumber) => {
  numsContainer.innerHTML = "";
  for (let i = startNumber; i >= 0; i--) {
    const span = document.createElement("span");
    span.textContent = i;
    if (i === startNumber) {
      span.classList.add("in");
    }
    numsContainer.appendChild(span);
  }
  nums = numsContainer.querySelectorAll("span");
};

const runAnimation = () => {
  nums.forEach((num, index) => {
    const nextToLast = nums.length - 1;
    num.addEventListener("animationend", (e) => {
      if (e.animationName === "goIn" && index !== nextToLast) {
        num.classList.remove("in");
        num.classList.add("out");
        tickSound.currentTime = 0;
        tickSound.play();
      } else if (e.animationName === "goOut" && num.nextElementSibling) {
        num.nextElementSibling.classList.add("in");
      } else if (index === nextToLast) {
        counter.classList.add("hide");
        finalMessage.classList.add("show");
        tickSound.pause();
        goSound.currentTime = 0;
        goSound.play();
      }
    });
  });
};

// setupCountdown(countdownStart);
// runAnimation();

// Add a Start Overlay
const startCountdown = () => {
  startOverlay.style.display = "none";
  setupCountdown(countdownStart);
  runAnimation();
};

start.addEventListener("click", startCountdown);

replay.addEventListener("click", () => {
  resetDOM();
  runAnimation();
});
