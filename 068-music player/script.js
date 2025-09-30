const musicContainer = document.getElementById("music-container");
const playButton = document.getElementById("play");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const audio = document.getElementById("audio");
const progress = document.getElementById("progress");
const shuffleButton = document.getElementById("shuffle");
const repeatButton = document.getElementById("repeat");
const progressContainer = document.getElementById("progress-container");
const title = document.getElementById("title");
const cover = document.getElementById("cover");
const currentTimeSpan = document.getElementById("current-time");
const durationSpan = document.getElementById("duration");
const playlist = document.getElementById("playlist");

const songs = ["hey", "summer", "ukulele"];
let songIndex = 1;
let isShuffled = false;
let repeatState = 1;

function getSongTitle(song) {
  return song.charAt(0).toUpperCase() + song.slice(1);
}

function loadSong(song) {
  title.innerText = getSongTitle(song);
  audio.src = `https://github.com/bradtraversy/vanillawebprojects/blob/master/music-player/music/${song}.mp3?raw=true`;
  cover.src = `https://github.com/bradtraversy/vanillawebprojects/blob/master/music-player/images/${song}.jpg?raw=true`;
  updateActiveSong();
}

function playSong() {
  musicContainer.classList.add("play");
  playButton.querySelector("i.fas").classList.remove("fa-play");
  playButton.querySelector("i.fas").classList.add("fa-pause");
  audio.play();
}

function pauseSong() {
  musicContainer.classList.remove("play");
  playButton.querySelector("i.fas").classList.remove("fa-pause");
  playButton.querySelector("i.fas").classList.add("fa-play");
  audio.pause();
}

function prevSong() {
  songIndex--;
  if (songIndex < 0) songIndex = songs.length - 1;
  loadSong(songs[songIndex]);
  playSong();
}

function nextSong() {
  if (isShuffled) {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * songs.length);
    } while (newIndex === songIndex);
    songIndex = newIndex;
  } else {
    songIndex++;
    if (songIndex > songs.length - 1) songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}

function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
  currentTimeSpan.innerText = formatTime(currentTime);
}

function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
}

// Add a Shuffle Button
function toggleShuffle() {
  isShuffled = !isShuffled;
  shuffleButton.classList.toggle("active", isShuffled);
}

// Implement a Repeat Button
function toggleRepeat() {
  repeatState = (repeatState + 1) % 3;
  const repeatIcon = repeatButton.querySelector("i.fas");

  switch (repeatState) {
    case 0:
      repeatButton.classList.remove("active");
      repeatIcon.innerText = "";
      break;
    case 1:
      repeatButton.classList.add("active");
      repeatIcon.innerText = "";
      break;
    case 2:
      repeatButton.classList.add("active");
      repeatIcon.innerText = "1";
      break;
  }
}

function handleSongEnd() {
  switch (repeatState) {
    case 0:
      break;
    case 1:
      nextSong();
      break;
    case 2:
      playSong();
      break;
  }
}

// Display Current and Total Time
function formatTime(seconds) {
  if (isNaN(seconds)) return "0:00";
  const minutes = Math.floor(time / 60);
  let seconds = Math.floor(time % 60);
  seconds = seconds < 10 ? "0" + seconds : seconds;
  return `${minutes}:${seconds}`;
}

function setDuration() {
  durationSpan.innerText = formatTime(audio.duration);
}

// Create a Dynamic Playlist
function renderPlaylist() {
  playlist.innerHTML = "";
  songs.forEach((song, index) => {
    const li = document.createElement("li");
    li.textContent = getSongTitle(song);
    li.setAttribute("data-index", index);
    if (index === songIndex) li.classList.add("active-song");
    playlist.appendChild(li);
  });
}

function updateActiveSong() {
  [...playlist.children].forEach((li, index) => {
    li.classList.toggle("active-song", index === songIndex);
  });
}

// Event Listeners
playButton.addEventListener("click", () => {
  const isPlaying = musicContainer.classList.contains("play");
  isPlaying ? pauseSong() : playSong();
});

prevButton.addEventListener("click", prevSong);
nextButton.addEventListener("click", nextSong);
shuffleButton.addEventListener("click", toggleShuffle);
repeatButton.addEventListener("click", toggleRepeat);

audio.addEventListener("timeupdate", updateProgress);
progressContainer.addEventListener("click", setProgress);

// audio.addEventListener("ended", nextSong);
audio.addEventListener("ended", handleSongEnd);

audio.addEventListener("timeupdate", updateProgress);
audio.addEventListener("loadedmetadata", setDuration);
progressContainer.addEventListener("click", setProgress);

playlist.addEventListener("click", function (e) {
  const li = e.target.closest("li[data-index]");
  if (!li) return;
  const index = Number(li.getAttribute("data-index"));
  if (index !== songIndex) {
    songIndex = index;
    loadSong(songs[songIndex]);
    playSong();
  }
});

// Init
loadSong(songs[songIndex]);
renderPlaylist();
