const contents = document.querySelectorAll(".content");
const listItems = document.querySelectorAll("nav ul li");

const hideAllContents = () => {
  contents.forEach((content) => content.classList.remove("show"));
};
const hideAllItems = () => {
  listItems.forEach((item) => item.classList.remove("active"));
};

listItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    hideAllContents();
    hideAllItems();
    item.classList.add("active");
    contents[index].classList.add("show");
  });
});
