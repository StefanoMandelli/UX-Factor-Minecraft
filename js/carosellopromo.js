const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
// Selezioniamo le 3 card statiche
const cards = Array.from(document.querySelectorAll('.carousel-viewport .card'));

let isMoving = false;

function rotateCarousel(direction) {
    if (isMoving) return;
    isMoving = true;

    // Troviamo quale card ha attualmente le rispettive posizioni
    const centerCard = cards.find(c => c.classList.contains('center'));
    const leftCard = cards.find(c => c.classList.contains('left'));
    const rightCard = cards.find(c => c.classList.contains('right'));

    // Rimuoviamo tutte le classi di posizione e di attivazione
    cards.forEach(card => {
        card.classList.remove('left', 'center', 'right', 'active');
    });

    if (direction === 'next') {
        // Rotazione verso sinistra (avanti): 
        // Chi era al centro va a sinistra, chi era a destra va al centro, chi era a sinistra va a destra
        leftCard.classList.add('right');
        centerCard.classList.add('left');
        rightCard.classList.add('center', 'active');
    } else if (direction === 'prev') {
        // Rotazione verso destra (indietro):
        // Chi era al centro va a destra, chi era a sinistra va al centro, chi era a destra va a sinistra
        leftCard.classList.add('center', 'active');
        centerCard.classList.add('right');
        rightCard.classList.add('left');
    }

    // Coerente con il tempo di transizione CSS (0.5s = 500ms)
    setTimeout(() => {
        isMoving = false;
    }, 500);
}

// Event Listeners per i pulsanti desktop
nextBtn.addEventListener('click', () => rotateCarousel('next'));
prevBtn.addEventListener('click', () => rotateCarousel('prev'));

// Event Delegation per il clic diretto sulle card laterali
cards.forEach(card => {
    card.addEventListener('click', () => {
        if (isMoving) return;
        
        if (card.classList.contains('right')) {
            rotateCarousel('next');
        } else if (card.classList.contains('left')) {
            rotateCarousel('prev');
        }
    });
    // Swipe mobile
let touchStartX = 0;
let touchEndX = 0;

const viewport = document.querySelector('.carousel-viewport');

viewport.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

viewport.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) < 50) return; // soglia minima per evitare swipe accidentali
    
    if (diff > 0) {
        rotateCarousel('next'); // swipe a sinistra → avanti
    } else {
        rotateCarousel('prev'); // swipe a destra → indietro
    }
}
});