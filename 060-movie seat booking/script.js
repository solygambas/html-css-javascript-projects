const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");
const clear = document.getElementById("clear-btn");
const book = document.getElementById("book-btn");
const modal = document.getElementById("modal");
const modalSummary = document.getElementById("modal-summary");
const closeModal = document.getElementById("close-modal");
const confirm = document.getElementById("confirm-btn");
const cancel = document.getElementById("cancel-btn");

let ticketPrice = +movieSelect.value;
// Implement a Seat-Picking Limit
let seatLimitReached = false;
let selectedSeatsCount = 0;

function getSelectedSeats() {
  return JSON.parse(localStorage.getItem("selectedSeats"));
}

function populateUI() {
  const selectedSeats = getSelectedSeats();
  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) seat.classList.add("selected");
    });
  }
  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");
  if (selectedMovieIndex !== null)
    movieSelect.selectedIndex = selectedMovieIndex;
  // Fix Total Price Calculation
  ticketPrice = +movieSelect.value;
}

function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
}

function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");
  const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));
  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));
  selectedSeatsCount = selectedSeats.length;
  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
  if (selectedSeatsCount > 0) {
    clear.classList.add("visible");
    book.classList.add("visible");
  } else {
    clear.classList.remove("visible");
    book.classList.remove("visible");
  }
  seatLimitReached = selectedSeatsCount >= 8;
}

function showModal() {
  const movieText = movieSelect.options[movieSelect.selectedIndex].text;
  const totalPrice = selectedSeatsCount * ticketPrice;
  modalSummary.innerHTML = `
    <strong>Movie:</strong> ${movieText}<br>
    <strong>Seats:</strong> ${selectedSeatsCount}<br>
    <strong>Total:</strong> $${totalPrice}
  `;
  modal.showModal();
}

function hideModal() {
  modal.close();
}

movieSelect.addEventListener("change", (e) => {
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});

container.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    if (seatLimitReached && !e.target.classList.contains("selected")) {
      alert("You can only select up to 8 seats.");
      return;
    }
    e.target.classList.toggle("selected");
    updateSelectedCount();
  }
});

// Add a "Clear Selection" Button
clear.addEventListener("click", () => {
  seats.forEach((seat) => {
    seat.classList.remove("selected");
  });
  localStorage.removeItem("selectedSeats");
  updateSelectedCount();
});

// Add a Confirmation Modal
book.addEventListener("click", showModal);
closeModal.addEventListener("click", hideModal);
cancel.addEventListener("click", hideModal);

confirm.addEventListener("click", () => {
  alert("Booking confirmed!");
  seats.forEach((seat) => seat.classList.remove("selected"));
  localStorage.removeItem("selectedSeats");
  updateSelectedCount();
  hideModal();
});

// Init
populateUI();
// Prevent Saving Empty Selections
const selectedSeats = getSelectedSeats();
if (selectedSeats && selectedSeats.length > 0) {
  updateSelectedCount();
}
