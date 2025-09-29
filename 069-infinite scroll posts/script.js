const postsContainer = document.getElementById("posts-container");
const loader = document.getElementById("loader");
const filter = document.getElementById("filter");
const backToTop = document.getElementById("scroll-up");

let limit = 5;
let page = 1;
let isLoading = false;

async function getPosts() {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
  );
  const data = await res.json();
  return data;
}

function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

async function showPosts() {
  const posts = await getPosts();
  posts.forEach((post) => {
    const postEl = document.createElement("div");
    postEl.classList.add("post");
    postEl.innerHTML = `
      <div class="number">${post.id}</div>
      <div class="post-info">
        <h2 class="post-title">${capitalize(post.title)}</h2>
        <p class="post-body">${capitalize(post.body)}</p>
      </div>
    `;
    postsContainer.appendChild(postEl);
  });
}

// Refactor Loading Logic to Prevent Race Conditions
async function fetchAndShowPosts() {
  page++;
  await showPosts();
}

async function showLoading() {
  isLoading = true;
  loader.classList.add("show");
  await fetchAndShowPosts();
  loader.classList.remove("show");
  isLoading = false;
}

// Debounce the Filter Input for Better Performance
function debounce(functionToDebounce, delay = 300) {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => functionToDebounce.apply(this, args), delay);
  };
}

function filterPosts(e) {
  console.log("running");
  const term = e.target.value.toUpperCase();
  const posts = document.querySelectorAll(".post");
  posts.forEach((post) => {
    const title = post.querySelector(".post-title").innerText.toUpperCase();
    const body = post.querySelector(".post-body").innerText.toUpperCase();
    if (title.indexOf(term) > -1 || body.indexOf(term) > -1) {
      post.style.display = "flex";
    } else {
      post.style.display = "none";
    }
  });
}

// Preserve Scroll Position on Refresh
async function restorePostsAndScroll() {
  const savedPage = parseInt(sessionStorage.getItem("page"), 10);
  const savedScroll = parseInt(sessionStorage.getItem("scrollTop"), 10);

  if (savedPage && savedPage > 1) {
    for (let i = 1; i <= savedPage; i++) {
      page = i;
      await showPosts();
    }
    setTimeout(() => {
      window.scrollTo(0, savedScroll || 0);
    }, 0);
  } else {
    showPosts();
  }
}

window.addEventListener("scroll", () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  if (scrollTop + clientHeight >= scrollHeight - 5 && !isLoading) showLoading();
  //  Add a "Back to Top" Button
  backToTop.style.display = scrollTop > 100 ? "block" : "none";
  sessionStorage.setItem("scrollTop", scrollTop);
  sessionStorage.setItem("page", page);
});

filter.addEventListener("input", debounce(filterPosts, 300));

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Init
// showPosts();
restorePostsAndScroll();
