window.onload = localStorage.clear();

const $app = document.getElementById("app");
const $observe = document.getElementById("observe");
const API = "https://us-central1-escuelajs-api.cloudfunctions.net/characters";

const getData = api => {
  fetch(api)
    .then(response => response.json())
    .then(response => {
      const next = response.info.next;
      localStorage.setItem("next_fetch", next);
      const characters = response.results;
      let output = characters
        .map(character => {
          return `
            <article class="Card">
              <img src="${character.image}" />
              <h2>${character.name}<span>${character.species}</span></h2>
            </article>
          `;
        })
        .join("");
      let newItem = document.createElement("section");
      newItem.classList.add("Items");
      newItem.innerHTML = output;
      $app.appendChild(newItem);
    })
    .catch(error => console.log(error));
};

const loadData = async () => {
  try {
    const next_api = localStorage.getItem("next_fetch");
    console.log(next_api);
    if (next_api === null) {
      return await getData(API);
    } else if (next_api === "") {
      alert("Ya no hay más personajes...");
      intersectionObserver.unobserve($observe);
    } else {
      return await getData(next_api);
    }
  } catch (error) {
    console.error(error);
  }
};

const intersectionObserver = new IntersectionObserver(
  entries => {
    if (entries[0].isIntersecting) {
      loadData();
    }
  },
  {
    rootMargin: "0px 0px 100% 0px"
  }
);

intersectionObserver.observe($observe);
