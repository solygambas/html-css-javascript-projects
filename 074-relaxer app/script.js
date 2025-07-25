const container = document.getElementById("container");
const text = document.getElementById("text");
const toggle = document.getElementById("toggle-btn");
const pointerContainer = document.getElementById("pointer-container");
const presetSelect = document.getElementById("preset-select");

// The 4-7-8 breathing technique: https://www.medicalnewstoday.com/articles/324417
// const totalTime = 19000;
// const breatheTime = 4000;
// const holdTime = 7000;

// Make Breathing Presets Selectable
const presets = {
  "4-7-8": { breathe: 4000, hold: 7000, exhale: 8000 },
  "4-4-4": { breathe: 4000, hold: 4000, exhale: 4000 },
  "4-4-6": { breathe: 4000, hold: 4000, exhale: 6000 },
  "6-3-6": { breathe: 6000, hold: 3000, exhale: 6000 },
};

let breatheTime = presets["4-7-8"].breathe;
let holdTime = presets["4-7-8"].hold;
let exhaleTime = presets["4-7-8"].exhale;
let totalTime = breatheTime + holdTime + exhaleTime;

let breathInterval = null;
let holdTimeout = null;
let shrinkTimeout = null;

// Synchronize Pointer Animation
// document.documentElement.style.setProperty(
//   "--total-time",
//   `${totalTime / 1000}s`
// );

function updateTimings(presetKey) {
  const preset = presets[presetKey];
  breatheTime = preset.breathe;
  holdTime = preset.hold;
  exhaleTime = preset.exhale;
  totalTime = breatheTime + holdTime + exhaleTime;
  document.documentElement.style.setProperty(
    "--total-time",
    `${totalTime / 1000}s`
  );
  updateGradientStops();
}

// Sync Conic Gradient with Preset Timings
function updateGradientStops() {
  const breathePercent = (breatheTime / totalTime) * 100;
  const holdPercent = (holdTime / totalTime) * 100;
  const breatheEnd = breathePercent;
  const holdEnd = breathePercent + holdPercent;
  document.documentElement.style.setProperty("--breathe-end", `${breatheEnd}%`);
  document.documentElement.style.setProperty("--hold-end", `${holdEnd}%`);
}

function breatheAnimation() {
  // Refactor Animation Durations
  container.style.setProperty("--grow-duration", `${breatheTime / 1000}s`);
  text.innerText = "Breathe In!";
  container.className = "container grow";

  holdTimeout = setTimeout(() => {
    text.innerText = "Hold";

    shrinkTimeout = setTimeout(() => {
      container.style.setProperty(
        "--shrink-duration",
        // `${(totalTime - breatheTime - holdTime) / 1000}s`
        `${exhaleTime / 1000}s`
      );
      text.innerText = "Breathe Out!";
      container.className = "container shrink";
    }, holdTime);
  }, breatheTime);
}

// Add a Start/Stop Button
function startBreathing() {
  pointerContainer.classList.remove("paused");
  pointerContainer.style.animation = "none";
  void pointerContainer.offsetWidth;
  pointerContainer.style.animation = "";
  breatheAnimation();
  breathInterval = setInterval(breatheAnimation, totalTime);
}

function stopBreathing() {
  clearInterval(breathInterval);
  clearTimeout(holdTimeout);
  clearTimeout(shrinkTimeout);
  breathInterval = null;
  holdTimeout = null;
  shrinkTimeout = null;
  pointerContainer.classList.add("paused");
}

toggle.addEventListener("click", () => {
  if (breathInterval) {
    stopBreathing();
    toggle.textContent = "Start";
  } else {
    startBreathing();
    toggle.textContent = "Stop";
  }
});

presetSelect.addEventListener("change", (e) => {
  stopBreathing();
  updateTimings(e.target.value);
  startBreathing();
});

// Init
startBreathing();
