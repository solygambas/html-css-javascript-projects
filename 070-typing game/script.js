const word = document.getElementById("word");
const text = document.getElementById("text");
const scoreElement = document.getElementById("score");
const timeElement = document.getElementById("time");
const endgameElement = document.getElementById("end-game-container");
const settingsButton = document.getElementById("settings-btn");
const settings = document.getElementById("settings");
const settingsForm = document.getElementById("settings-form");
const difficultySelect = document.getElementById("difficulty");
const highScoreElement = document.getElementById("highscore");
const highScoreDifficultyElement = document.getElementById(
  "highscore-difficulty"
);
const overlay = document.getElementById("countdown-overlay");
const number = document.getElementById("countdown-number");

let words = [];

let randomWord;
let score = 0;
let time = 10;
// let difficulty = "medium";
let difficulty =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "medium";
let timeInterval;

function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

function addWordToDom() {
  if (words.length === 0) {
    word.innerText = "Loading...";
    return;
  }
  randomWord = getRandomWord();
  word.innerText = randomWord;
}

function updateScore() {
  score++;
  scoreElement.innerText = score;
}

function updateTime() {
  time--;
  timeElement.innerText = time + "s";
  if (time === 0) {
    clearInterval(timeInterval);
    gameOver();
  }
}

// Fetch Words from an API
async function initGame() {
  difficultySelect.value = difficulty;
  updateHighScoreDisplay();

  word.innerText = "Loading...";
  try {
    const res = await fetch(
      "https://random-word-api.herokuapp.com/word?number=50"
    );
    words = await res.json();
    addWordToDom();
    showCountdown(() => {
      text.focus();
      startTimer();
    });
  } catch (err) {
    word.innerText = "Failed to load words!";
  }
}

function startTimer() {
  if (timeInterval) clearInterval(timeInterval);
  timeInterval = setInterval(updateTime, 1000);
}

// Fix Game Over Logic
function gameOver() {
  const highScoreKey = `highscore-${difficulty}`;
  const prevHighScore = getHighScore();
  let newBest = false;
  if (score > prevHighScore) {
    localStorage.setItem(highScoreKey, score);
    newBest = true;
  }
  updateHighScoreDisplay();

  endgameElement.innerHTML = `
    <h1>Time ran out</h1>
    <p>Your final score is ${score}<br/>
    ${
      newBest
        ? `🎉 New Best for ${difficulty}! 🎉`
        : `Best (${difficulty}): ${getHighScore()}`
    }</p>
    <button id="play-again-btn">Play Again</button>
  `;
  endgameElement.style.display = "flex";
  document
    .getElementById("play-again-btn")
    .addEventListener("click", resetGame);
}

function resetGame() {
  score = 0;
  time = 10;
  scoreElement.innerText = score;
  timeElement.innerText = time + "s";
  endgameElement.style.display = "none";
  addWordToDom();
  text.value = "";
  updateHighScoreDisplay();
  showCountdown(() => {
    text.focus();
    startTimer();
  });
}

// Add a High Score Feature
function getHighScore() {
  return parseInt(localStorage.getItem(`highscore-${difficulty}`)) || 0;
}

function updateHighScoreDisplay() {
  highScoreElement.innerText = getHighScore();
  highScoreDifficultyElement.innerText = difficulty;
}

// Implement a Countdown Before Start
function showCountdown(onDone) {
  word.style.visibility = "hidden";
  let count = 3;
  overlay.style.display = "grid";
  number.innerText = count;
  const timer = setInterval(() => {
    number.innerText = --count;
    if (count === 0) {
      clearInterval(timer);
      overlay.style.display = "none";
      word.style.visibility = "visible";
      onDone();
    }
  }, 1000);
}

text.addEventListener("input", (e) => {
  const insertedText = e.target.value;
  if (insertedText === randomWord) {
    e.target.value = "";
    addWordToDom();
    updateScore();
    if (difficulty === "hard") time += 2;
    else if (difficulty === "medium") time += 3;
    else time += 5;
    updateTime();
  }
});

settingsButton.addEventListener("click", () =>
  settings.classList.toggle("hide")
);
settingsForm.addEventListener("change", (e) => {
  difficulty = e.target.value;
  localStorage.setItem("difficulty", difficulty);
  updateHighScoreDisplay();
});

// Init
initGame();
