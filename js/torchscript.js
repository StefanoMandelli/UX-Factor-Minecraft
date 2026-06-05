document.addEventListener("DOMContentLoaded", () => {
    // 1. Definiamo la condizione: larghezza massima 576px
    const isMobile = window.matchMedia("(max-width: 1200px)");

    const sections = document.querySelectorAll('.scroll-section');

    const observer = new IntersectionObserver((entries) => {
        // ESCI DALLA FUNZIONE se lo schermo è più grande di 576px
        if (!isMobile.matches) return;

        entries.forEach(entry => {
            const image = entry.target.querySelector('.torch');
            const text = entry.target.querySelector('.torch-text');
            
            // Verifichiamo che gli elementi esistano per evitare errori in console
            if (!image || !text) return;

            const endSrc = image.dataset.endSrc;
            const startSrc = "img/body/ristorante/torcia disattivata.png";

            if (entry.isIntersecting) {
                image.src = endSrc;
                text.classList.add('torch-text-active');
            } else {
                image.src = startSrc;
                text.classList.remove('torch-text-active');
            }
        });
    }, {
        threshold: 0.6
    });

    sections.forEach(section => {
        observer.observe(section);
    });

    // Opzionale: Reset degli stili se l'utente ridimensiona la finestra sopra i 576px
    isMobile.addEventListener('change', (e) => {
        if (!e.matches) {
            sections.forEach(section => {
                const image = section.querySelector('.torch');
                const text = section.querySelector('.torch-text');
                if(image) image.src = "img/body/ristorante/torcia disattivata.png";
                if(text) text.classList.remove('torch-text-active');
            });
        }
    });
});