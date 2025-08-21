const toggles = document.querySelectorAll(".toggle");
const good = document.getElementById("good");
const cheap = document.getElementById("cheap");
const fast = document.getElementById("fast");
const selection = document.getElementById("selection");

// Manage State with an Object
let state = { good: false, cheap: false, fast: false };

// Add a Visual Indicator for Disabled Option
const highlight = (toggle) => {
  toggle.classList.add("highlight");
  setTimeout(() => toggle.classList.remove("highlight"), 400);
};

const uncheckToggle = (toggle) => {
  toggle.checked = false;
  state[toggle.id] = false;
  highlight(toggle.parentElement);
};

const doTheTrick = (theClickedOne) => {
  if (state.good && state.cheap && state.fast) {
    if (good === theClickedOne) uncheckToggle(fast);
    if (cheap === theClickedOne) uncheckToggle(good);
    if (fast === theClickedOne) uncheckToggle(cheap);
  }
  updateSelectionMessage();
};

// Display the Current Selection
const updateSelectionMessage = () => {
  const selected = [];
  if (state.good) selected.push("Good");
  if (state.cheap) selected.push("Cheap");
  if (state.fast) selected.push("Fast");

  if (selected.length === 2) {
    selection.textContent = `You chose: ${selected[0]} and ${selected[1]}`;
  } else if (selected.length === 1) {
    selection.textContent = `You chose: ${selected[0]}`;
  } else {
    selection.textContent = "You haven't chosen two options yet.";
  }
};

toggles.forEach((toggle) =>
  toggle.addEventListener("change", (e) => {
    state[e.target.id] = e.target.checked;
    doTheTrick(e.target);
  })
);
