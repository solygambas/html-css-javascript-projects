const balance = document.getElementById("balance");
const moneyPlus = document.getElementById("money-plus");
const moneyMinus = document.getElementById("money-minus");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");
const notification = document.getElementById("notification");
const chartCanvas = document.getElementById("financeChart");
const financeChartCtx = chartCanvas.getContext("2d");
const overviewTitle = document.getElementById("overview");
const historyTitle = document.getElementById("history");

// const dummyTransactions = [
//   { id: 1, text: "Flower", amount: -20 },
//   { id: 2, text: "Salary", amount: 300 },
//   { id: 3, text: "Book", amount: -10 },
//   { id: 4, text: "Camera", amount: 150 },
// ];

// let transactions = dummyTransactions;

const localStorageTransactions = JSON.parse(
  localStorage.getItem("transactions")
);
let transactions =
  localStorageTransactions !== null ? localStorageTransactions : [];
let editTransactionId = null;
// Implement Currency Formatting
const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});
let financeChart = null;

function updateLocaleStorage() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

function showNotification() {
  notification.classList.add("show");
  setTimeout(() => {
    notification.classList.remove("show");
  }, 2000);
}

function generateID() {
  return Math.floor(Math.random() * 100000000);
}

function addTransaction(e) {
  e.preventDefault();
  if (text.value.trim() === "" || amount.value.trim() === "") {
    showNotification();
    return;
  }
  if (editTransactionId !== null) {
    const transaction = transactions.find(
      (transaction) => transaction.id === editTransactionId
    );
    if (transaction) {
      transaction.text = text.value;
      transaction.amount = +amount.value;
    }
    editTransactionId = null;
    form.querySelector(".btn").textContent = "Add transaction";
  } else {
    transactions.push({
      id: generateID(),
      text: text.value,
      amount: +amount.value,
    });
  }
  updateLocaleStorage();
  init();
  text.value = "";
  amount.value = "";
}

function editTransaction(id) {
  const transaction = transactions.find((transaction) => transaction.id === id);
  if (transaction) {
    text.value = transaction.text;
    amount.value = transaction.amount;
    editTransactionId = id;
    form.querySelector(".btn").textContent = "Update transaction";
  }
}

function addTransactionDOM(transaction) {
  const sign = transaction.amount < 0 ? "-" : "+";
  const item = document.createElement("li");
  item.classList.add(sign === "+" ? "plus" : "minus");
  // Add an Edit Feature for Transactions
  item.innerHTML = `
          ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span
          >
          <button class="edit-btn" onclick="editTransaction(${
            transaction.id
          })"><i class="fa fa-edit"></i></button>
          <button class="delete-btn" onclick="removeTransaction(${
            transaction.id
          })"><i class="fa fa-times"></i></button>
    `;
  list.appendChild(item);
}

// Refactor updateValues for Clarity
function calculateTotal() {
  return transactions
    .map((transaction) => transaction.amount)
    .reduce((acc, value) => acc + value, 0)
    .toFixed(2);
}

function calculateIncome() {
  return transactions
    .map((transaction) => transaction.amount)
    .filter((value) => value > 0)
    .reduce((acc, value) => acc + value, 0)
    .toFixed(2);
}

function calculateExpenses() {
  return (
    transactions
      .map((transaction) => transaction.amount)
      .filter((value) => value < 0)
      .reduce((acc, value) => acc + value, 0) * -1
  ).toFixed(2);
}

function updateValues() {
  const total = calculateTotal();
  const income = calculateIncome();
  const expense = calculateExpenses();
  balance.innerText = formatter.format(total);
  moneyPlus.innerText = formatter.format(income);
  moneyMinus.innerText = formatter.format(expense);
  showChart(income, expense);
}

function showHistory() {
  if (transactions.length === 0) {
    historyTitle.style.display = "none";
    return;
  }
  historyTitle.style.display = "block";
}

// Add Data Visualization with a Chart
function showChart(income, expense) {
  // Hide the History and Overview sections
  if (transactions.length === 0) {
    chartCanvas.style.display = "none";
    overviewTitle.style.display = "none";
    return;
  } else {
    chartCanvas.style.display = "block";
    overviewTitle.style.display = "block";
  }

  const data = {
    labels: ["Income", "Expenses"],
    datasets: [
      {
        data: [income, expense],
        backgroundColor: ["#2ecc71", "#c0392b"],
      },
    ],
  };

  if (financeChart) {
    financeChart.data = data;
    financeChart.update();
  } else {
    financeChart = new Chart(financeChartCtx, {
      type: "pie",
      data: data,
      options: {
        responsive: false,
        plugins: {
          legend: {
            position: "bottom",
            labels: {
              color: "#393a57",
            },
          },
        },
      },
    });
  }
}

// Init
function init() {
  list.innerHTML = "";
  transactions.forEach(addTransactionDOM);
  updateValues();
  showHistory();
}

init();

form.addEventListener("submit", addTransaction);
