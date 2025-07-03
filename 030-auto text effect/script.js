const textElement = document.getElementById("text");
const speedElement = document.getElementById("speed");
// Change the Typing Text
// const text = "Keep calm and code on.";

// Type Multiple Phrases
const textArray = [
  "Hello, world!",
  "Practice makes perfect.",
  "Keep calm and code on.",
  "Debugging is fun.",
  "Always write clean code.",
  "Never stop learning.",
];
let phraseIndex = 0;
let index = 1;
let speed = 300 / speedElement.value;

const writeText = () => {
  // textElement.innerText = text.slice(0, index);
  // index++;
  // if (index > text.length) index = 1;
  // setTimeout(writeText, speed);
  const currentPhrase = textArray[phraseIndex];
  textElement.innerText = currentPhrase.slice(0, index);
  index++;
  if (index > currentPhrase.length) {
    phraseIndex = (phraseIndex + 1) % textArray.length;
    index = 1;
  }
  setTimeout(writeText, speed);
};

writeText();

speedElement.addEventListener("input", (e) => (speed = 300 / e.target.value));
