const modal = document.querySelector(".modal");
const previews = document.querySelectorAll(".gallery img");
const original = document.querySelector(".full-img");
const caption = document.querySelector(".caption");

previews.forEach((preview) => {
  preview.addEventListener("click", () => {
    modal.classList.add("open");
    original.classList.add("open");
    const originalSize = preview.getAttribute("data-original");
    original.src = `https://source.unsplash.com/${originalSize}`;
    caption.textContent = preview.alt;
    // Reference: https://stackoverflow.com/questions/35213147/difference-between-textcontent-vs-innertext
  });
});

modal.addEventListener("click", (e) => {
  if (e.target.classList.contains("modal")) {
    modal.classList.remove("open");
    original.classList.remove("open");
  }
});
