const openButton = document.querySelector(".open-btn");
const closeButton = document.querySelector(".close-btn");
const navs = document.querySelectorAll(".nav");

openButton.addEventListener("click", () =>
  navs.forEach((nav) => nav.classList.add("visible"))
);

closeButton.addEventListener("click", () =>
  navs.forEach((nav) => nav.classList.remove("visible"))
);
