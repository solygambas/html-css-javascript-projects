const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
if (!SpeechRecognition) {
  document.body.innerHTML = `
    <h2>Sorry, your browser does not support Speech Recognition.</h2>
    <p>Please use Chrome or Edge for the best experience.</p>
  `;
} else {
  let messageElement;
  let randomNumber;
  let shouldRestartRecognition = true;
  let guesses = [];
  let recognition = new SpeechRecognition();
  recognition.lang = "en-US";
  recognition.start();

  function getRandomNumber() {
    return Math.floor(Math.random() * 100) + 1;
  }

  function onSpeak(event) {
    let message = event.results[0][0].transcript;
    message = message.replace(/[.,;:!?]+$/, "");
    writeMessage(message);
    checkNumber(message);
  }

  function writeMessage(message) {
    messageElement.innerHTML = `
    <div>You said: </div>
    <span class="box">${message}</span>
  `;
  }

  function checkNumber(message) {
    const number = +message;
    let feedback = "";
    if (Number.isNaN(number)) {
      feedback = "That is not a valid number";
    } else if (number > 100 || number < 1) {
      feedback = "Number must be between 1 and 100";
    } else if (number === randomNumber) {
      feedback = `Congrats! You have guessed the number! It was ${number}`;
      shouldRestartRecognition = false;
      recognition.stop();
      document.body.innerHTML = `
      <h2>${feedback}</h2>
      <button class="play-again" id="play-again">Play Again</button>
    `;
      speak(feedback);
      renderGuesses();
      document
        .getElementById("play-again")
        .addEventListener("click", setupGame);
      return;
    } else if (number > randomNumber || number < randomNumber) {
      guesses.unshift(number);
      renderGuesses();
      feedback = number > randomNumber ? "GO LOWER" : "GO HIGHER";
    }

    if (feedback) {
      messageElement.innerHTML += `<div>${feedback}</div>`;
      speak(feedback);
    }
  }

  // Add Speech Synthesis Feedback
  function speak(text) {
    speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    speechSynthesis.speak(utterance);
  }

  // Refactor Game Over Logic
  function setupGame() {
    recognition.stop();
    shouldRestartRecognition = true;
    document.body.innerHTML = `
    <img
      src="https://i.ibb.co/Kb6SkTm/8399350-mic-microphone-audio-icon.png"
      alt="Speak"
    />
    <h1>Guess a Number Between 1 - 100</h1>
    <h2>Speak the number into your microphone</h2>
    <div id="msg" class="msg"></div>
     <div id="history" class="msg"></div>
  `;
    messageElement = document.getElementById("msg");
    randomNumber = getRandomNumber();
    recognition.start();
    guesses = [];
    renderGuesses();
  }

  // Implement a Guess History
  function renderGuesses() {
    const historyDiv = document.getElementById("history");
    if (!historyDiv) return;
    historyDiv.innerHTML =
      guesses.length === 0
        ? "<div>No guesses yet.</div>"
        : `<div>Previous guesses: ${guesses.join(", ")}</div>`;
  }

  // Handle Recognition Errors
  function handleRecognitionError(e) {
    if (!messageElement) return;
    let errorMsg;
    switch (e.error) {
      case "no-speech":
        errorMsg =
          "No speech detected. Please try speaking clearly into your microphone.";
        break;
      case "audio-capture":
        errorMsg =
          "No microphone found. Please check your microphone connection.";
        shouldRestartRecognition = false;
        break;
      case "not-allowed":
        errorMsg =
          "Microphone access was denied. Please allow access and try again.";
        shouldRestartRecognition = false;
        break;
      default:
        errorMsg = `Error: ${e.error}`;
    }
    messageElement.innerHTML = `<div>${errorMsg}</div>`;
    speak(errorMsg);
  }

  // Event Listeners
  recognition.addEventListener("result", onSpeak);
  recognition.addEventListener("end", () => {
    if (shouldRestartRecognition) recognition.start();
  });
  recognition.addEventListener("error", handleRecognitionError);

  setupGame();
}
