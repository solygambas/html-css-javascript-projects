let ratings = document.querySelectorAll(".rating");
const ratingsContainer = document.querySelector(".ratings-container");
const sendButton = document.getElementById("send");
const panel = document.getElementById("panel");
let selectedRating = "Satisfied";

const removeActive = () => {
  for (let i = 0; i < ratings.length; i++) {
    ratings[i].classList.remove("active");
  }
};

const setActive = (rating) => {
  removeActive();
  rating.classList.add("active");
  selectedRating = rating.querySelector("small").innerHTML;
};

// Make Each Rating Fully Clickable
// ratingsContainer.addEventListener("click", (e) => {
//   const rating = e.target.closest(".rating");
//   if (rating) {
//     removeActive();
//     rating.classList.add("active");
//     selectedRating = rating.querySelector("small").innerHTML;
//   }
// });

// sendButton.addEventListener("click", (e) => {
//   panel.innerHTML = `
//         <i class="fas fa-heart"></i>
//         <strong>Thank You!</strong>
//         <br>
//         <strong>Feedback: ${selectedRating}</strong>
//         <p>We'll use your feedback to improve our customer support</p>
//     `;
// });

let initialPanelContent;

// Refactor with a Single Event Listener
panel.addEventListener("click", (e) => {
  if (e.target.id === "send") {
    initialPanelContent = panel.innerHTML;
    panel.innerHTML = `
        <i class="fas fa-heart"></i>
        <strong>Thank You!</strong>
        <br>
        <strong>Feedback: ${selectedRating}</strong>
        <p>We'll use your feedback to improve our customer support</p>
        <button class="btn" id="reset">Send Another Response</button>
    `;
  }
  const rating = e.target.closest(".rating");
  if (rating) {
    setActive(rating);
  }
  // Enable Re-submission
  if (e.target.id === "reset") {
    panel.innerHTML = initialPanelContent;
    ratings = panel.querySelectorAll(".rating");
    const satisfied = Array.from(ratings).find(
      (rating) => rating.querySelector("small").textContent === "Satisfied"
    );
    if (satisfied) setActive(satisfied);
    selectedRating = "Satisfied";
  }
});

// Add Keyboard Accessibility
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
    const activeRating = document.querySelector(".rating.active");
    let newRating;
    if (e.key === "ArrowLeft") {
      newRating =
        activeRating.previousElementSibling || ratings[ratings.length - 1];
    } else {
      newRating = activeRating.nextElementSibling || ratings[0];
    }
    setActive(newRating);
  }
});
