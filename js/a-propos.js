// Sélectionner le formulaire et les éléments
const form = document.querySelector('form');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const messageInput = document.querySelector('#message');

// Vérifier s'il y a déjà des données dans le localStorage et les pré-remplir
document.addEventListener('DOMContentLoaded', function() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData) {
        nameInput.value = userData.name || '';
        emailInput.value = userData.email || '';
        messageInput.value = userData.message || '';
    }
});

// Ajouter un gestionnaire d'événements pour la soumission du formulaire
form.addEventListener('submit', function (e) {
    e.preventDefault(); // Empêcher l'envoi du formulaire pour validation

    // Vérification de la validité des champs
    if (!nameInput.value.trim()) {
        alert('Veuillez entrer votre nom');
        return;
    }

    if (!emailInput.value.trim() || !validateEmail(emailInput.value)) {
        alert('Veuillez entrer un email valide');
        return;
    }

    if (!messageInput.value.trim()) {
        alert('Veuillez entrer un message');
        return;
    }

    // Si tous les champs sont valides, stocker les informations dans localStorage
    const userData = {
        name: nameInput.value,
        email: emailInput.value,
        message: messageInput.value
    };
    
    localStorage.setItem('userData', JSON.stringify(userData));

    // Afficher un message de succès
    alert('Message envoyé avec succès !');
    form.reset(); // Réinitialiser le formulaire
});

// Fonction pour valider l'email avec une expression régulière
function validateEmail(email) {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
}



// Sélectionner tous les éléments <details>
const detailsElements = document.querySelectorAll('details');

// Ajouter un gestionnaire d'événements à chaque élément <details>
detailsElements.forEach(details => {
    details.addEventListener('toggle', function () {
        const paragraph = details.querySelector('p');
        // Animer l'apparition du paragraphe
        if (details.open) {
            paragraph.style.opacity = 1; // Rendre visible
        } else {
            paragraph.style.opacity = 0; // Cacher
        }
    });
});
