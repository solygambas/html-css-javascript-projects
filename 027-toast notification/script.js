const button = document.getElementById("button");
const toasts = document.getElementById("toasts");

const messages = [
  "Message One",
  "Message Two",
  "Message Three",
  "Message Four",
];
const types = ["info", "success", "error"];

const getRandomMessage = () =>
  messages[Math.floor(Math.random() * messages.length)];

const getRandomType = () => types[Math.floor(Math.random() * types.length)];

const createNotification = (message = null, type = null) => {
  const notif = document.createElement("div");
  notif.classList.add("toast");
  notif.classList.add(type ? type : getRandomType());
  notif.innerText = message ? message : getRandomMessage();
  toasts.appendChild(notif);
  setTimeout(() => notif.remove(), 3000);
};

button.addEventListener("click", () => createNotification());
