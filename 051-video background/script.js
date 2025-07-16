const menuToggle = document.querySelector(".toggle");
const showcase = document.querySelector(".showcase");
const video = document.querySelector(".video");
const muteButton = document.querySelector(".mute");

menuToggle.addEventListener("click", () => {
  menuToggle.classList.toggle("active");
  showcase.classList.toggle("active");
});

// Add a Mute/Unmute Button for the Video
muteButton.addEventListener("click", () => {
  video.muted = !video.muted;
  muteButton.classList.toggle("muted");
});
