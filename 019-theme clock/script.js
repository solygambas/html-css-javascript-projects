const hourElement = document.querySelector(".hour");
const minuteElement = document.querySelector(".minute");
const secondElement = document.querySelector(".second");
const timeElement = document.querySelector(".time");
const dateElement = document.querySelector(".date");
const toggle = document.querySelector(".toggle");
const soundToggle = document.querySelector(".sound-toggle");
const tickSound = document.querySelector(".tick-sound");

let audioEnabled = false;

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const loadSavedTheme = () => {
  const savedTheme = localStorage.getItem("theme");
  const html = document.querySelector("html");

  if (savedTheme === "dark") {
    html.classList.add("dark");
    toggle.innerHTML = "Light mode";
  } else {
    html.classList.remove("dark");
    toggle.innerHTML = "Dark mode";
  }
};

soundToggle.addEventListener("click", () => {
  audioEnabled = !audioEnabled;
  const icon = soundToggle.querySelector("i");

  if (audioEnabled) {
    icon.className = "fas fa-volume-up";
    soundToggle.title = "Disable sound";
  } else {
    icon.className = "fas fa-volume-mute";
    soundToggle.title = "Enable sound";
    tickSound.pause();
    tickSound.currentTime = 0;
  }
});

toggle.addEventListener("click", (e) => {
  const html = document.querySelector("html");
  if (html.classList.contains("dark")) {
    html.classList.remove("dark");
    e.target.innerHTML = "Dark mode";
    // Save the User's Theme
    localStorage.setItem("theme", "light");
  } else {
    html.classList.add("dark");
    e.target.innerHTML = "Light mode";
    localStorage.setItem("theme", "dark");
  }
});

// StackOverflow https://stackoverflow.com/questions/10756313/javascript-jquery-map-a-range-of-numbers-to-another-range-of-numbers
const scale = (num, in_min, in_max, out_min, out_max) => {
  return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
};

const setTime = () => {
  const time = new Date();
  const date = time.getDate();
  const month = time.getMonth();
  const day = time.getDay();
  const hours = time.getHours();
  const hoursForClock = hours >= 13 ? hours % 12 : hours;
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();
  const ampm = hours >= 12 ? "PM" : "AM";

  hourElement.style.transform = `translate(-50%, -100%) rotate(${scale(
    hoursForClock,
    0,
    11,
    0,
    360
  )}deg)`;
  minuteElement.style.transform = `translate(-50%, -100%) rotate(${scale(
    minutes,
    0,
    59,
    0,
    360
  )}deg)`;
  secondElement.style.transform = `translate(-50%, -100%) rotate(${scale(
    seconds,
    0,
    59,
    0,
    360
  )}deg)`;

  timeElement.innerHTML = `${hoursForClock}:${
    minutes < 10 ? `0${minutes}` : minutes
  } ${ampm}`;
  dateElement.innerHTML = `${days[day]}, ${months[month]} <span class="circle">${date}</span>`;

  // Add a Ticking Sound
  if (audioEnabled) {
    tickSound.currentTime = 0;
    tickSound.play().catch((e) => console.log("Audio play failed:", e));
  }
};

loadSavedTheme();

setTime();

setInterval(setTime, 1000);
