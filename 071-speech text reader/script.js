const main = document.querySelector("main");
const voicesSelect = document.getElementById("voices");
const textarea = document.getElementById("text");
const imageUrlInput = document.getElementById("image-url");
const readButton = document.getElementById("read");
const stopButton = document.getElementById("stop");
const toggleButton = document.getElementById("toggle");
const closeButton = document.getElementById("close");
const addButton = document.getElementById("add-dashboard");
const textBox = document.getElementById("text-box");

const data = JSON.parse(localStorage.getItem("dashboardData")) || [
  {
    image: "drink",
    text: "I'm Thirsty",
  },
  {
    image: "food",
    text: "I'm Hungry",
  },
  {
    image: "tired",
    text: "I'm Tired",
  },
  {
    image: "hurt",
    text: "I'm Hurt",
  },
  {
    image: "happy",
    text: "I'm Happy",
  },
  {
    image: "angry",
    text: "I'm Angry",
  },
  {
    image: "sad",
    text: "I'm Sad",
  },
  {
    image: "scared",
    text: "I'm Scared",
  },
  {
    image: "outside",
    text: "I Want To Go Outside",
  },
  {
    image: "home",
    text: "I Want To Go Home",
  },
  {
    image: "school",
    text: "I Want To Go To School",
  },
  {
    image: "grandma",
    text: "I Want To Go To Grandmas",
  },
];
let voices = [];

function createBox(item) {
  const box = document.createElement("div");
  const { image, text } = item;
  const imgSrc = image.startsWith("http")
    ? image
    : `https://github.com/bradtraversy/vanillawebprojects/blob/master/speech-text-reader/img/${image}.jpg?raw=true`;
  box.classList.add("box");
  box.innerHTML = `
    <img src='${imgSrc}' alt="${text}"/>
    <p class="info">${text}</p>
    `;
  box.addEventListener("click", () => handleSpeech(text, box));
  main.appendChild(box);
}

function populateVoiceList() {
  voices = speechSynthesis.getVoices();
  voicesSelect.innerHTML = "";
  voices.forEach((voice) => {
    const option = document.createElement("option");
    option.value = voice.name;
    option.innerText = `${voice.name} ${voice.lang}`;
    voicesSelect.appendChild(option);
  });
}

function handleSpeech(text, box) {
  setTextMessage(text);
  speakText();

  const info = box.querySelector(".info");
  const originalContent = info.textContent;
  info.innerHTML = wrapWordsWithSpans(text);

  box.classList.add("active");
  setTimeout(() => box.classList.remove("active"), 800);

  message.onboundary = function (event) {
    if (event.name === "word") {
      highlightSpokenWord(box, event.charIndex);
    }
  };

  message.onend = message.onerror = function () {
    clearHighlights(box);
    info.textContent = originalContent;
  };
}

const message = new SpeechSynthesisUtterance();

function setTextMessage(text) {
  message.text = text;
}

function speakText() {
  speechSynthesis.speak(message);
}

function setVoice(e) {
  message.voice = voices.find((voice) => voice.name === e.target.value);
}

// Allow Custom Image Boxes
function handleAddDashboardItem() {
  const imageUrl = imageUrlInput.value.trim();
  const text = textarea.value.trim();
  if (imageUrl && text) {
    const newItem = { image: imageUrl, text };
    data.push(newItem);
    createBox(newItem);
    localStorage.setItem("dashboardData", JSON.stringify(data));
    imageUrlInput.value = "";
    textarea.value = "";
    textBox.classList.remove("show");
  } else {
    alert("Please enter both an image URL and text.");
  }
}

// Implement Speech Highlighting on Image Boxes
function wrapWordsWithSpans(text) {
  return text
    .split(/\s+/)
    .map((word) => `<span class="word">${word}</span>`)
    .join(" ");
}

function highlightSpokenWord(box, charIndex) {
  const spans = box.querySelectorAll(".word");
  let count = 0;
  for (let i = 0; i < spans.length; i++) {
    const word = spans[i].textContent;
    if (charIndex >= count && charIndex < count + word.length) {
      spans.forEach((span) => span.classList.remove("highlight"));
      spans[i].classList.add("highlight");
      break;
    }
    count += word.length + 1;
  }
}

function clearHighlights(box) {
  box
    .querySelectorAll(".word")
    .forEach((span) => span.classList.remove("highlight"));
}

// Event Listeners
toggleButton.addEventListener("click", () => {
  textBox.classList.toggle("show");
});
closeButton.addEventListener("click", () => {
  textBox.classList.remove("show");
});
speechSynthesis.addEventListener("voiceschanged", populateVoiceList);
voicesSelect.addEventListener("change", setVoice);
readButton.addEventListener("click", () => {
  setTextMessage(textarea.value);
  speakText();
});

// Add a "Stop" Button
stopButton.addEventListener("click", () => {
  speechSynthesis.cancel();
});

addButton.addEventListener("click", handleAddDashboardItem);

data.forEach(createBox);
// Refactor Voice Loading
if (speechSynthesis.getVoices().length > 0) {
  populateVoiceList();
}
