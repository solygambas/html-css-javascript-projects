const pokeContainer = document.getElementById("poke-container");

// console.log(pokemonCount, pokemonType);
const colors = {
  fire: "#FDDFDF",
  grass: "#DEFDE0",
  electric: "#FCF7DE",
  water: "#DEF3FD",
  ground: "#f4e7da",
  rock: "#d5d5d4",
  fairy: "#fceaff",
  poison: "#98d7a5",
  bug: "#f8d5a3",
  dragon: "#97b3e6",
  psychic: "#eaeda1",
  flying: "#F5F5F5",
  fighting: "#E6E0D4",
  normal: "#F5F5F5",
};
const mainTypes = Object.keys(colors);

const createPokemonCard = (pokemon) => {
  const pokemonType = document.getElementById("type-of-pokemon").value || "all";
  const pokemonElement = document.createElement("div");
  pokemonElement.classList.add("pokemon");
  // const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
  // const id = pokemon.id.toString().padStart(3, "0");
  // const pokeTypes = pokemon.types.map((type) => type.type.name);
  // const type = mainTypes.find((type) => pokeTypes.indexOf(type) > -1);
  const color = colors[pokemonType];
  pokemonElement.style.backgroundColor = color;

  const pokemonInnerHTML = `
    <div class="img-container">
        <img
            src="${pokemon.image}"
            alt="${pokemon.name}"
            alt=""
        />
    </div>
    <div class="info">
        <span class="number">#${pokemon.id}</span>
        <h3 class="name">${pokemon.name}</h3>
        <small class="type">Type: <span>${pokemonType}</span></small>
    </div>
    `;
  pokemonElement.innerHTML = pokemonInnerHTML;
  pokeContainer.appendChild(pokemonElement);
};

const getPokemon = async (id) => {
  //fetch data
  const pokemonType = document.getElementById("type-of-pokemon").value || "all";
  const url = `https://pokeapi.co/api/v2/type/${pokemonType}`;
  const res = await fetch(url);
  const data = await res.json();
  console.log(data);
  // send data to createPokemonCard
  const pokemonName = data.pokemon[id].pokemon.name;
  const pokemonId = data.pokemon[id].pokemon.url.split("/")[6];
  // const pokemonTypes = data.pokemon.pokemon.types.map((type) => type.type.name);
  const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;
  const next = {
    id: id,
    name: pokemonName,
    // types: pokemonTypes,
    image: image,
  };
  createPokemonCard(next);
};

const fetchPokemons = async () => {
  const pokemonCount = document.getElementById("number-of-pokemon").value || 20;
  
  for (let i = 1; i <= pokemonCount; i++) {
    await getPokemon(i);
  }
};

// fetchPokemons();
