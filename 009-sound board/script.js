// Include a New Sound
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
    .forEach((btn) => btn.classList.remove("playing"));
};

sounds.forEach((sound) => {
  const btn = document.createElement("button");
  btn.classList.add("btn");
  // Change Button Text
  btn.innerText = btn.innerText = "Play " + sound.toUpperCase();
  btn.addEventListener("click", () => {
    stopSounds();
    // Add Visual Feedback on Play
    btn.classList.add("playing");
    const audio = document.getElementById(sound);
    audio.play();
    audio.onended = () => {
      btn.classList.remove("playing");
    };
  });
  buttons.appendChild(btn);
});
