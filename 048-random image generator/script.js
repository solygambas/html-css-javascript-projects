const container = document.querySelector(".container");
const randomfoxURL = "https://randomfox.ca/images/";
const rows = 5;

const getRandomNumber = () => Math.floor(Math.random() * 123);

for (let i = 0; i < rows * 3; i++) {
  const image = document.createElement("img");
  image.src = `${randomfoxURL}${getRandomNumber()}.jpg`;
  container.appendChild(image);
}
