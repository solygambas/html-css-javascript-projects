const header = document.getElementById("header");
const title = document.getElementById("title");
const excerpt = document.getElementById("excerpt");
const profile_img = document.getElementById("profile-img");
const name = document.getElementById("name");
const date = document.getElementById("date");
const today = new Date();
const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const animated_bgs = document.querySelectorAll(".animated-bg");
const animated_bg_texts = document.querySelectorAll(".animated-bg-text");

//   // Change the "Loaded" Content
// const getData = () => {
//   header.innerHTML =
//     '<img src="https://images.unsplash.com/photo-1522542550221-31fd19575a2d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80" alt="" />';
//   title.innerHTML = "The Future of Web Development";
//   excerpt.innerHTML =
//     "Exploring emerging technologies and trends that will shape how we build websites";
//   profile_img.innerHTML =
//     '<img src="https://randomuser.me/api/portraits/women/24.jpg" alt="" />';
//   name.innerHTML = "Ana Smith";
//   date.innerHTML = `${
//     monthNames[today.getMonth()]
//   } ${today.getDate()}, ${today.getFullYear()}`;
//   animated_bgs.forEach((background) =>
//     background.classList.remove("animated-bg")
//   );
//   animated_bg_texts.forEach((background) =>
//     background.classList.remove("animated-bg-text")
//   );
// };

// Fetch Real Data from an API
const getData = async () => {
  try {
    const response = await fetch("https://dev.to/api/articles/2622588");
    const data = await response.json();

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    header.innerHTML = `<img src="${data.cover_image}" alt="" />`;

    const shortenText = (text, maxLength) => {
      if (text.length <= maxLength) {
        return text;
      }
      const lastSpaceIndex = text.lastIndexOf(" ", maxLength);
      return text.substring(0, lastSpaceIndex) + "...";
    };

    title.innerHTML = shortenText(data.title, 29);
    excerpt.innerHTML = shortenText(data.description, 84);
    profile_img.innerHTML = `<img src="${data.user.profile_image_90}" alt="" />`;
    name.innerHTML = data.user.name;
    date.innerHTML = data.readable_publish_date;

    // Make the Card Clickable
    const card = document.querySelector(".card");
    const cardLink = document.createElement("a");
    cardLink.href = data.url;
    cardLink.target = "_blank";
    cardLink.rel = "noopener noreferrer";
    cardLink.title = "Read full article: " + data.title;
    card.parentNode.insertBefore(cardLink, card);
    cardLink.appendChild(card);

    animated_bgs.forEach((background) =>
      background.classList.remove("animated-bg")
    );
    animated_bg_texts.forEach((background) =>
      background.classList.remove("animated-bg-text")
    );
  } catch (error) {
    console.error("Failed to fetch article data:", error);
  }
};

// getData();

setTimeout(getData, 500);
