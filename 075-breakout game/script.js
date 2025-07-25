const rulesButton = document.getElementById("rules-btn");
const closeButton = document.getElementById("close-btn");
const rules = document.getElementById("rules");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const color = getComputedStyle(document.documentElement).getPropertyValue(
  "--button-color"
);
const secondaryColor = getComputedStyle(
  document.documentElement
).getPropertyValue("--sidebar-color");

// Refactor Magic Numbers
const config = {
  ballSpeed: 4,
  ballSize: 10,
  paddleSpeed: 8,
  paddleWidth: 80,
  paddleHeight: 10,
  brickWidth: 70,
  brickHeight: 20,
  brickPadding: 10,
  brickOffsetX: 45,
  brickOffsetY: 60,
  brickRowCount: 9,
  brickColumnCount: 5,
  powerUpChance: 0.3, // 30% chance
  powerUpTypes: ["widen", "slow", "score"],
  powerUpSize: 12,
  powerUpFallSpeed: 3,
  powerUpDuration: 5000,
};

let score = 0;
// const brickRowCount = config.brickRowCount;
// const brickColumnCount = config.brickColumnCount;
const powerUps = [];
const levels = [
  // Level 1: Super Easy
  {
    brickRowCount: 2,
    brickColumnCount: 4,
    ballSpeed: 2,
  },
  // Level 2: Easy
  {
    brickRowCount: 4,
    brickColumnCount: 5,
    ballSpeed: 3,
  },
  // Level 3: Medium
  {
    brickRowCount: 6,
    brickColumnCount: 7,
    ballSpeed: 4,
  },
  // Level 4: Hard
  {
    brickRowCount: 8,
    brickColumnCount: 9,
    ballSpeed: 5,
  },
];
let currentLevel = 0;
let paused = false;
let levelMessage = "";

// Reference: https://stackoverflow.com/questions/34772957/how-to-make-canvas-responsive
// https://stackoverflow.com/questions/39771732/drawing-to-responsive-canvas-that-is-100-width-and-height
const heightRatio = 0.75;
canvas.height = canvas.width * heightRatio;
ctx.canvas.width = 800;
ctx.canvas.height = ctx.canvas.width * heightRatio;

// Elements
const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  size: config.ballSize,
  speed: config.ballSpeed,
  dx: config.ballSpeed,
  dy: -config.ballSpeed,
};

const paddle = {
  x: canvas.width / 2 - config.paddleWidth / 2,
  y: canvas.height - config.paddleHeight - 10,
  w: config.paddleWidth,
  h: config.paddleHeight,
  speed: config.paddleSpeed,
  dx: 0,
};

const brickInfo = {
  w: config.brickWidth,
  h: config.brickHeight,
  padding: config.brickPadding,
  offsetX: config.brickOffsetX,
  offsetY: config.brickOffsetY,
  visible: true,
};

const bricks = [];
// for (let i = 0; i < brickRowCount; i++) {
//   bricks[i] = [];
//   for (let j = 0; j < brickColumnCount; j++) {
//     const x = i * (brickInfo.w + brickInfo.padding) + brickInfo.offsetX;
//     const y = j * (brickInfo.h + brickInfo.padding) + brickInfo.offsetY;
//     bricks[i][j] = { x, y, ...brickInfo };
//   }
// }

// Create Elements
function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
  ctx.fillStyle = secondaryColor;
  ctx.fill();
  ctx.closePath();
}

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddle.x, paddle.y, paddle.w, paddle.h);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.closePath();
}

function drawScore() {
  ctx.font = '20px "Balsamiq Sans"';
  ctx.fillText(`Score: ${score}`, canvas.width - 100, 30);
}

function drawLevel() {
  ctx.font = '20px "Balsamiq Sans"';
  ctx.fillStyle = color;
  ctx.fillText(`Level: ${currentLevel + 1}`, 20, 30);
}

function drawLevelMessage() {
  ctx.save();
  ctx.font = '40px "Balsamiq Sans"';
  ctx.fillStyle = color;
  ctx.textAlign = "center";
  ctx.fillText(levelMessage, canvas.width / 2, canvas.height / 2);
  ctx.restore();
}

function drawBricks() {
  bricks.forEach((column) => {
    column.forEach((brick) => {
      ctx.beginPath();
      ctx.rect(brick.x, brick.y, brick.w, brick.h);
      ctx.fillStyle = brick.visible ? color : "transparent";
      ctx.fill();
      ctx.closePath();
    });
  });
}

function draw() {
  // clear
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // draw
  drawBall();
  drawPaddle();
  drawScore();
  drawLevel();
  drawBricks();
  generatePowerUps();
  if (paused && levelMessage) {
    drawLevelMessage();
  }
}

// Animate Elements
function movePaddle() {
  paddle.x += paddle.dx;
  if (paddle.x + paddle.w > canvas.width) paddle.x = canvas.width - paddle.w;
  if (paddle.x < 0) paddle.x = 0;
}

