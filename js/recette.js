document.addEventListener("DOMContentLoaded", () => {
    // Sélection des éléments nécessaires
    const recipes = document.querySelectorAll("figure");
    let favorites = JSON.parse(localStorage.getItem("favorites")) || []; // Chargement des favoris

    /**
     * Fonction pour basculer une recette en favori
     */
    function toggleFavorite(event) {
        const recipe = event.currentTarget.closest("figure"); // Récupère la recette
        const title = recipe.querySelector("h2").textContent; // Récupère le titre de la recette

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
            const title = recipe.querySelector("h2").textContent; // Récupère le titre de la recette
            const favButton = recipe.querySelector(".fav-btn"); // Récupère le bouton favori

            if (favorites.includes(title)) {
                favButton.classList.add("favorited"); // Ajoute la classe favori
            } else {
                favButton.classList.remove("favorited"); // Retire la classe favori
            }
        }
    }

    /**
     * Fonction d'initialisation des boutons favoris
     */
    function initFavorites() {
        for (const recipe of recipes) {
            const favButton = recipe.querySelector(".fav-btn");

            // Ajout d'un écouteur d'événements au bouton favori
            favButton.addEventListener("click", toggleFavorite);
        }

        updateFavoritesUI(); // Mise à jour de l'affichage initial
    }

    // Initialiser les favoris au chargement de la page
    initFavorites();
});
