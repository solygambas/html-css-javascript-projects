const currencyOne = document.getElementById("currency-one");
const amountOne = document.getElementById("amount-one");
const currencyTwo = document.getElementById("currency-two");
const amountTwo = document.getElementById("amount-two");
const rate = document.getElementById("rate");
const swap = document.getElementById("swap");

// function calculate() {
//   // Show a Loading State
//   rate.innerText = "Calculating...";
//   const currency_one = currencyOne.value;
//   const currency_two = currencyTwo.value;
//   // Cache API Results in sessionStorage
//   const cached = sessionStorage.getItem(currency_one);

//   if (cached) {
//     const data = JSON.parse(cached);
//     const currentRate = data.rates[currency_two];
//     rate.innerText = `1 ${currency_one} = ${currentRate} ${currency_two}`;
//     amountTwo.value = (amountOne.value * currentRate).toFixed(2);
//   } else {
//     fetch(`https://api.exchangerate-api.com/v4/latest/${currency_one}`)
//       .then((res) => res.json())
//       .then((data) => {
//         sessionStorage.setItem(currency_one, JSON.stringify(data));
//         const currentRate = data.rates[currency_two];
//         rate.innerText = `1 ${currency_one} = ${currentRate} ${currency_two}`;
//         amountTwo.value = (amountOne.value * currentRate).toFixed(2);
//       })
//       // Add Error Handling for API Requests
//       .catch(() => {
//         rate.innerText = "Error: Could not fetch exchange rates.";
//         amountTwo.value = "0.00";
//       });
//   }
// }

// Refactor to Use async/await
async function calculate() {
  // Show a Loading State
  rate.innerText = "Calculating...";
  const currency_one = currencyOne.value;
  const currency_two = currencyTwo.value;
  // Cache API Results in sessionStorage
  const cached = sessionStorage.getItem(currency_one);

  try {
    let data;
    if (cached) {
      data = JSON.parse(cached);
    } else {
      const res = await fetch(
        `https://api.exchangerate-api.com/v4/latest/${currency_one}`
      );
      data = await res.json();
      sessionStorage.setItem(currency_one, JSON.stringify(data));
    }
    const currentRate = data.rates[currency_two];
    rate.innerText = `1 ${currency_one} = ${currentRate} ${currency_two}`;
    amountTwo.value = (amountOne.value * currentRate).toFixed(2);
    // Add Error Handling for API Requests
  } catch (error) {
    rate.innerText = "Error: Could not fetch exchange rates.";
    amountTwo.value = "0.00";
  }
}

currencyOne.addEventListener("change", calculate);
amountOne.addEventListener("input", calculate);
currencyTwo.addEventListener("change", calculate);
amountTwo.addEventListener("input", calculate);

swap.addEventListener("click", () => {
  const storedValue = currencyOne.value;
  currencyOne.value = currencyTwo.value;
  currencyTwo.value = storedValue;
  calculate();
});

calculate();
