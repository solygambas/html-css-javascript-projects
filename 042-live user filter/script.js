const result = document.getElementById("result");
const filter = document.getElementById("filter");
const listItems = [];

const filterData = (searchTerm) => {
  // Show a "No Results" Message
  let visibleCount = 0;
  const existingMsg = document.getElementById("not-found");
  if (existingMsg) {
    existingMsg.remove();
  }

  // Highlight the Matched Text
  const searchTermLower = searchTerm.toLowerCase();
  const regex = new RegExp(searchTerm, "gi");

  listItems.forEach((item) => {
    const userInfoDiv = item.querySelector(".user-info");
    const h4 = userInfoDiv.querySelector("h4");
    const p = userInfoDiv.querySelector("p");

    const name = h4.textContent;
    const location = p.textContent;

    if (
      searchTerm === "" ||
      `${name} ${location}`.toLowerCase().includes(searchTermLower)
    ) {
      item.classList.remove("hide");
      visibleCount++;
      h4.innerHTML = name.replace(
        regex,
        (match) => `<span class="highlight">${match}</span>`
      );
      p.innerHTML = location.replace(
        regex,
        (match) => `<span class="highlight">${match}</span>`
      );
    } else {
      item.classList.add("hide");
    }
  });

  if (visibleCount === 0) {
    const li = document.createElement("li");
    li.id = "not-found";
    li.textContent = "No users found.";
    result.appendChild(li);
  }
};

const getData = async () => {
  const res = await fetch("https://randomuser.me/api?results=50");
  const { results } = await res.json();
  result.innerHTML = "";
  // Sort the Results
  results.sort((a, b) => {
    return a.name.first.localeCompare(b.name.first);
  });
  results.forEach((user) => {
    const li = document.createElement("li");
    listItems.push(li);
    li.innerHTML = `
      <img
            src="${user.picture.large}"
            alt="${user.name.first}"
          />
      <div class="user-info">
            <h4>${user.name.first} ${user.name.last}</h4>
            <p>${user.location.city}, ${user.location.country}</p>
      </div>
      `;
    result.appendChild(li);
  });
};

getData();

// Debounce the Search Input
let debounceTimer;

filter.addEventListener("input", (e) => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    filterData(e.target.value);
  }, 300);
});
