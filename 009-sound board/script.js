// Add a New Sound
const sounds = ["applause", "boo", "gasp", "tada", "victory", "wrong", "joke"];
const buttons = document.getElementById("buttons");

const stopSounds = () => {
  sounds.forEach((sound) => {
    const currentSound = document.getElementById(sound);
    currentSound.pause();
    currentSound.currentTime = 0;
  });
  document
    .querySelectorAll(".btn")
    .forEach((btn) => btn.classList.remove("is-playing"));
};

sounds.forEach((sound) => {
  const btn = document.createElement("button");
  btn.classList.add("btn");
  // Change Button Text
  btn.innerText = btn.innerText = "Play " + sound.toUpperCase();
  const audio = document.getElementById(sound);
  btn.addEventListener("click", () => {
    stopSounds();
    // Add Visual Feedback When Playing
    btn.classList.add("is-playing");
    audio.play();
    audio.onended = () => {
      btn.classList.remove("is-playing");
    };
  });
  buttons.appendChild(btn);
});
