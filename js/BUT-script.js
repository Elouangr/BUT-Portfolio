const container = document.querySelector(".cards-container");
let isScrollingEnabled = false;


document.querySelectorAll('.toggle-checkbox').forEach(checkbox => {
    checkbox.addEventListener('change', function() {
        const targetSection = document.getElementById(this.dataset.target);

        // Désactive toutes les autres checkboxes et cache leurs sections
        document.querySelectorAll('.toggle-checkbox').forEach(otherCheckbox => {
            if (otherCheckbox !== this) {
                otherCheckbox.checked = false;
                const otherSection = document.getElementById(otherCheckbox.dataset.target);
                if (otherSection) {
                    otherSection.classList.add('hidden');
                }
            }
        });

        // Affiche ou cache la section en fonction de l'état de la case
        if (targetSection) {
            if (this.checked) {
                targetSection.classList.remove('hidden');
                targetSection.scrollIntoView({
                    behavior: 'smooth', // Défilement fluide
                    block: 'start'      // Positionner la section en haut de la fenêtre
                });
            } else {
                targetSection.classList.add('hidden');
            }
        }
    });
});
container.addEventListener('mouseover', function() {
    isScrollingEnabled = true;
});

container.addEventListener('mouseout', function() {
    isScrollingEnabled = false;
});

container.addEventListener("wheel", function(event) {
    if (isScrollingEnabled) {
        // Empêche le défilement vertical
        event.preventDefault();
        // Déplace les cartes horizontalement
        container.scrollLeft += event.deltaY * 10; // Défilement horizontal basé sur la roue de la souris
    }
});
document.addEventListener("wheel", function(event) {
    if (isScrollingEnabled) {
        // Empêche le défilement vertical
        event.preventDefault();
        event.stopPropagation();
    }
});







// Sélection du conteneur des cartes
//const cardsContainer = document.querySelector('.cards-container');

// Écoute l'événement de scroll avec la molette de la souris
//window.addEventListener('wheel', (e) => {
//    e.preventDefault(); // Empêche le scroll vertical par défaut
//    cardsContainer.scrollLeft += e.deltaY; // Scroll horizontal basé sur deltaY
//});
