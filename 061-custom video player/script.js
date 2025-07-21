// Reference: https://developer.mozilla.org/fr/docs/Learn/JavaScript/Client-side_web_APIs/Video_and_audio_APIs

const video = document.getElementById("video");
const play = document.getElementById("play");
const stop = document.getElementById("stop");
const progress = document.getElementById("progress");
const timestamp = document.getElementById("timestamp");
const fullscreen = document.getElementById("fullscreen");
const volume = document.getElementById("volume");
const mute = document.getElementById("mute");
const volumeIcon = mute.querySelector("i");

let lastVolume = 1;

// Refactor with Object Destructuring
const {
  toggleVideoStatus,
  updatePlayIcon,
  updateProgress,
  setVideoProgress,
  stopVideo,
  toggleFullscreen,
  setVolume,
  updateVolumeIcon,
  toggleMute,
} = {
  toggleVideoStatus() {
    video.paused ? video.play() : video.pause();
  },
  updatePlayIcon() {
    video.paused
      ? (play.innerHTML = '<i class="fa fa-play-circle fa-2x"></i>')
      : (play.innerHTML = '<i class="fa fa-pause-circle fa-2x"></i>');
  },
  updateProgress() {
    progress.value = (video.currentTime / video.duration) * 100;
    let minutes = Math.floor(video.currentTime / 60);
    if (minutes < 10) minutes = "0" + String(minutes);
    let seconds = Math.floor(video.currentTime % 60);
    if (seconds < 10) seconds = "0" + String(seconds);
    timestamp.innerHTML = `${minutes}:${seconds}`;
  },
  setVideoProgress() {
    video.currentTime = (+progress.value * video.duration) / 100;
  },
  stopVideo() {
    video.currentTime = 0;
    video.pause();
  },
  // Toggle Fullscreen Mode
  toggleFullscreen() {
    !document.fullscreenElement
      ? video.requestFullscreen()
      : document.exitFullscreen();
  },
  // Add Volume Control
  setVolume() {
    video.volume = volume.value;
    video.muted = video.volume == 0;
    if (video.volume > 0) lastVolume = video.volume;
    updateVolumeIcon();
  },
  // Add Mute Button Logic
  toggleMute() {
    if (video.muted || video.volume == 0) {
      video.volume = lastVolume || 1;
      video.muted = false;
      volume.value = video.volume;
    } else {
      lastVolume = video.volume;
      video.volume = 0;
      video.muted = true;
      volume.value = 0;
    }
    updateVolumeIcon();
  },
  updateVolumeIcon() {
    if (video.muted || video.volume == 0) {
      volumeIcon.classList.remove("fa-volume-up");
      volumeIcon.classList.add("fa-volume-mute");
    } else {
      volumeIcon.classList.remove("fa-volume-mute");
      volumeIcon.classList.add("fa-volume-up");
    }
  },
};

video.addEventListener("click", toggleVideoStatus);
video.addEventListener("pause", updatePlayIcon);
video.addEventListener("play", updatePlayIcon);
video.addEventListener("timeupdate", updateProgress);
play.addEventListener("click", toggleVideoStatus);
stop.addEventListener("click", stopVideo);
progress.addEventListener("change", setVideoProgress);
fullscreen.addEventListener("click", toggleFullscreen);
volume.addEventListener("input", setVolume);
mute.addEventListener("click", toggleMute);

// Implement Keyboard Shortcuts
document.addEventListener("keydown", (event) => {
  switch (event.key) {
    case " ":
      event.preventDefault();
      toggleVideoStatus();
      break;
    case "f":
      toggleFullscreen();
      break;
    case "m":
      toggleMute();
      break;
    default:
      break;
  }
});
