const jokeEl = document.getElementById("joke");
const jokeBtn = document.getElementById("jokeBtn");

function setButtonState(isLoading) {
  jokeBtn.disabled = isLoading;
  jokeBtn.innerText = isLoading ? "Loading..." : "Get Another Joke";
}

const generateJoke = async () => {
  // Prevent Multiple Clicks
  setButtonState(true);
  const config = {
    headers: { Accept: "application/json" },
  };
  const res = await fetch("https://icanhazdadjoke.com/", config);
  // Check API Response Status
  // const res = await fetch("https://icanhazdadjoke.com/nonexistent", config);
  const data = await res.json();
  jokeEl.innerHTML = res.status === 200 ? data.joke : "No joke found!";

  setButtonState(false);

  // Fetching with .then()
  //   fetch("https://icanhazdadjoke.com/", config)
  //     .then((res) => res.json())
  //     .then((data) => (jokeEl.innerHTML = data.joke));
};

generateJoke();

jokeBtn.addEventListener("click", () => generateJoke());
