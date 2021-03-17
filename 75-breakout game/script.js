const rulesButton = document.getElementById("rules-btn");
const closeButton = document.getElementById("close-btn");
const rules = document.getElementById("rules");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Event Listeners
rulesButton.addEventListener("click", () => rules.classList.add("show"));
closeButton.addEventListener("click", () => rules.classList.remove("show"));
