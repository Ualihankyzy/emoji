const apiUrl = "https://esdrf-production.up.railway.app/api/emojis"; 

const emojiList = document.getElementById("emojiList");
const searchInput = document.getElementById("searchInput");
const letterFilter = document.getElementById("letterFilter");
const categoryButtons = document.querySelectorAll(".filter-btn");

let emojis = [];
let filteredEmojis = [];

// Fetch барлық эмодзилер
async function fetchEmojis() {
  const res = await fetch(apiUrl);
  emojis = await res.json();
  filteredEmojis = emojis;
  renderEmojis(filteredEmojis);
}

// Render функциясы
function renderEmojis(data) {
  emojiList.innerHTML = "";
  data.forEach((emoji) => {
    const card = document.createElement("div");
    card.className =
      "flex flex-col items-center justify-center border rounded-3xl p-4 shadow-lg bg-white transition transform hover:-translate-y-1 hover:scale-105";

    // Атауы ұзақ болса, 20 символға дейін қысқартады
    let name = emoji.name.length > 20 ? emoji.name.slice(0, 20) + "..." : emoji.name;

    card.innerHTML = `
      <div class="text-5xl mb-3">${emoji.htmlCode[0]}</div>
      <div class="text-sm font-semibold text-gray-800 mb-1 truncate">${name}</div>
      <div class="text-xs text-gray-400 uppercase">${emoji.category}</div>
    `;
    emojiList.appendChild(card);
  });
}

// Search фильтр
searchInput.addEventListener("input", () => {
  const value = searchInput.value.toLowerCase();
  filteredEmojis = emojis.filter((e) => e.name.toLowerCase().includes(value));
  renderEmojis(filteredEmojis);
});

// Alphabet фильтр
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

// Category фильтр
categoryButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Белсенді батырманы көрсету
    categoryButtons.forEach((b) => b.classList.remove("bg-indigo-600","text-white"));
    categoryButtons.forEach((b) => b.classList.add("bg-gray-200","text-gray-700"));
    btn.classList.remove("bg-gray-200","text-gray-700");
    btn.classList.add("bg-indigo-600","text-white");

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
