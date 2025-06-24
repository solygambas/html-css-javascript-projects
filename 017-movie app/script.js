const KEY = "3fd2be6f0c70a2a598f084ddfb75487c";
// For educational purposes only - DO NOT USE in production
// Request your own key for free: https://developers.themoviedb.org/3
const API_URL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${KEY}&page=1`;
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${KEY}&query=`;

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

const getClassByRate = (vote) => {
  // Adjust Rating Color Thresholds
  if (vote > 8) return "green";
  else if (vote >= 6) return "orange";
  else return "red";
};

const showMovies = (movies) => {
  main.innerHTML = "";
  // Handle No Search Results
  if (movies.length === 0) {
    main.innerHTML =
      '<h1 class="no-results">No movies found. Please try another search.</h1>';
    return;
  }
  movies.forEach((movie) => {
    // Display the Movie's Release Date
    const { title, poster_path, vote_average, overview, release_date } = movie;
    const year = new Date(release_date).getFullYear();
    const movieElement = document.createElement("div");
    movieElement.classList.add("movie");
    // Handle Missing Movie Posters
    // Format Movie Ratings
    movieElement.innerHTML = `
    <img src="${
      IMG_PATH + poster_path
    }" alt="${title}" onerror="this.src='https://placehold.co/1280x1920/058ED9/FFF?text=${title}&font=poppins'" />
    <div class="movie-info">
      <h3>${title} <span class="release-date">(${year})</span></h3>
      <span class="${getClassByRate(vote_average)}">${vote_average.toFixed(
      1
    )}</span>
    </div>
    <div class="overview">
      <h3>Overview</h3>
      ${overview}
    </div>
  `;
    main.appendChild(movieElement);
  });
};

const getMovies = async (url) => {
  const res = await fetch(url);
  const data = await res.json();
  showMovies(data.results);
};

getMovies(API_URL);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchTerm = search.value;
  if (searchTerm && searchTerm !== "") {
    getMovies(SEARCH_API + searchTerm);
    search.value = "";
  } else history.go(0);
});
