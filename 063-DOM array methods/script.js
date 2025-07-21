const main = document.getElementById("main");
const addUserButton = document.getElementById("add-user");
const doubleButton = document.getElementById("double");
const showMillionairesButton = document.getElementById("show-millionaires");
const sortButton = document.getElementById("sort");
const calculateWealthButton = document.getElementById("calculate-wealth");
const resetButton = document.getElementById("reset");
const customUserForm = document.getElementById("custom-user-form");
const customNameInput = document.getElementById("custom-name");
const customMoneyInput = document.getElementById("custom-money");

let data = [];
let originalData = [];

async function getRandomUser() {
  const res = await fetch("https://randomuser.me/api");
  const data = await res.json();
  const user = data.results[0];
  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
  };
  addData(newUser);
  originalData.push(newUser);
}

function addData(user) {
  data.push(user);
  updateDOM();
}

// Add a Reset Button
function resetData() {
  data = [...originalData];
  updateDOM();
}

// Implement an "Add Custom User" Feature
function addCustomUser(e) {
  e.preventDefault();
  const name = customNameInput.value.trim();
  const money = Number(customMoneyInput.value);

  if (!name || isNaN(money) || money < 0) {
    alert("Please enter a valid name and a non-negative number for wealth.");
    return;
  }

  const newUser = { name, money };
  addData(newUser);

  customUserForm.reset();
}

// forEach()
// function updateDOM(providedData = data) {
//   main.innerHTML = "<h2><strong>Person</strong> Wealth</h2>";
//   providedData.forEach((person) => {
//     const element = document.createElement("div");
//     element.classList.add("person");
//     element.innerHTML = `<strong>${person.name}</strong> ${formatMoney(
//       person.money
//     )}`;
//     main.appendChild(element);
//   });
// }

// Refactor updateDOM for Performance
function updateDOM(providedData = data) {
  const fragment = document.createDocumentFragment();
  const header = document.createElement("h2");
  header.innerHTML = "<strong>Person</strong> Wealth";
  fragment.appendChild(header);

  providedData.forEach((person) => {
    const element = document.createElement("div");
    element.classList.add("person");
    element.innerHTML = `<strong>${person.name}</strong> ${formatMoney(
      person.money
    )}`;
    fragment.appendChild(element);
  });

  main.innerHTML = "";
  main.appendChild(fragment);
}

// Format number as money - https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-string
function formatMoney(number) {
  return "$" + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}

// map()
function doubleMoney() {
  data = data.map((user) => {
    return { ...user, money: user.money * 2 };
  });
  updateDOM();
}

// sort()
function sortByRichest() {
  data.sort((a, b) => b.money - a.money);
  updateDOM();
}

// filter()
function showMillionaires() {
  data = data.filter((user) => user.money > 1000000);
  updateDOM();
}

// reduce()
function calculateWealth() {
  const wealth = data.reduce(
    (accumulator, user) => (accumulator += user.money),
    0
  );
  // Prevent Duplicate Wealth Calculation
  let wealthElement = document.getElementById("total-wealth");
  if (!wealthElement) {
    wealthElement = document.createElement("div");
    wealthElement.id = "total-wealth";
    main.appendChild(wealthElement);
  }
  wealthElement.innerHTML = `<h3>Total wealth: <strong>${formatMoney(
    wealth
  )}</strong></h3>`;
}

addUserButton.addEventListener("click", getRandomUser);
doubleButton.addEventListener("click", doubleMoney);
sortButton.addEventListener("click", sortByRichest);
showMillionairesButton.addEventListener("click", showMillionaires);
calculateWealthButton.addEventListener("click", calculateWealth);
resetButton.addEventListener("click", resetData);
customUserForm.addEventListener("submit", addCustomUser);

// Init
getRandomUser();
getRandomUser();
getRandomUser();
