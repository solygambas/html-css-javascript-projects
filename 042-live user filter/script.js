const result = document.getElementById("result");
const filter = document.getElementById("filter");
const listItems = [];
const userData = [];
const domElements = [];
let notFoundMsg = null;

const filterData = (searchTerm) => {
  // Show a "No Results" Message
  let visibleCount = 0;
  if (notFoundMsg) {
    notFoundMsg.remove();
    notFoundMsg = null;
  }

  // Highlight the Matched Text
  const searchTermLower = searchTerm.toLowerCase();
  const regex = new RegExp(searchTerm, "gi");

  listItems.forEach((item, index) => {
    const { name, location } = userData[index];
    const { nameElement, locationElement } = domElements[index];
    const searchableText = `${name} ${location}`.toLowerCase();

    if (searchTerm === "" || searchableText.includes(searchTermLower)) {
      item.classList.remove("hide");
      visibleCount++;

      if (regex) {
        nameElement.innerHTML = name.replace(
          regex,
          (match) => `<mark class="highlight">${match}</mark>`
        );
        locationElement.innerHTML = location.replace(
          regex,
          (match) => `<mark class="highlight">${match}</mark>`
        );
      } else {
        nameElement.textContent = name;
        locationElement.textContent = location;
      }
    } else {
      item.classList.add("hide");
    }
  });

  if (visibleCount === 0) {
    notFoundMsg = document.createElement("li");
    notFoundMsg.id = "not-found";
    notFoundMsg.textContent = "No users found.";
    result.appendChild(notFoundMsg);
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
    const originalData = {
      name: `${user.name.first} ${user.name.last}`,
      location: `${user.location.city}, ${user.location.country}`,
    };
    const li = document.createElement("li");
    li.innerHTML = `
      <img
            src="${user.picture.large}"
            alt="${user.name.first}"
          />
      <div class="user-info">
        <h4 class="name">${originalData.name}</h4>
        <p class="location">${originalData.location}</p>
      </div>
      `;
    const nameElement = li.querySelector(".name");
    const locationElement = li.querySelector(".location");

    listItems.push(li);
    userData.push(originalData);
    domElements.push({ nameElement, locationElement });
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
