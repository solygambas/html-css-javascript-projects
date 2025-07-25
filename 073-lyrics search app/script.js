const form = document.getElementById("form");
const search = document.getElementById("search");
const result = document.getElementById("result");

let lastSearchResults = [];
const apiURL = "https://lrclib.net/api";

async function searchSongs(term) {
  const res = await fetch(`${apiURL}/search?q=${encodeURIComponent(term)}`);
  const data = await res.json();
  lastSearchResults = data || [];
  showData(lastSearchResults);
}

function showLyricsByIndex(index) {
  const song = lastSearchResults[index];
  if (!song) {
    showAlert("Lyrics not found.");
    return;
  }
  const lyrics = song.plainLyrics || "No lyrics available.";
  result.innerHTML = `
    <h2><strong>${song.artistName}</strong> - ${song.trackName}</h2>
    <span>${lyrics.replace(/(\r\n|\r|\n)/g, "<br>")}</span>
  `;
}

function showData(data) {
  result.innerHTML = `
    <ul class="songs">
      ${data
        .map(
          (song, index) => `<li>
      <span><strong>${song.artistName}</strong> - ${song.trackName}</span>
      <button class="btn" data-index="${index}">Get Lyrics</button>
    </li>`
        )
        .join("")}
    </ul>
    `;
}

function showAlert(message) {
  const notif = document.createElement("div");
  notif.classList.add("toast");
  notif.innerText = message;
  document.body.appendChild(notif);
  setTimeout(() => notif.remove(), 3000);
}

// Event Listeners
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchTerm = search.value.trim();
  if (!searchTerm) showAlert("Please type in a search term");
  else searchSongs(searchTerm);
});
result.addEventListener("click", (e) => {
  const clickedElement = e.target;
  if (
    clickedElement.tagName === "BUTTON" &&
    clickedElement.hasAttribute("data-index")
  ) {
    const index = clickedElement.getAttribute("data-index");
    showLyricsByIndex(index);
  }
});

// Init
searchSongs("one");
