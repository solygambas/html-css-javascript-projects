const tagsElements = document.getElementById("tags");
const textarea = document.getElementById("textarea");

const createTags = (input) => {
  // Prevent Duplicate Choices
  const tagsArray = input
    .split(",")
    .filter((tag) => tag.trim() !== "")
    .map((tag) => tag.trim());
  const tags = [...new Set(tagsArray)];
  tagsElements.innerHTML = "";
  tags.forEach((tag) => {
    const tagElement = document.createElement("span");
    tagElement.classList.add("tag");
    tagElement.innerText = tag;
    tagsElements.appendChild(tagElement);
  });
};

const pickRandomTag = () => {
  const tags = document.querySelectorAll(".tag");
  return tags[Math.floor(Math.random() * tags.length)];
};

const highlightTag = (tag) => tag.classList.add("highlight");

const unHighlightTag = (tag) => tag.classList.remove("highlight");

const randomSelect = () => {
  // Adjust Animation Speed
  const times = 15;
  const animationSpeed = 200;
  const interval = setInterval(() => {
    const randomTag = pickRandomTag();
    highlightTag(randomTag);
    setTimeout(() => {
      unHighlightTag(randomTag);
    }, animationSpeed);
  }, animationSpeed);

  setTimeout(() => {
    clearInterval(interval);
    setTimeout(() => {
      const randomTag = pickRandomTag();
      highlightTag(randomTag);
    }, animationSpeed);
  }, times * animationSpeed);
};

textarea.focus();
textarea.addEventListener("keyup", (e) => {
  createTags(e.target.value);
  if (e.key === "Enter") {
    setTimeout(() => (e.target.value = ""), 10);
    randomSelect();
  }
});
