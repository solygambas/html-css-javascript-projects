const contents = document.querySelectorAll(".content");
const listItems = document.querySelectorAll("nav ul li");

// const hideAllContents = () => {
//   contents.forEach((content) => content.classList.remove("show"));
// };
// const hideAllItems = () => {
//   listItems.forEach((item) => item.classList.remove("active"));
// };

// Refactor the Helper Functions
const removeClassFromAll = (list, className) => {
  list.forEach((item) => item.classList.remove(className));
};

listItems.forEach((item) => {
  item.addEventListener("click", () => {
    // hideAllContents();
    // hideAllItems();
    removeClassFromAll(contents, "show");
    removeClassFromAll(listItems, "active");
    item.classList.add("active");
    // contents[index].classList.add("show");
    // Use Data Attributes for Content Linking
    const contentId = item.dataset.content;
    document.getElementById(contentId).classList.add("show");
  });
});

// Add Keyboard Navigation
document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
    const activeItem = document.querySelector("nav ul li.active");
    let nextItem;

    if (event.key === "ArrowRight") {
      nextItem = activeItem.nextElementSibling || listItems[0];
    } else {
      nextItem =
        activeItem.previousElementSibling || listItems[listItems.length - 1];
    }
    nextItem.click();
  }
});
