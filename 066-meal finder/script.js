const search = document.getElementById("search");
const submit = document.getElementById("submit");
const random = document.getElementById("random");
const mealsElement = document.getElementById("meals");
const resultHeading = document.getElementById("result-heading");
const singleMealElement = document.getElementById("single-meal");
const searchHistory = document.getElementById("search-history");

let lastSearch = false;
let searches;
try {
  searches = JSON.parse(localStorage.getItem("searches")) || [];
} catch (e) {
  searches = [];
}

// Implement a Search History
function renderSearchHistory() {
  if (!searches.length) {
    searchHistory.innerHTML = "";
    return;
  }
  searchHistory.innerHTML = `
    <div>
      <strong>Recent searches:</strong>
      ${searches
        .map((term) => `<button class="history-btn">${term}</button>`)
        .join("")}
    </div>
  `;
  searchHistory.querySelectorAll(".history-btn").forEach((button) => {
    button.onclick = () => {
      search.value = button.textContent;
      searchMeal(new Event("submit"));
    };
  });
}

function saveSearch(term) {
  term = term.trim();
  if (!term) return;
  const lowerTerm = term.toLowerCase();
  searches = [
    term,
    ...searches.filter((t) => t.toLowerCase() !== lowerTerm),
  ].slice(0, 5);
  localStorage.setItem("searches", JSON.stringify(searches));
  renderSearchHistory();
}

function showView({
  showMeals = false,
  showSingleMeal = false,
  showHeading = false,
}) {
  mealsElement.style.display = showMeals ? "grid" : "none";
  singleMealElement.style.display = showSingleMeal ? "block" : "none";
  resultHeading.style.display = showHeading ? "block" : "none";
}

function searchMeal(e) {
  e.preventDefault();
  singleMealElement.innerHTML = "";
  showView({ showMeals: true, showSingleMeal: false, showHeading: true });
  const term = search.value;
  if (term.trim()) {
    lastSearch = true;
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
      .then((res) => res.json())
      .then((data) => {
        resultHeading.innerHTML = `<h2>Search results for '${term}':</h2>`;
        if (data.meals === null) {
          resultHeading.innerHTML =
            "<p>There are no search results. Try again!</p>";
        } else {
          mealsElement.innerHTML = data.meals
            .map(
              (meal) => `
            <div class="meal">
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
                <div class="meal-info" data-mealID="${meal.idMeal}">
                    <h3>${meal.strMeal}</h3>
                </div>
            </div>
            `
            )
            .join("");
          saveSearch(term);
        }
      });
    search.value = "";
  } else {
    // Handle Empty Search Submission
    singleMealElement.innerHTML = "<p>Please enter a search term.</p>";
    showView({ showMeals: false, showSingleMeal: true, showHeading: false });
  }
}

function getMealById(mealID) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    .then((res) => res.json())
    .then((data) => {
      const meal = data.meals[0];
      addMealToDOM(meal);
      singleMealElement.scrollIntoView();
    });
}

function getRandomMeal() {
  lastSearch = false;
  mealsElement.innerHTML = "";
  resultHeading.innerHTML = "";
  fetch("https://www.themealdb.com/api/json/v1/1/random.php")
    .then((res) => res.json())
    .then((data) => {
      const meal = data.meals[0];
      addMealToDOM(meal);
    });
}

function addMealToDOM(meal) {
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
      );
    } else {
      break;
    }
  }
  showView({
    showMeals: false,
    showSingleMeal: true,
    showHeading: !lastSearch,
  });
  if (lastSearch)
    showView({ showHeading: false, showMeals: false, showSingleMeal: true });
  // Add a "Back to Results" Button
  singleMealElement.innerHTML = `
    <div class="single-meal">${
      lastSearch
        ? `<button id="back-btn" class="back-btn">&larr; Back to Results</button>`
        : ""
    }
        <h1>${meal.strMeal}</h1>
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
        <div class="main">
          <h2>Ingredients</h2>
          <ul>
            ${ingredients
              .map((ingredient) => `<li>${ingredient}</li>`)
              .join("")}
          </ul>
          <p>${meal.strInstructions}</p>
        </div>
        <div class="single-meal-info">
          ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ""}
          ${meal.strArea ? `<p>${meal.strArea}</p>` : ""}
        </div>
      </div>
    `;
  if (lastSearch) {
    document.getElementById("back-btn").onclick = () => {
      showView({ showMeals: true, showSingleMeal: false, showHeading: true });
    };
  }
}

submit.addEventListener("submit", searchMeal);
random.addEventListener("click", getRandomMeal);
mealsElement.addEventListener("click", (e) => {
  // Fix Deprecated event.path
  const mealInfo = e.target.closest(".meal-info");

  if (mealInfo) {
    const mealID = mealInfo.getAttribute("data-mealid");
    getMealById(mealID);
  }
});

// Init
getRandomMeal();
renderSearchHistory();
