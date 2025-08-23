const result = document.getElementById("result");
const filter = document.getElementById("filter");
const listItems = [];
const userData = [];
const domElements = [];

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

  listItems.forEach((item, index) => {
    const data = userData[index];
    const elements = domElements[index];
    const searchableText = `${data.name} ${data.location}`.toLowerCase();

    if (searchTerm === "" || searchableText.includes(searchTermLower)) {
      item.classList.remove("hide");
      visibleCount++;

      if (regex) {
        elements.nameElement.innerHTML = data.name.replace(
          regex,
          (match) => `<mark class="highlight">${match}</mark>`
        );
        elements.locationElement.innerHTML = data.location.replace(
          regex,
          (match) => `<mark class="highlight">${match}</mark>`
        );
      } else {
        elements.nameElement.textContent = data.name;
        elements.locationElement.textContent = data.location;
      }
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
