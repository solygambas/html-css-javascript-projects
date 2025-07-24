const cardsContainer = document.getElementById("cards-container");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const currentElement = document.getElementById("current");
const showButton = document.getElementById("show");
const hideButton = document.getElementById("hide");
const questionElement = document.getElementById("question");
const answerElement = document.getElementById("answer");
const addCardButton = document.getElementById("add-card");
const clearButton = document.getElementById("clear");
const addContainer = document.getElementById("add-container");
const navigation = document.getElementById("navigation");
const knewButton = document.getElementById("knew");
const didntKnowButton = document.getElementById("didnt-know");
const showMainDeckButton = document.getElementById("show-main");
const showUnknownDeckButton = document.getElementById("show-unknown");
const showKnownDeckButton = document.getElementById("show-known");

let cardsData = getCardsData();
let knownCards = getKnownCards();
let unknownCards = getUnknownCards();
let currentActiveCard = 0;
let currentDeck = "main";
const cardsElement = [];
// const cardsData = [
//   {
//     question: "What does CSS stand for?",
//     answer: "Cascading Style Sheets",
//   },
//   {
//     question: "What year was JavaScript launched?",
//     answer: "1995",
//   },
//   {
//     question: "What does HTML stand for?",
//     answer: "Hypertext Markup Language",
//   },
//   {
//     question: "Which HTML tag is used to create a hyperlink?",
//     answer: "&lt;a&gt;",
//   },
//   {
//     question: "Which CSS property changes the text color?",
//     answer: "color",
//   },
//   {
//     question: "Which JavaScript method is used to select an element by its ID?",
//     answer: "document.getElementById",
//   },
// ];

function createCards() {
  cardsContainer.innerHTML = "";
  cardsElement.length = 0;
  cardsData.forEach((data) => createCard(data));
  updateCardPositions();
  updateReviewButtons();
  updateCurrentText();
  navigation.style.display = cardsData.length === 0 ? "none" : "flex";
}

function createCard(data) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.innerHTML = `
    <div class="inner-card">
        <div class="inner-card-front">
        <p>${data.question}</p>
    </div>
    <div class="inner-card-back">
        <p>${data.answer}</p>
    </div>
    </div>
  `;
  card.addEventListener("click", () => card.classList.toggle("show-answer"));
  cardsElement.push(card);
  cardsContainer.appendChild(card);
}

function updateCurrentText() {
  currentElement.innerText = `${currentActiveCard + 1}/${cardsElement.length}`;
}

// Enable localStorage
function getCardsData() {
  const cards = JSON.parse(localStorage.getItem("cards"));
  return cards === null ? [] : cards;
}

function setCardsData(cards) {
  localStorage.setItem("cards", JSON.stringify(cards));
}

function getKnownCards() {
  return JSON.parse(localStorage.getItem("knownCards")) || [];
}
function setKnownCards(cards) {
  localStorage.setItem("knownCards", JSON.stringify(cards));
}
function getUnknownCards() {
  return JSON.parse(localStorage.getItem("unknownCards")) || [];
}
function setUnknownCards(cards) {
  localStorage.setItem("unknownCards", JSON.stringify(cards));
}

// Fix Card Navigation
function updateCardPositions() {
  cardsElement.forEach((card, index) => {
    card.classList.remove("active", "left", "right", "far-left", "far-right");

    const position = index - currentActiveCard;
    const totalCards = cardsElement.length;

    switch (position) {
      case 0:
        card.classList.add("active");
        break;
      case -1:
      case totalCards - 1:
        card.classList.add("left");
        break;
      case 1:
      case -(totalCards - 1):
        card.classList.add("right");
        break;
      default:
        if (position < 0) {
          card.classList.add("far-left");
        } else {
          card.classList.add("far-right");
        }
    }
  });
}

function updateReviewButtons() {
  if (currentDeck === "main") {
    knewButton.disabled = false;
    didntKnowButton.disabled = false;
  } else if (currentDeck === "known") {
    knewButton.disabled = true;
    didntKnowButton.disabled = false;
  } else if (currentDeck === "unknown") {
    knewButton.disabled = false;
    didntKnowButton.disabled = true;
  }
  if (cardsData.length === 0) {
    knewButton.disabled = true;
    didntKnowButton.disabled = true;
  }
}

// Event Listeners
nextButton.addEventListener("click", () => {
  currentActiveCard = (currentActiveCard + 1) % cardsElement.length;
  updateCardPositions();
  updateCurrentText();
});

prevButton.addEventListener("click", () => {
  currentActiveCard =
    currentActiveCard === 0 ? cardsElement.length - 1 : currentActiveCard - 1;
  updateCardPositions();
  updateCurrentText();
});

showButton.addEventListener("click", () => addContainer.classList.add("show"));
hideButton.addEventListener("click", () =>
  addContainer.classList.remove("show")
);

addCardButton.addEventListener("click", () => {
  const question = questionElement.value;
  const answer = answerElement.value;
  if (question.trim() && answer.trim()) {
    const newCard = { question, answer };
    cardsData.push(newCard);
    setCardsData(cardsData);
    createCards();
    questionElement.value = "";
    answerElement.value = "";
    addContainer.classList.remove("show");
  }
});

clearButton.addEventListener("click", () => {
  localStorage.clear();
  cardsData = [];
  cardsContainer.innerHTML = "";
  currentElement.innerText = "";
  setCardsData(cardsData);
});

// Add Keyboard Navigation
document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") {
    prevButton.click();
  } else if (event.key === "ArrowRight") {
    nextButton.click();
  } else if (event.key === " ") {
    event.preventDefault();
    const activeCard = document.querySelector(".card.active");
    if (activeCard) {
      activeCard.classList.toggle("show-answer");
    }
  }
});

// Implement "Known" and "Unknown" Piles
function isDuplicate(card, array) {
  return array.some(
    (c) => c.question === card.question && c.answer === card.answer
  );
}

knewButton.addEventListener("click", () => {
  if (cardsData.length > 0) {
    const [card] = cardsData.splice(currentActiveCard, 1);
    if (!isDuplicate(card, knownCards)) {
      knownCards.push(card);
    }
    setCardsData(cardsData);
    setKnownCards(knownCards);
    createCards();
  }
});

didntKnowButton.addEventListener("click", () => {
  if (cardsData.length > 0) {
    const [card] = cardsData.splice(currentActiveCard, 1);
    if (!isDuplicate(card, unknownCards)) {
      unknownCards.push(card);
    }
    setCardsData(cardsData);
    setUnknownCards(unknownCards);
    createCards();
  }
});

showMainDeckButton.addEventListener("click", () => {
  cardsData = getCardsData();
  currentDeck = "main";
  currentActiveCard = 0;
  createCards();
  updateReviewButtons();
});

showUnknownDeckButton.addEventListener("click", () => {
  cardsData = getUnknownCards();
  currentDeck = "unknown";
  currentActiveCard = 0;
  createCards();
  updateReviewButtons();
});

showKnownDeckButton.addEventListener("click", () => {
  cardsData = getKnownCards();
  currentDeck = "known";
  currentActiveCard = 0;
  createCards();
  updateReviewButtons();
});

// Init
createCards();
