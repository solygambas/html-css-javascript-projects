const jokeEl = document.getElementById("joke");
const jokeBtn = document.getElementById("jokeBtn");

const generateJoke = async () => {
  // Prevent Multiple Clicks
  jokeBtn.disabled = true;
  jokeBtn.innerText = "Loading...";
  const config = {
    headers: { Accept: "application/json" },
  };
  const res = await fetch("https://icanhazdadjoke.com/", config);
  // Check API Response Status
  // const res = await fetch("https://icanhazdadjoke.com/nonexistent", config);
  const data = await res.json();
  jokeEl.innerHTML = res.status === 200 ? data.joke : "No joke found!";

  jokeBtn.disabled = false;
  jokeBtn.innerText = "Get Another Joke";

  // Fetching with .then()
  //   fetch("https://icanhazdadjoke.com/", config)
  //     .then((res) => res.json())
  //     .then((data) => (jokeEl.innerHTML = data.joke));
};

generateJoke();

jokeBtn.addEventListener("click", () => generateJoke());
