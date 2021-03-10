// Reference: https://developer.mozilla.org/fr/docs/Learn/JavaScript/Client-side_web_APIs/Video_and_audio_APIs

const video = document.getElementById("video");
const play = document.getElementById("play");
const stop = document.getElementById("stop");
const progress = document.getElementById("progress");
const timestamp = document.getElementById("timestamp");

function toggleVideoStatus() {
  video.paused ? video.play() : video.pause();
}

function updatePlayIcon() {
  video.paused
    ? (play.innerHTML = '<i class="fa fa-play-circle fa-2x"></i>')
    : (play.innerHTML = '<i class="fa fa-pause-circle fa-2x"></i>');
}

function updateProgress() {
  progress.value = (video.currentTime / video.duration) * 100;
  let minutes = Math.floor(video.currentTime / 60);
  if (minutes < 10) minutes = "0" + String(minutes);
  let seconds = Math.floor(video.currentTime % 60);
  if (seconds < 10) seconds = "0" + String(seconds);
  timestamp.innerHTML = `${minutes}:${seconds}`;
}

function setVideoProgress() {
  video.currentTime = (+progress.value * video.duration) / 100;
}

function stopVideo() {
  video.currentTime = 0;
  video.pause();
}

video.addEventListener("click", toggleVideoStatus);
video.addEventListener("pause", updatePlayIcon);
video.addEventListener("play", updatePlayIcon);
video.addEventListener("timeupdate", updateProgress);
play.addEventListener("click", toggleVideoStatus);
stop.addEventListener("click", stopVideo);
progress.addEventListener("change", setVideoProgress);