function moveBall() {
  ball.x += ball.dx;
  ball.y += ball.dy;
  // wall collision
  if (ball.x + ball.size > canvas.width || ball.x - ball.size < 0) {
    // right and left
    ball.dx *= -1;
  }
  if (ball.y + ball.size > canvas.height || ball.y - ball.size < 0) {
    // top and bottom
    ball.dy *= -1;
  }
  // paddle
  if (
    ball.x - ball.size > paddle.x &&
    ball.x + ball.size < paddle.x + paddle.w &&
    ball.y + ball.size > paddle.y
  ) {
    // Fix Ball-Paddle Collision Logic
    const dist = ball.x - (paddle.x + paddle.w / 2);
    ball.dx = dist * 0.1;
    ball.dy = -ball.speed;
  }
  // bricks
  bricks.forEach((column) => {
    column.forEach((brick) => {
      if (brick.visible) {
        if (
          ball.x - ball.size > brick.x && // left brick side check
          ball.x + ball.size < brick.x + brick.w && // right brick side check
          ball.y + ball.size > brick.y && // top brick side check
          ball.y - ball.size < brick.y + brick.h // bottom brick side check
        ) {
          ball.dy *= -1;
          brick.visible = false;
          if (Math.random() < config.powerUpChance) {
            const type =
              config.powerUpTypes[
                Math.floor(Math.random() * config.powerUpTypes.length)
              ];
            powerUps.push({
              x: brick.x + brick.w / 2,
              y: brick.y,
              type,
              active: true,
            });
          }
          increaseScore();
        }
      }
    });
  });
  // game over
  if (ball.y + ball.size > canvas.height) {
    showAllBricks();
    score = 0;
  }
}

function increaseScore() {
  score++;
  const allBricksGone = bricks.flat().every((brick) => !brick.visible);
  if (allBricksGone) {
    currentLevel++;
    if (currentLevel >= levels.length) {
      // loop back to last level
      currentLevel = levels.length - 1;
    }
    paused = true;
    levelMessage = `Level ${currentLevel + 1}`;
    setTimeout(() => {
      setupLevel(currentLevel);
      paused = false;
      levelMessage = "";
    }, 5000);
  }
}

function showAllBricks() {
  bricks.forEach((column) => {
    column.forEach((brick) => (brick.visible = true));
  });
}

// Add Power-ups
function applyPowerUp(type) {
  if (type === "widen") {
    paddle.w = 140;
    setTimeout(() => (paddle.w = config.paddleWidth), config.powerUpDuration);
  } else if (type === "slow") {
    ball.speed = 2;
    ball.dx = Math.sign(ball.dx) * ball.speed;
    ball.dy = Math.sign(ball.dy) * ball.speed;
    setTimeout(() => {
      ball.speed = config.ballSpeed;
      ball.dx = Math.sign(ball.dx) * ball.speed;
      ball.dy = Math.sign(ball.dy) * ball.speed;
    }, config.powerUpDuration);
  } else if (type === "score") {
    score += 5;
  }
}

function generatePowerUps() {
  powerUps.forEach((powerUp) => {
    if (!powerUp.active) return;
    powerUp.y += config.powerUpFallSpeed;
    // Draw power-up
    ctx.beginPath();
    ctx.arc(powerUp.x, powerUp.y, config.powerUpSize, 0, Math.PI * 2);
    ctx.fillStyle =
      powerUp.type === "widen"
        ? "#91eae4"
        : powerUp.type === "slow"
        ? "#86a8e7"
        : "#DBB957";
    ctx.fill();
    ctx.closePath();
    // Paddle collision
    if (
      powerUp.y + config.powerUpSize > paddle.y &&
      powerUp.x > paddle.x &&
      powerUp.x < paddle.x + paddle.w
    ) {
      applyPowerUp(powerUp.type);
      powerUp.active = false;
    }
    // Remove if off screen
    if (powerUp.y > canvas.height) powerUp.active = false;
  });
}

// Implement Game Levels
function setupLevel(levelIndex) {
  const level = levels[levelIndex];
  config.brickRowCount = level.brickRowCount;
  config.brickColumnCount = level.brickColumnCount;
  ball.speed = level.ballSpeed;
  ball.dx = level.ballSpeed;
  ball.dy = -level.ballSpeed;
  // Reset paddle
  paddle.x = canvas.width / 2 - config.paddleWidth / 2;
  paddle.y = canvas.height - config.paddleHeight - 10;
  paddle.w = config.paddleWidth;
  // Reset ball
  ball.x = canvas.width / 2;
  ball.y = canvas.height / 2;
  // Center bricks horizontally
  const totalBricksWidth =
    config.brickColumnCount * config.brickWidth +
    (config.brickColumnCount - 1) * config.brickPadding;
  const centeredOffsetX = (canvas.width - totalBricksWidth) / 2;
  // Rebuild bricks
  bricks.length = 0;
  for (let i = 0; i < config.brickRowCount; i++) {
    bricks[i] = [];
    for (let j = 0; j < config.brickColumnCount; j++) {
      const x = j * (brickInfo.w + brickInfo.padding) + centeredOffsetX;
      const y = i * (brickInfo.h + brickInfo.padding) + brickInfo.offsetY;
      bricks[i][j] = { x, y, w: brickInfo.w, h: brickInfo.h, visible: true };
    }
  }
}

// Handle Key Events
function keyDown(e) {
  if (e.key === "Right" || e.key === "ArrowRight") paddle.dx = paddle.speed;
  else if (e.key === "Left" || e.key === "ArrowLeft") paddle.dx = -paddle.speed;
}

function keyUp(e) {
  if (
    e.key === "Right" ||
    e.key === "ArrowRight" ||
    e.key === "Left" ||
    e.key === "ArrowLeft"
  ) {
    paddle.dx = 0;
  }
}

// Update Canvas
function update() {
  // update
  if (!paused) {
    movePaddle();
    moveBall();
  }
  // draw
  draw();
  requestAnimationFrame(update);
}

// Event Listeners
document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);
rulesButton.addEventListener("click", () => rules.classList.add("show"));
closeButton.addEventListener("click", () => rules.classList.remove("show"));

// Init
setupLevel(0);
update();
