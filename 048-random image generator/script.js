const container = document.querySelector(".container");
const unsplashURL = "https://source.unsplash.com/random/";
const rows = 5;

const getRandomNumber = () => Math.floor(Math.random() * 10) + 300;
const getRandomSize = () => `${getRandomNumber()}x${getRandomNumber()}`;

for (let i = 0; i < rows * 3; i++) {
  const image = document.createElement("img");
  image.src = `${unsplashURL}${getRandomSize()}`;
  container.appendChild(image);
}
