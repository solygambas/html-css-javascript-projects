const container = document.querySelector(".container");
// Use a Different Image API
// const randomfoxURL = "https://randomfox.ca/images/";
const picsumURL = "https://picsum.photos/300?random=";
const rows = 5;

// const getRandomNumber = () => Math.floor(Math.random() * 123);

// Fix Duplicate Images
// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
const shuffle = (array) => {
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
};

const numbers = [...Array(123).keys()].map((i) => i + 1);

shuffle(numbers);

let currentIndex = 0;

const loadImages = () => {
  for (let i = 0; i < rows * 3; i++) {
    if (currentIndex >= numbers.length) return;
    // Add Skeleton Loaders
    const skeleton = document.createElement("div");
    skeleton.className = "skeleton";
    container.appendChild(skeleton);
    const image = document.createElement("img");
    image.src = `${picsumURL}${numbers[currentIndex]}.jpg`;
    image.onload = () => skeleton.replaceWith(image);
    image.onerror = () => skeleton.remove();
    container.appendChild(image);
    currentIndex++;
  }
};

// Implement Infinite Scroll
window.addEventListener("scroll", () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
    loadImages();
  }
});

loadImages();
