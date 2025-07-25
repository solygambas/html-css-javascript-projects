const form = document.getElementById("form");
const search = document.getElementById("search");
const result = document.getElementById("result");
const loader = document.getElementById("loader");
const historyContainer = document.getElementById("history");

let searches = JSON.parse(localStorage.getItem("searches")) || [];
let lastSearchResults = [];
const apiURL = "https://lrclib.net/api";

// Add a Loading Spinner
function showLoader() {
  loader.style.display = "grid";
}
function hideLoader() {
  loader.style.display = "none";
}

async function searchSongs(term) {
  showLoader();
  try {
    const res = await fetch(`${apiURL}/search?q=${encodeURIComponent(term)}`);
    if (!res.ok) throw new Error("Network response was not ok");
    const data = await res.json();
    lastSearchResults = Array.isArray(data) ? data : [];
    showData(lastSearchResults);
    if (lastSearchResults.length) {
      saveSearch(term);
    }
    // Add Error Handling
  } catch (error) {
    result.innerHTML = "<p>Failed to fetch results. Please try again.</p>";
    lastSearchResults = [];
  } finally {
    hideLoader();
  }
}

function showLyricsByIndex(index) {
  const song = lastSearchResults[index];
  if (!song) {
    showAlert("Lyrics not found.");
    return;
  }
  const lyrics = song.plainLyrics || "No lyrics available.";
  // Improve Lyric Display
  result.innerHTML = `
    <h2><strong>${song.artistName}</strong> - ${song.trackName}</h2>
    <span>${lyrics}</span>
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

// Add Search History
function saveSearch(term) {
  searches = Array.from(
    new Set([term, ...searches.map((term) => term.toLowerCase())])
  ).slice(0, 5);
  localStorage.setItem("searches", JSON.stringify(searches));
  renderHistory();
}

function renderHistory() {
  if (!searches.length) {
    historyContainer.innerHTML = "";
    return;
  }
  historyContainer.innerHTML = `
    <div><strong>Recent searches:</strong></div>
    <div>
      ${searches
        .map(
          (term) =>
            `<button class="btn history-btn" data-term="${term}">${term}</button>`
        )
        .join(" ")}
    </div>
  `;
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

historyContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("history-btn")) {
    const term = e.target.getAttribute("data-term");
    search.value = term;
    searchSongs(term);
  }
});

// Init
renderHistory();
searchSongs("one");
