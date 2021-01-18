const APIURL = "https://api.github.com/users/";
const form = document.getElementById("form");
const main = document.getElementById("main");
const search = document.getElementById("search");

const createUserCard = (user) => {
  const cardHTML = `
    <div class="card">
        <div>
          <img
            src="${user.avatar_url}"
            alt="${user.name}"
            class="avatar"
          />
        </div>
        <div class="user-info">
          <h2>${user.name}</h2>
          <p>
          ${user.bio}
          </p>
          <ul>
            <li>${user.followers}<strong>Followers</strong></li>
            <li>${user.following}<strong>Following</strong></li>
            <li>${user.public_repos}<strong>Repos</strong></li>
          </ul>
          <div id="repos">
          </div>
        </div>
      </div>
    `;
  main.innerHTML = cardHTML;
};

const createErrorCard = (message) => {
  const cardHTML = `
    <div class="card"><h1>${message}</h1></div>
    `;
  main.innerHTML = cardHTML;
};

const addReposToCard = (repos) => {
  const reposElement = document.getElementById("repos");
  repos.slice(0, 5).forEach((repo) => {
    const repoElement = document.createElement("a");
    repoElement.classList.add("repo");
    repoElement.href = repo.html_url;
    repoElement.target = "_blank";
    repoElement.innerText = repo.name;
    reposElement.appendChild(repoElement);
  });
};

const getUser = async (username) => {
  try {
    const { data } = await axios(APIURL + username);
    createUserCard(data);
    getRepos(username);
  } catch (error) {
    if (error.response.status == 404)
      createErrorCard("No profile with this username");
  }
};

const getRepos = async (username) => {
  try {
    const { data } = await axios(APIURL + username + "/repos?sort=created");
    addReposToCard(data);
  } catch (error) {
    createErrorCard("Problem fetching repos");
  }
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const user = search.value;
  if (user) {
    getUser(user);
    search.value = "";
  }
});
