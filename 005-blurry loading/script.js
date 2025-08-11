const loadText = document.querySelector(".loading-text");
const bg = document.querySelector(".bg");

let load = 0;

const blurring = () => {
  load++;
  if (load > 99) clearInterval(int);
  loadText.innerText = `${load}%`;
  // Control When the Loading Text Fades Out
  loadText.style.opacity = scale(load, 0, 50, 1, 0);
  // loadText.style.opacity = scale(load, 0, 90, 1, 0);
  // Change the Initial Blur Amount
  bg.style.filter = `blur(${scale(load, 0, 100, 10, 0)}px)`;
};

// For reference: https://stackoverflow.com/questions/10756313/javascript-jquery-map-a-range-of-numbers-to-another-range-of-numbers
const scale = (num, in_min, in_max, out_min, out_max) => {
  return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
};

// Adjust the Loading Speed
let int = setInterval(blurring, 10);
