const main = document.getElementById("main");
const addUserButton = document.getElementById("add-user");
const doubleButton = document.getElementById("double");
const showMillionairesButton = document.getElementById("show-millionaires");
const sortButton = document.getElementById("sort");
const calculateWealthButton = document.getElementById("calculate-wealth");

let data = [];

async function getRandomUser() {
  const res = await fetch("https://randomuser.me/api");
  const data = await res.json();
  const user = data.results[0];
  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
  };
  addData(newUser);
}

function addData(user) {
  data.push(user);
  updateDOM();
}

// forEach()
function updateDOM(providedData = data) {
  main.innerHTML = "<h2><strong>Person</strong> Wealth</h2>";
  providedData.forEach((person) => {
    const element = document.createElement("div");
    element.classList.add("person");
    element.innerHTML = `<strong>${person.name}</strong> ${formatMoney(
      person.money
    )}`;
    main.appendChild(element);
  });
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
  const wealthElement = document.createElement("div");
  wealthElement.innerHTML = `<h3>Total wealth: <strong>${formatMoney(
    wealth
  )}</strong></h3>`;
  main.appendChild(wealthElement);
}

addUserButton.addEventListener("click", getRandomUser);
doubleButton.addEventListener("click", doubleMoney);
sortButton.addEventListener("click", sortByRichest);
showMillionairesButton.addEventListener("click", showMillionaires);
calculateWealthButton.addEventListener("click", calculateWealth);

// Init
getRandomUser();
getRandomUser();
getRandomUser();
