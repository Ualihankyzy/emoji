 const categoryMap = {
        all: "all",
        smileys: "smileys and people",
        animals: "animals & nature",
        food: "food & drink",
        activity: "activities",
        travel: "travel & places",
        flags: "flags",
        cars: "cars & transport",
        symbols: "symbols",
        objects: "objects",
        people: "smileys and people",
        nature: "animals & nature",
      };
      let allEmojis = [];

      async function loadEmojis() {
        try {
          const response = await fetch("http://localhost:3000/api/emojis");
          const emojis = await response.json();
          allEmojis = emojis;
          renderEmojis(allEmojis);
        } catch (error) {
          console.error("Error while loading emojis:", error);
        }
      }

      function renderEmojis(emojis) {
        const container = document.getElementById("emojiList");
        container.innerHTML = "";

        if (emojis.length === 0) {
          container.innerHTML = `<p class="text-gray-500 col-span-full text-center text-lg">No emojis found 😢</p>`;
          return;
        }

        emojis.forEach((emoji) => {
          const card = document.createElement("div");
          card.className =
            " to-indigo-100 shadow-lg rounded-2xl p-6 flex flex-col items-center justify-center hover:scale-105 transform transition duration-300";

          card.innerHTML = `
        <div class="text-5xl mb-3">${emoji.htmlCode[0]}</div>
        <p class="font-bold text-gray-800 text-center mb-1">${emoji.name
          .split(" ")
          .slice(0, 3)
          .join(" ")}</p>
        <p class="text-sm text-indigo-600 italic">${emoji.category}</p>
      `;

          container.appendChild(card);
        });
      }

      function applyFilters() {
        const searchValue = document
          .getElementById("searchInput")
          .value.toLowerCase();
        const selectedLetter = document.getElementById("letterFilter").value;
        const activeCategoryBtn = document.querySelector(
          "#categoryButtons .filter-btn.bg-indigo-600"
        );
        const category = activeCategoryBtn
          ?.getAttribute("data-category")
          .toLowerCase();

        let filtered = allEmojis;

        if (category && category !== "all") {
          filtered = filtered.filter(
            (emoji) => emoji.category.toLowerCase() === category
          );
        }

        if (searchValue) {
          filtered = filtered.filter((emoji) =>
            emoji.name.toLowerCase().includes(searchValue)
          );
        }

        if (selectedLetter !== "Filter") {
          filtered = filtered.filter((emoji) =>
            emoji.name.toLowerCase().startsWith(selectedLetter.toLowerCase())
          );
        }

        renderEmojis(filtered);
      }

      document.addEventListener("DOMContentLoaded", () => {
        loadEmojis();

        document
          .querySelectorAll("#categoryButtons .filter-btn")
          .forEach((btn) => {
            btn.addEventListener("click", () => {
              document
                .querySelectorAll("#categoryButtons .filter-btn")
                .forEach((b) => {
                  b.classList.remove("bg-indigo-600", "text-white");
                  b.classList.add("bg-gray-200");
                });

              btn.classList.remove("bg-gray-200");
              btn.classList.add("bg-indigo-600", "text-white");

              applyFilters();
            });
          });

        document
          .getElementById("searchInput")
          .addEventListener("input", applyFilters);

        document
          .getElementById("letterFilter")
          .addEventListener("change", applyFilters);
      });