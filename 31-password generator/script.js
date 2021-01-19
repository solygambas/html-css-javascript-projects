// Random functions
// fromCharCode: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/fromCharCode
// ASCII codes: https://www.w3schools.com/charsets/ref_html_ascii.asp
const randomFunctions = {
  lower: getRandomLower,
  upper: getRandomUpper,
  number: getRandomSymbol,
  symbol: getRandomSymbol,
};

const getRandomLower = () =>
  String.fromCharCode(Math.floor(Math.random() * 26) + 97);

const getRandomUpper = () =>
  String.fromCharCode(Math.floor(Math.random() * 26) + 65);

const getRandomNumber = () =>
  String.fromCharCode(Math.floor(Math.random() * 10) + 48);

const getRandomSymbol = () => {
  const symbols = "!@#$%^&*(){}[]=<>/,.";
  return symbols[Math.floor(Math.random() * symbols.length)];
};
