document.addEventListener("DOMContentLoaded", () => {
    console.log("Script chargé et DOM prêt");

    const favoritesContainer = document.querySelector("main section"); // La section où les recettes sont affichées
    let favorites = JSON.parse(localStorage.getItem("favorites")) || []; // Chargement des favoris depuis localStorage

    // Affichage des favoris
    displayFavorites();

    /**
     * Fonction pour afficher les favoris
     */
    function displayFavorites() {
        favoritesContainer.innerHTML = ""; // Réinitialiser la section avant de réafficher les favoris

        if (favorites.length === 0) {
            favoritesContainer.innerHTML = "<p>Aucun favori pour le moment.</p>";
            return;
        }

        favorites.forEach(title => {
            const recipe = createRecipeElement(title); // Créer un élément de recette
            favoritesContainer.appendChild(recipe);
        });
    }

    /**
     * Crée un élément pour afficher chaque recette favorite
     * @param {string} title - Titre de la recette favorite
     * @returns {HTMLElement} - Un élément de recette HTML
     */
    function createRecipeElement(title) {
        const figure = document.createElement("figure");

        // Exemple d'éléments pour une recette (modifie selon tes besoins)
        const img = document.createElement("img");
        img.src = "assets/images/burger_resized.jpg"; // Image de la recette
        img.alt = title;

        const heartIcon = document.createElement("svg");
        heartIcon.classList.add("coeur");
        heartIcon.setAttribute("width", "25");
        heartIcon.setAttribute("height", "30");
        heartIcon.setAttribute("fill", "red");
        heartIcon.innerHTML = `<path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>`;

        const trashIcon = document.createElement("svg");
        trashIcon.classList.add("poubelle");
        trashIcon.setAttribute("width", "25");
        trashIcon.setAttribute("height", "25");
        trashIcon.setAttribute("fill", "currentColor");
        trashIcon.innerHTML = `<path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>`;

        const caption = document.createElement("figcaption");
        const h2 = document.createElement("h2");
        h2.textContent = title;
        caption.appendChild(h2);

        const info = document.createElement("div");
        info.classList.add("info");
        info.innerHTML = "<p>Sandwich</p><p>30min</p><p>Facile</p>"; // Informations sur la recette
        caption.appendChild(info);

        // Ajoute les icônes au figure
        figure.appendChild(img);
        figure.appendChild(heartIcon);
        figure.appendChild(trashIcon);
        figure.appendChild(caption);

        // Ajout d'un événement de suppression pour l'icône poubelle
        trashIcon.addEventListener("click", () => {
            removeFavorite(title);
        });

        return figure;
    }

    /**
     * Fonction pour supprimer un favori
     * @param {string} title - Titre de la recette à supprimer
     */
    function removeFavorite(title) {
        favorites = favorites.filter(fav => fav !== title); // Supprime le favori de la liste
        localStorage.setItem("favorites", JSON.stringify(favorites)); // Mise à jour du localStorage
        displayFavorites(); // Met à jour l'affichage des favoris
    }
});
