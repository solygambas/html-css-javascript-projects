const resultElement = document.getElementById("result");
const lengthElement = document.getElementById("length");
const uppercaseElement = document.getElementById("uppercase");
const lowercaseElement = document.getElementById("lowercase");
const numbersElement = document.getElementById("numbers");
const symbolsElement = document.getElementById("symbols");
const generateElement = document.getElementById("generate");
const clipboardElement = document.getElementById("clipboard");
const strengthElement = document.getElementById("strength");

// Random functions
// fromCharCode: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/fromCharCode
// ASCII codes: https://www.w3schools.com/charsets/ref_html_ascii.asp
const getRandomLower = () =>
  String.fromCharCode(Math.floor(Math.random() * 26) + 97);

const getRandomUpper = () =>
  String.fromCharCode(Math.floor(Math.random() * 26) + 65);

const getRandomNumber = () =>
  String.fromCharCode(Math.floor(Math.random() * 10) + 48);

const getRandomSymbol = () => {
  // Refactor Random Symbol Generation
  // const symbols = "!@#$%^&*(){}[]=<>/,.";
  const symbolCodes = [
    33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 58, 59, 60, 61,
    62, 63, 64, 91, 92, 93, 94, 95, 96, 123, 124, 125, 126,
  ];
  const symbols = String.fromCharCode(...symbolCodes);
  return symbols[Math.floor(Math.random() * symbols.length)];
};

const randomFunctions = {
  lower: getRandomLower,
  upper: getRandomUpper,
  number: getRandomSymbol,
  symbol: getRandomSymbol,
};

const createNotification = (message) => {
  const notif = document.createElement("div");
  notif.classList.add("toast");
  notif.innerText = message;
  document.body.appendChild(notif);
  setTimeout(() => notif.remove(), 3000);
};

clipboardElement.addEventListener("click", () => {
  const password = resultElement.innerText;
  if (!password) return;
  const textarea = document.createElement("textarea");
  textarea.value = password;
  document.body.appendChild(textarea);
  textarea.select();
  // Modernize Clipboard Functionality
  // document.execCommand("copy");
  navigator.clipboard
    .writeText(textarea.value)
    .then(() => {
      createNotification("Password copied to clipboard!");
    })
    .catch((err) => {
      createNotification("Failed to copy password: ", err);
    });
  textarea.remove();
});

generateElement.addEventListener("click", () => {
  // Refactor with a Configuration Object
  // const length = +lengthElement.value;
  // const hasLower = lowercaseElement.checked;
  // const hasUpper = uppercaseElement.checked;
  // const hasNumber = numbersElement.checked;
  // const hasSymbol = symbolsElement.checked;
  const settings = {
    lower: lowercaseElement.checked,
    upper: uppercaseElement.checked,
    number: numbersElement.checked,
    symbol: symbolsElement.checked,
    length: +lengthElement.value,
  };
  resultElement.innerText = generatePassword(settings);
  // Show password strength
  const { label, className } = checkPasswordStrength(settings);
  strengthElement.textContent = label;
  strengthElement.className = "strength " + className;
});

const generatePassword = ({ lower, upper, number, symbol, length }) => {
  let generatedPassword = "";
  const typesCount = lower + upper + number + symbol;
  const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(
    (item) => Object.values(item)[0]
  );
  if (typesCount === 0) return "";
  for (let i = 0; i < length; i += typesCount) {
    typesArr.forEach((type) => {
      const funcName = Object.keys(type)[0];
      generatedPassword += randomFunctions[funcName]();
    });
  }
  const finalPassword = generatedPassword.slice(0, length);
  // Shuffle the Generated Password
  const shuffled = shuffle(finalPassword.split(""));
  return shuffled.join("");
};

// Reference: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
const shuffle = (array) => {
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
};

// Add a Password Strength Indicator
function checkPasswordStrength({ lower, upper, number, symbol, length }) {
  let strength = 0;
  if (length >= 8) strength++;
  if (upper) strength++;
  if (lower) strength++;
  if (number) strength++;
  if (symbol) strength++;

  if (strength <= 2) {
    return { label: "Weak", className: "weak" };
  } else if (strength === 3 || strength === 4) {
    return { label: "Medium", className: "medium" };
  } else {
    return { label: "Strong", className: "strong" };
  }
}
