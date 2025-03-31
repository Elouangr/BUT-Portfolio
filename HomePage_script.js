

const buble = document.createElement("div");

const menu_nav = document.querySelectorAll('nav,header,button');



buble.classList.add("cursor-buble");
document.body.appendChild(buble); 

// Options de l'IntersectionObserver


function getInvertedColor(x, y) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    ctx.drawImage(document.body, 0, 0, canvas.width, canvas.height);
    const pixel = ctx.getImageData(x, y, 1, 1).data;

    // Inversion de la couleur
    const invertedColor = `rgb(${255 - pixel[0]}, ${255 - pixel[1]}, ${255 - pixel[2]})`;
    return invertedColor;
}

function updateColor() {
    const rect = buble.getBoundingClientRect();
    const color = getInvertedColor(rect.left + rect.width / 2, rect.top + rect.height / 2);
    buble.style.backgroundColor = color;
}

window.addEventListener('mousemove', (e) => {

    const mouseX = e.clientX + window.scrollX ;
    const mouseY = e.clientY + window.scrollY ;

    const dx = mouseX - buble.offsetLeft - buble.offsetWidth / 2;
    const dy = mouseY - buble.offsetTop - buble.offsetHeight / 2;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Changement d'état en fonction de la distance
    //if (distance < 30) {
        //buble.classList.add('deformed'); // Active la déformation
        //buble.style.transform = "scale(0.2)"
        
    //} else {
        //buble.classList.remove('deformed'); // Reprend sa forme originale
       // buble.style.transform = "scale(1)"
    //}

    buble.style.left = `${mouseX - 25}px`;
    buble.style.top = `${mouseY - 25}px`;
    buble.style.opacity = 1;
    buble.style.transition = "1000";
    
    updateColor();

});



document.addEventListener("mouseout", (e) => {
    buble.style.opacity = 0
})

document.addEventListener("wheel", (e) => {
    const rect = buble.getBoundingClientRect();

    buble.style.left = rect.left + window.scrollX;;
    buble.style.top = rect.top + window.scrollY;
})
menu_nav.forEach(menu => {

menu.addEventListener('mouseover', () => {
    buble.classList.add('active'); // Ajouter la classe 'active' pour l'effet
    buble.classList.remove('disactive');
});

// Ajouter un écouteur d'événement 
menu.addEventListener('mouseout', () => {
    buble.classList.remove('active'); // arrêter l'effet
    buble.classList.add('disactive');
});

})


// Référence au texte à déplacer

// Référence au texte à déplacer
const textElement = document.getElementById('moving-text');

// Fonction pour gérer le défilement du texte uniquement quand on est sur section2
const handleScroll = () => {
    // Vérifie si la section2 est dans la vue
    const section = document.getElementById('section2');
    const sectionRect = section.getBoundingClientRect();

    // Si la section2 est dans la vue (le bas de la section2 est visible)
    if (sectionRect.top < window.innerHeight && sectionRect.bottom > 0) {
        // Déplacer le texte en fonction de la position du scroll
        const scrollPosition = window.scrollY;
        textElement.style.transform = `translateX(-${scrollPosition * 0.5}px)`;  // Ajuster la vitesse du défilement
    }
};

// Observer de l'intersection pour détecter la visibilité de la section2
const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
        // Quand la section2 est dans la vue
        if (entry.isIntersecting) {
            // Ajouter une classe ou effectuer une action si nécessaire
            entry.target.classList.add('animate-text-slide-up');
        } else {
            // Retirer la classe ou désactiver l'animation quand la section2 sort de la vue
            entry.target.classList.remove('animate-text-slide-up');
        }
    });
};

// Configurer l'IntersectionObserver
const options = {
    root: null, // Par défaut, l'élément observé est par rapport au viewport
    rootMargin: '0px',
    threshold: 0.1, // Observer quand 10% de la section2 est visible
};

// Créer l'observer
const observer = new IntersectionObserver(observerCallback, options);

// Observer pour la section2 spécifique
const section2 = document.getElementById('section2');
observer.observe(section2);

// Écouter l'événement de défilement
window.addEventListener('scroll', handleScroll);




//////////////////////////////////////////////
document.addEventListener("DOMContentLoaded", () => {
    const checkboxes = document.querySelectorAll(".card-select-checkbox input[type='checkbox']");

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener("change", () => {
            if (checkbox.checked) {
                checkboxes.forEach(otherCheckbox => {
                    if (otherCheckbox !== checkbox) {
                        otherCheckbox.checked = false;
                    }
                });
            }
        });
    });
});


///////////////////////////////////////////////

document.addEventListener("DOMContentLoaded", () => {
    const aboutMeBlock = document.querySelector(".aboutme-block-text");
    const spans = aboutMeBlock.querySelectorAll("span");
    const hiddenContent = aboutMeBlock.querySelector(".hidden-content");

    // Ajouter une variable pour vérifier si l'animation a déjà été effectuée
    let isAnimated = false;

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            // Vérifier si la section est dans la vue et si l'animation n'a pas encore été lancée
            if (entry.isIntersecting && !isAnimated) {
                // Lancer l'animation de la section
                aboutMeBlock.style.animation = "scale-content 1s 4s both";
                
                // Lancer l'animation pour chaque span
                spans.forEach((span, index) => {
                    span.style.animation = `growFont 4s ease-out ${index * 0.2}s forwards`;
                });

                // Afficher le contenu caché après l'animation
                hiddenContent.style.display = "flex";  // Affiche le texte et l'image
                isAnimated = true;  // Marque que l'animation a été lancée
            }
        });
    }, { threshold: 0.5 });

    // Observer la section
    observer.observe(aboutMeBlock);
});
