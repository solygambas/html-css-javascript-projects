const smallCups = document.querySelectorAll(".cup-small");
const liters = document.getElementById("liters");
const percentage = document.getElementById("percentage");
const remained = document.getElementById("remained");

const savedFullCups = localStorage.getItem("fullCups") || 0;

const updateBigCup = () => {
  const fullCups = document.querySelectorAll(".cup-small.full").length;
  const totalCups = smallCups.length;
  if (fullCups === 0) {
    percentage.style.visibility = "hidden";
    percentage.style.height = 0;
  } else {
    percentage.style.visibility = "visible";
    percentage.style.height = `${(fullCups / totalCups) * 330}px`;
    percentage.innerText = `${Math.round((fullCups / totalCups) * 100)}%`;
  }
  if (fullCups === totalCups) {
    remained.style.visibility = "hidden";
    remained.style.height = 0;
  } else {
    percentage.style.visibility = "visible";
    // Fix the Remaining Water Display Bug
    remained.style.visibility = "visible";
    remained.style.height = "auto";
    // Update the Daily Goal
    liters.innerText = `${3 - (250 * fullCups) / 1000}L`;
  }
};

const highlightCups = (index) => {
  if (index === 7 && smallCups[index].classList.contains("full")) index--;
  if (
    smallCups[index].classList.contains("full") &&
    !smallCups[index].nextElementSibling.classList.contains("full")
  ) {
    index--;
  }
  smallCups.forEach((cup, index2) => {
    if (index2 <= index) cup.classList.add("full");
    else cup.classList.remove("full");
  });
  updateBigCup();
  // Save Progress with Local Storage
  localStorage.setItem("fullCups", index);
};

smallCups.forEach((cup, index) =>
  cup.addEventListener("click", () => highlightCups(index))
);

updateBigCup();

if (savedFullCups) {
  highlightCups(+savedFullCups);
}
