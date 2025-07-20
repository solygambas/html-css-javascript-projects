// Movement Animation to happen
const card = document.querySelector(".card");
const container = document.querySelector(".container");

// Items
const title = document.querySelector(".title");
const sneaker = document.querySelector(".sneaker img");
const purchase = document.querySelector(".purchase");
const description = document.querySelector(".info h3");
const sizes = document.querySelector(".sizes");
const sizeButtons = sizes.querySelectorAll("button");

// Moving animation event
container.addEventListener("mousemove", (e) => {
  let xAxis = (window.innerWidth / 2 - e.pageX) / 25;
  let yAxis = (window.innerHeight / 2 - e.pageY) / 25;
  card.style.transform = `rotateX(${yAxis}deg) rotateY(${xAxis}deg)`;
});

// Animate In
container.addEventListener("mouseenter", (e) => {
  card.style.transition = "none";
  // Popout
  // title.style.transform = "translateZ(150px)";
  // sneaker.style.transform = "translateZ(200px) rotateZ(-45deg)";
  // description.style.transform = "translateZ(125px)";
  // sizes.style.transform = "translateZ(100px)";
  // purchase.style.transform = "translateZ(75px)";
  // Adjust the 3D "Pop-Out" Effect
  title.style.transform = "translateZ(70px)";
  sneaker.style.transform = "translateZ(120px) rotateZ(-20deg)";
  description.style.transform = "translateZ(50px)";
  sizes.style.transform = "translateZ(40px)";
  purchase.style.transform = "translateZ(30px)";
});

// Animate Out
container.addEventListener("mouseleave", (e) => {
  card.style.transition = "all 0.5s ease";
  card.style.transform = `rotateX(0deg) rotateY(0deg)`;
  //Popback
  title.style.transform = "translateZ(0px)";
  sneaker.style.transform = "translateZ(0) rotateZ(0deg)";
  description.style.transform = "translateZ(0px)";
  sizes.style.transform = "translateZ(0px)";
  purchase.style.transform = "translateZ(0px)";
});

// Make Size Buttons Interactive
sizeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    sizeButtons.forEach((button) => button.classList.remove("active"));
    button.classList.add("active");
  });
});

// Add a Glossy Shine Effect on Hover
container.addEventListener("mousemove", (e) => {
  let xAxis = (window.innerWidth / 2 - e.pageX) / 25;
  let yAxis = (window.innerHeight / 2 - e.pageY) / 25;
  card.style.transform = `rotateX(${yAxis}deg) rotateY(${xAxis}deg)`;

  const rect = card.getBoundingClientRect();
  card.style.setProperty(
    "--shine-x",
    `${((e.clientX - rect.left) / rect.width) * 100}%`
  );
  card.style.setProperty(
    "--shine-y",
    `${((e.clientY - rect.top) / rect.height) * 100}%`
  );
});
