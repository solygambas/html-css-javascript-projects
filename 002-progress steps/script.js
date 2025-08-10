const progress = document.getElementById("progress");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
const steps = document.querySelectorAll(".step");

let currentActive = 1;

next.addEventListener("click", () => {
  currentActive++;
  if (currentActive > steps.length) currentActive = steps.length;
  update();
});

prev.addEventListener("click", () => {
  currentActive--;
  if (currentActive < 1) currentActive = 1;
  update();
});

const update = () => {
  steps.forEach((step, index) => {
    if (index < currentActive) step.classList.add("active");
    else step.classList.remove("active");
  });
  const actives = document.querySelectorAll(".active");
  progress.style.width =
    ((actives.length - 1) / (steps.length - 1)) * 100 + "%";
  if (currentActive === 1) prev.disabled = true;
  else if (currentActive === steps.length) next.disabled = true;
  else {
    prev.disabled = false;
    next.disabled = false;
  }
};
