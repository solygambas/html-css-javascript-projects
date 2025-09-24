const wordElement = document.getElementById("word");
const wrongLettersElement = document.getElementById("wrong-letters");
const playAgainButton = document.getElementById("play-button");
const popup = document.getElementById("popup-container");
const notification = document.getElementById("notification-container");
const finalMessage = document.getElementById("final-message");
const finalMessageRevealWord = document.getElementById(
  "final-message-reveal-word"
);
const figureParts = document.querySelectorAll(".figure-part");
const keyboardContainer = document.getElementById("keyboard-container");
const hintButton = document.getElementById("hint-button");
const categorySelect = document.getElementById("category-select");

const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

let selectedWord = "";
let cachedCategory = "";
let cachedWords = [];

let playable = true;

const correctLetters = [];
const wrongLetters = [];

// Fetch Words from an API
// async function getRandomWord() {
//   const response = await fetch("https://random-word-api.herokuapp.com/word");
//   const data = await response.json();
//   return data[0].toLowerCase();
// }

// Add Word Categories
async function getRandomWord() {
  const category = categorySelect.value;
  if (!category) {
    const response = await fetch("https://random-word-api.herokuapp.com/word");
    const data = await response.json();
    return data[0].toLowerCase();
  }

  if (category !== cachedCategory || cachedWords.length === 0) {
    const response = await fetch(
      `https://api.datamuse.com/words?ml=${category}&max=20`
    );
    const data = await response.json();
    cachedWords = data
      .map((w) => w.word.toLowerCase())
      .filter((word) => !word.includes(" "));
    cachedCategory = category;
  }

  return cachedWords[Math.floor(Math.random() * cachedWords.length)];
}

async function startGame() {
  selectedWord = await getRandomWord();
  correctLetters.splice(0);
  wrongLetters.splice(0);
  displayWord();
  updateWrongLettersElement();
  popup.style.display = "none";
  createKeyboard();
  hintButton.disabled = false;
}

function displayWord() {
  wordElement.innerHTML = `
    ${selectedWord
      .split("") // to array
      .map(
        (letter) => `
    <span class="letter">
    ${correctLetters.includes(letter) ? letter : ""}
    </span>
    `
      )
      .join("")} 
    `; // to string
  const innerWord = wordElement.innerText.replace(/\n/g, "");
  if (innerWord === selectedWord) {
    finalMessage.innerText = "Congratulations! You won! 😃";
    finalMessageRevealWord.innerText = "";
    popup.style.display = "flex";
    playable = false;
  }
}

function updateWrongLettersElement() {
  wrongLettersElement.innerHTML = `
  ${wrongLetters.length > 0 ? "<p>Wrong</p>" : ""}
  ${wrongLetters.map((letter) => `<span>${letter}</span>`)}
  `;
  figureParts.forEach((part, index) => {
    const errors = wrongLetters.length;
    index < errors
      ? (part.style.display = "block")
      : (part.style.display = "none");
  });
  hintButton.disabled = figureParts.length - wrongLetters.length === 1;
  if (wrongLetters.length === figureParts.length) {
    finalMessage.innerText = "Unfortunately you lost. 😕";
    finalMessageRevealWord.innerText = `...the word was: ${selectedWord}`;
    popup.style.display = "flex";
    playable = false;
  }
}

function showNotification() {
  notification.classList.add("show");
  setTimeout(() => {
    notification.classList.remove("show");
  }, 2000);
}

// Allow On-Screen Keyboard Input
function createKeyboard() {
  keyboardContainer.innerHTML = "";
  alphabet.forEach((letter) => {
    const letterButton = document.createElement("button");
    letterButton.textContent = letter;
    letterButton.setAttribute("data-letter", letter);
    letterButton.disabled =
      correctLetters.includes(letter) || wrongLetters.includes(letter);
    keyboardContainer.appendChild(letterButton);
  });
}

function handleLetterInput(letter) {
  if (letter >= "a" && letter <= "z") {
    if (selectedWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);
        displayWord();
      } else {
        showNotification();
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);
        updateWrongLettersElement();
      } else {
        showNotification();
      }
    }
    createKeyboard();
  }
}

playAgainButton.addEventListener("click", () => {
  playable = true;
  startGame();
});

keyboardContainer.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON" && playable) {
    const letter = e.target.getAttribute("data-letter");
    handleLetterInput(letter);
  }
});

window.addEventListener("keypress", (e) => {
  if (playable) {
    handleLetterInput(e.key.toLowerCase());
  }
});

// Add a Hint Feature
hintButton.addEventListener("click", () => {
  if (!playable) return;
  const unguessed = [...new Set(selectedWord)].filter(
    (letter) => !correctLetters.includes(letter)
  );
  if (unguessed.length) {
    correctLetters.push(
      unguessed[Math.floor(Math.random() * unguessed.length)]
    );
    displayWord();
    createKeyboard();
    hintButton.disabled = true;
    if (playable) {
      wrongLetters.push("?");
      updateWrongLettersElement();
    }
  }
});

categorySelect.addEventListener("change", () => {
  playable = true;
  startGame();
});

// Init
startGame();
