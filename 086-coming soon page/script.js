// Add a Modal for the Subscription Form
const modal = document.getElementById("subscribe-modal");
const openBtn = document.getElementById("open-modal-btn");
const closeBtn = document.getElementById("close-modal-btn");
const form = document.getElementById("subscribe-form");

openBtn.addEventListener("click", () => {
  modal.showModal();
});

closeBtn.addEventListener("click", () => {
  modal.close();
});

modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.close();
  }
});

form.addEventListener("submit", (e) => {
  const thankYouMessage = document.createElement("p");
  thankYouMessage.textContent = "Thank you!";
  thankYouMessage.classList.add("thank-you-message");
  openBtn.replaceWith(thankYouMessage);
});
