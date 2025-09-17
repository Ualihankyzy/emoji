const apiUrl = "https://emoji-production.up.railway.app/api/emojis";

const emojiList = document.getElementById("emojiList");
const searchInput = document.getElementById("searchInput");
const letterFilter = document.getElementById("letterFilter");
const categoryButtons = document.querySelectorAll(".filter-btn");

let emojis = [];
let filteredEmojis = [];


async function fetchEmojis() {
  const res = await fetch(apiUrl);
  emojis = await res.json();
  filteredEmojis = emojis;
  renderEmojis(filteredEmojis);
}


function renderEmojis(data) {
  emojiList.innerHTML = "";

  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  data.forEach((emoji) => {
    const card = document.createElement("div");
    card.className =
      "relative flex flex-col items-center justify-center border rounded-3xl p-4 shadow-lg bg-white transition transform hover:-translate-y-1 hover:scale-105";

    let name = emoji.name.length > 20 ? emoji.name.slice(0, 20) + "..." : emoji.name;

    card.innerHTML = `
      <div class="text-5xl mb-3">${emoji.htmlCode[0]}</div>
      <div class="text-sm font-semibold text-gray-800 mb-1 truncate">${name}</div>
      <div class="text-xs text-gray-400 uppercase mb-2">${emoji.category}</div>
      <button class="favorite-btn absolute top-2 right-2">
        <svg xmlns="http://www.w3.org/2000/svg" 
             class="h-6 w-6 ${favorites.some(fav => fav.name === emoji.name) ? 'text-red-500' : 'text-gray-400'}" 
             fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 
                   2 12.28 2 8.5 
                   2 5.42 4.42 3 7.5 3 
                   c1.74 0 3.41 0.81 4.5 2.09 
                   C13.09 3.81 14.76 3 16.5 3 
                   19.58 3 22 5.42 22 8.5 
                   c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
      </button>
    `;

    const favBtn = card.querySelector(".favorite-btn");
    favBtn.addEventListener("click", () => {
      let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
      const exists = favorites.some((f) => f.name === emoji.name);

      if (exists) {
        favorites = favorites.filter((f) => f.name !== emoji.name);
      } else {
        favorites.push(emoji);
      }

      localStorage.setItem("favorites", JSON.stringify(favorites));
      renderEmojis(data); 
    });

    emojiList.appendChild(card);
  });
}


searchInput.addEventListener("input", () => {
  const value = searchInput.value.toLowerCase();
  filteredEmojis = emojis.filter((e) => e.name.toLowerCase().includes(value));
  renderEmojis(filteredEmojis);
});


letterFilter.addEventListener("change", () => {
  const letter = letterFilter.value;
  if (letter === "Filter") {
    filteredEmojis = emojis;
  } else {
    filteredEmojis = emojis.filter((e) =>
      e.name[0].toUpperCase() === letter
    );
  }
  renderEmojis(filteredEmojis);
});


categoryButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    categoryButtons.forEach((b) => {
      b.classList.remove("text-white");
      b.style.backgroundColor = "#E5E7EB"; 
      b.classList.add("text-gray-700");
    });

    btn.classList.remove("text-gray-700");
    btn.classList.add("text-white");
    btn.style.backgroundColor = "#745EB6"; 

    const category = btn.dataset.category;
    if (category === "all") {
      filteredEmojis = emojis;
    } else {
      filteredEmojis = emojis.filter(
        (e) => e.category.toLowerCase() === category.toLowerCase()
      );
    }

    renderEmojis(filteredEmojis);
  });
});


fetchEmojis();
