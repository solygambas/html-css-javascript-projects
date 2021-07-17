const postsContainer = document.getElementById("posts-container");
const loading = document.getElementById("loader");
const filter = document.getElementById("filter");

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

function showLoading() {
  isLoading = true;
  loader.classList.add("show");
  setTimeout(() => {
    loader.classList.remove("show");
    setTimeout(() => {
      page++;
      showPosts();
    }, 300);
    isLoading = false;
  }, 1000);
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

window.addEventListener("scroll", () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  if (scrollTop + clientHeight >= scrollHeight - 5 && !isLoading) showLoading();
});

filter.addEventListener("input", filterPosts);

// Init
showPosts();
