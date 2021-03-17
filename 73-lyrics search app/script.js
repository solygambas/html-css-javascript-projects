const form = document.getElementById("form");
const search = document.getElementById("search");
const result = document.getElementById("result");
const more = document.getElementById("more");

const apiURL = "https://api.lyrics.ovh";

async function searchSongs(term) {
  const res = await fetch(`${apiURL}/suggest/${term}`);
  const data = await res.json();
  showData(data);
}

async function getLyrics(artist, songTitle) {
  const res = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);
  const data = await res.json();
  console.log(artist, songTitle);
  if (data.error) {
    showAlert(data.error);
  } else {
    const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, "<br>");

    result.innerHTML = `
        <h2><strong>${artist}</strong> - ${songTitle}</h2>
        <span>${lyrics}</span>
    `;
  }
  more.innerHTML = "";
}

async function getMoreSongs(url) {
  const res = await fetch(`https://cors-anywhere.herokuapp.com/${url}`); // proxy is required to avoid CORS issue
  const data = await res.json();
  showData(data);
}

function showData(data) {
  result.innerHTML = `
    <ul class="songs">
      ${data.data
        .map(
          (song) => `<li>
      <span><strong>${song.artist.name}</strong> - ${song.title}</span>
      <button class="btn" data-artist="${song.artist.name}" data-songtitle="${song.title}">Get Lyrics</button>
    </li>`
        )
        .join("")}
    </ul>
    `;
  // Pagination
  if (data.prev || data.next) {
    more.innerHTML = `
                    ${
                      data.prev
                        ? `<button class="btn" onclick="getMoreSongs('${data.prev}')">Prev</button>`
                        : ""
                    }
                    ${
                      data.next
                        ? `<button class="btn" onclick="getMoreSongs('${data.next}')">Next</button>`
                        : ""
                    }
                    `;
  } else more.innerHTML = "";
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
  if (clickedElement.tagName === "BUTTON") {
    const artist = clickedElement.getAttribute("data-artist");
    const songTitle = clickedElement.getAttribute("data-songtitle");
    getLyrics(artist, songTitle);
  }
});

// Init
searchSongs("one");
