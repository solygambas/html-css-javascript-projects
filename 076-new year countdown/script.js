const days = document.getElementById("days");
const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");
const countdown = document.getElementById("countdown");
const year = document.getElementById("year");
const loading = document.getElementById("loading");

const nextYear = new Date().getFullYear() + 1;
const newYearTime = new Date(`January 01 ${nextYear} 00:00:00`);

function formatTime(unit) {
  return unit < 10 ? "0" + unit : unit;
}

function updateCountdown() {
  const currentTime = new Date();
  const difference = newYearTime - currentTime;
  const currentDays = Math.floor(difference / 1000 / 60 / 60 / 24);
  const currentHours = Math.floor(difference / 1000 / 60 / 60) % 24;
  const currentMinutes = Math.floor(difference / 1000 / 60) % 60;
  const currentSeconds = Math.floor(difference / 1000) % 60;
  days.innerText = currentDays;
  hours.innerText = formatTime(currentHours);
  minutes.innerText = formatTime(currentMinutes);
  seconds.innerText = formatTime(currentSeconds);
}

setTimeout(() => {
  loading.remove();
  countdown.style.display = "flex";
}, 1000);

setInterval(updateCountdown, 1000);

year.innerText = nextYear;
