document.addEventListener("DOMContentLoaded", () => {
    // Sélection des éléments nécessaires
    const searchInput = document.querySelector(".recherche input");
    const checkboxes = document.querySelectorAll(".categorie input, .temps input, .difficulte input");
    const recipes = document.querySelectorAll("#two figure");
    const themeToggle = document.querySelector(".lune"); // Bouton pour changer le thème
    let favorites = JSON.parse(localStorage.getItem("favorites")) || []; // Chargement des favoris

    /**
     * Fonction de filtrage des recettes en fonction de la recherche et des filtres cochés.
     */
    function filterRecipes() {
        const searchText = searchInput.value.toLowerCase().trim();
        const selectedFilters = { categorie: [], temps: [], difficulte: [] };

        for (const cb of checkboxes) {
            if (cb.checked) {
                if (cb.closest(".categorie")) selectedFilters.categorie.push(cb.parentNode.textContent.trim().toLowerCase());
                if (cb.closest(".temps")) selectedFilters.temps.push(cb.parentNode.textContent.trim().toLowerCase());
                if (cb.closest(".difficulte")) selectedFilters.difficulte.push(cb.parentNode.textContent.trim().toLowerCase());
            }
        }

        for (const recipe of recipes) {
            const title = recipe.querySelector("h2").textContent.toLowerCase();
            const info = [...recipe.querySelectorAll(".info p")].map(p => p.textContent.toLowerCase());

            const matchesSearch = title.includes(searchText);
            const matchesCategory = selectedFilters.categorie.length === 0 || selectedFilters.categorie.some(cat => info.includes(cat));
            const matchesTime = selectedFilters.temps.length === 0 || selectedFilters.temps.some(time => info.includes(time));
            const matchesDifficulty = selectedFilters.difficulte.length === 0 || selectedFilters.difficulte.some(diff => info.includes(diff));

            recipe.style.display = (matchesSearch && matchesCategory && matchesTime && matchesDifficulty) ? "block" : "none";
        }
    }

    /**
     * Fonction pour basculer entre le mode clair et sombre
     */
    function toggleTheme() {
        document.body.classList.toggle("dark-mode");

        // Sauvegarde du thème dans localStorage
        localStorage.setItem("theme", document.body.classList.contains("dark-mode") ? "dark" : "light");
    }

    /**
     * Fonction pour appliquer le thème enregistré dans localStorage
     */
    function applyTheme() {
        if (localStorage.getItem("theme") === "dark") {
            document.body.classList.add("dark-mode");
        }
    }

    /**
     * Fonction pour basculer une recette en favori
     */
    function toggleFavorite(event) {
        const recipe = event.currentTarget.closest("figure");
        const title = recipe.querySelector("h2").textContent;

        if (favorites.includes(title)) {
            favorites = favorites.filter(fav => fav !== title); // Supprimer des favoris
        } else {
            favorites.push(title); // Ajouter aux favoris
        }

        localStorage.setItem("favorites", JSON.stringify(favorites)); // Mise à jour du stockage
        updateFavoritesUI(); // Met à jour visuellement les favoris
    }

    /**
     * Fonction pour mettre à jour l'affichage des favoris
     */
    function updateFavoritesUI() {
        for (const recipe of recipes) {
            const title = recipe.querySelector("h2").textContent;
            const favButton = recipe.querySelector(".fav-btn");

            if (favorites.includes(title)) {
                favButton.textContent = "★"; // Icône favori rempli
                favButton.style.color = "gold"; // Changer la couleur en or
            } else {
                favButton.textContent = "☆"; // Icône non favori
                favButton.style.color = "black"; // Remettre en noir
            }
        }
    }

    /**
     * Fonction d'initialisation des boutons favoris
     */
    function initFavorites() {
        for (const recipe of recipes) {
            let favButton = recipe.querySelector(".fav-btn");

            if (!favButton) {
                favButton = document.createElement("button");
                favButton.classList.add("fav-btn");
                recipe.appendChild(favButton);
            }

            favButton.addEventListener("click", toggleFavorite);
        }

        updateFavoritesUI(); // Mise à jour de l'affichage initial
    }

    // Ajout des écouteurs d'événements
    searchInput.addEventListener("input", filterRecipes);
    for (const cb of checkboxes) {
        cb.addEventListener("change", filterRecipes);
    }
    
    themeToggle.addEventListener("click", toggleTheme); // Bascule du thème au clic

    // Appliquer les paramètres au chargement de la page
    filterRecipes();
    applyTheme();
    initFavorites();
});
