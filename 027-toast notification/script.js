const button = document.getElementById("button");
const toasts = document.getElementById("toasts");

// Customize Notification Messages
const messages = [
  { text: "Login successful", type: "success" },
  { text: "Item added to cart", type: "info" },
  { text: "Profile updated", type: "success" },
  { text: "Password changed", type: "success" },
  { text: "An error occurred", type: "error" },
  { text: "Invalid input", type: "error" },
  { text: "Welcome back!", type: "info" },
];

const getRandomMessage = () =>
  messages[Math.floor(Math.random() * messages.length)];
// const types = ["info", "success", "error"];

// const getRandomMessage = () =>
//   messages[Math.floor(Math.random() * messages.length)];

// const getRandomType = () => types[Math.floor(Math.random() * types.length)];

// Add Notification Types with Icons
const getIcon = (type) => {
  if (type === "success") return '<i class="fas fa-check-circle"></i> ';
  if (type === "error") return '<i class="fas fa-exclamation-circle"></i> ';
  return '<i class="fas fa-info-circle"></i> ';
};

const createNotification = (message = null, type = null) => {
  const notif = document.createElement("div");
  notif.classList.add("toast");
  // notif.classList.add(type ? type : getRandomType());
  // notif.innerText = message ? message : getRandomMessage();
  const messageObject = message || getRandomMessage();
  notif.classList.add(messageObject.type);
  notif.innerHTML = getIcon(messageObject.type) + messageObject.text;
  // Create a Close Button for Toasts
  const closeButton = document.createElement("button");
  closeButton.innerHTML = '<i class="fas fa-times"></i>';
  closeButton.classList.add("close-button");
  const timeoutId = setTimeout(() => notif.remove(), 3000);
  closeButton.addEventListener("click", () => {
    clearTimeout(timeoutId);
    notif.remove();
  });
  notif.appendChild(closeButton);
  toasts.appendChild(notif);
};

button.addEventListener("click", () => createNotification());
