const screens = document.querySelectorAll(".screen");
const chooseInsectButtons = document.querySelectorAll(".choose-insect-btn");
const startButton = document.getElementById("start-btn");
const gameContainer = document.getElementById("game-container");
const timeElement = document.getElementById("time");
const scoreElement = document.getElementById("score");
const message = document.getElementById("message");
// Add Sound Effects for Game Actions
const catchSound = document.getElementById("catch-sound");
const gameOverSound = document.getElementById("gameover-sound");

let seconds = 0;
let score = 0;
let selectedInsect = {};
let gameInterval = null;

startButton.addEventListener("click", () => screens[0].classList.add("up"));

const increaseScore = () => {
  score++;
  if (score > 19) message.classList.add("visible");
  scoreElement.innerHTML = `Score: ${score}`;
  // Increase Game Difficulty Over Time
  const insectsToAdd = Math.min(1 + Math.floor(score / 10), 5);
  addInsects(insectsToAdd);
};

const addInsects = (count = 1) => {
  setTimeout(createInsect, 1000);
  if (count === 2) setTimeout(createInsect, 1500);
};

const catchInsect = function () {
  if (this.classList.contains("caught")) return;
  increaseScore();
  catchSound.currentTime = 0;
  catchSound.play();
  this.classList.add("caught");
  // Fix the Insect Removal Bug
  setTimeout(() => this.remove(), 2000);
  // addInsects();
};

const getRandomLocation = () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const x = Math.random() * (width - 200) + 100;
  const y = Math.random() * (height - 200) + 100;
  return { x, y };
};

const createInsect = () => {
  const insect = document.createElement("div");
  insect.classList.add("insect");
  const { x, y } = getRandomLocation();
  insect.style.top = `${y}px`;
  insect.style.left = `${x}px`;
  insect.innerHTML = `<img src="${selectedInsect.src}" 
  alt="${selectedInsect.alt}" 
  style="transform: rotate(${Math.random() * 360}deg)" />`;
  insect.addEventListener("click", catchInsect);
  gameContainer.appendChild(insect);
};

const increaseTime = () => {
  let m = Math.floor(seconds / 60);
  let s = seconds % 60;
  m = m < 10 ? `0${m}` : m;
  s = s < 10 ? `0${s}` : s;
  timeElement.innerHTML = `Time: ${m}:${s}`;
  seconds++;
  // Add a Game Over State
  if (seconds > 30) {
    clearInterval(gameInterval);
    showGameOver();
  }
};

const showGameOver = () => {
  gameOverSound.currentTime = 0;
  gameOverSound.play();
  message.innerHTML = `
    <div>
      <h2>Game Over!</h2>
      <p>Your final score: <strong>${score}</strong></p>
      <button id="play-again-btn" class="btn">Play Again</button>
    </div>
  `;
  message.classList.add("visible");
  document.querySelectorAll(".insect").forEach((insect) => insect.remove());
  document.getElementById("play-again-btn").onclick = () => location.reload();
};

const startGame = () => {
  gameInterval = setInterval(increaseTime, 1000);
};

chooseInsectButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const image = button.querySelector("img");
    const src = image.getAttribute("src");
    const alt = image.getAttribute("alt");
    selectedInsect = { src, alt };
    screens[1].classList.add("up");
    setTimeout(createInsect, 1000);
    startGame();
  });
});
