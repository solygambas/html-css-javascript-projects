const days = document.getElementById("days");
const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");
const countdown = document.getElementById("countdown");
const year = document.getElementById("year");
const loading = document.getElementById("loading");
const customDateInput = document.getElementById("custom-date");
const heading = document.getElementById("heading");

const nextYear = new Date().getFullYear() + 1;
let newYearTime = new Date(`January 01 ${nextYear} 00:00:00`);
// const newYearTime = new Date(`July 26 2025 00:00:00`);
let isCustomDate = false;

// Fix Countdown End State
// function showHappyNewYear() {
//   countdown.style.display = "none";
//   const label = "🎉 Happy New Year! 🎉";
//   heading.innerText = document.title = label;
// }

function confettiAnimation() {
  confetti({
    particleCount: 200,
    spread: 120,
    origin: { y: 0.6 },
    startVelocity: 45,
    colors: [
      "#ff0a54",
      "#ff477e",
      "#ff7096",
      "#ff85a1",
      "#fbb1b1",
      "#f9bec7",
      "#f7cad0",
      "#b5ead7",
      "#caffbf",
    ],
    shapes: ["circle", "square"],
    scalar: 1.2,
  });
  setTimeout(() => {
    confetti({
      particleCount: 100,
      spread: 180,
      origin: { y: 0.4 },
      startVelocity: 60,
      colors: ["#00b4d8", "#48cae4", "#90e0ef", "#ade8f4", "#caf0f8"],
      shapes: ["star"],
      scalar: 1.5,
    });
  }, 400);
}

function showEndState() {
  // Add Confetti Animation on Finish
  confettiAnimation();
  countdown.style.display = "none";
  const label = isCustomDate
    ? "🎉 Countdown Complete! 🎉"
    : "🎉 Happy New Year! 🎉";
  heading.innerText = document.title = label;
}

function updateCountdown() {
  const currentTime = new Date();
  const difference = newYearTime - currentTime;
  // Make the Year Dynamic
  year.innerText = newYearTime.getFullYear();
  if (difference <= 0) {
    clearInterval(intervalId);
    // showHappyNewYear();
    showEndState();
    return;
  }
  const currentDays = Math.floor(difference / 1000 / 60 / 60 / 24);
  const currentHours = Math.floor(difference / 1000 / 60 / 60) % 24;
  const currentMinutes = Math.floor(difference / 1000 / 60) % 60;
  const currentSeconds = Math.floor(difference / 1000) % 60;
  days.innerText = currentDays;
  hours.innerText = currentHours < 10 ? "0" + currentHours : currentHours;
  minutes.innerText =
    currentMinutes < 10 ? "0" + currentMinutes : currentMinutes;
  seconds.innerText =
    currentSeconds < 10 ? "0" + currentSeconds : currentSeconds;
}

setTimeout(() => {
  loading.remove();
  countdown.style.display = "flex";
}, 1000);

const intervalId = setInterval(updateCountdown, 1000);

year.innerText = nextYear;

// Allow Custom Countdown Dates
customDateInput.addEventListener("change", (e) => {
  const selectedDate = new Date(e.target.value);
  if (!isNaN(selectedDate)) {
    isCustomDate = true;
    newYearTime = selectedDate;
    const label = `Countdown to ${selectedDate.toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    })}`;
    heading.innerText = document.title = label;
  }
});
