document.addEventListener("DOMContentLoaded", () => {
    // Cambiato a max-width: 1199.98px per escludere il millimetro dei 1200px ed evitare conflitti
    const isMobile = window.matchMedia("(max-width: 1199.98px)");
    const sections = document.querySelectorAll('.scroll-section');

    const observer = new IntersectionObserver((entries) => {
        // Se siamo su Desktop (>= 1200px), l'Observer non deve fare assolutamente nulla
        if (!isMobile.matches) return;

        entries.forEach(entry => {
            const image = entry.target.querySelector('.torch');
            const text = entry.target.querySelector('.torch-text');
            const grid = entry.target.closest('.torch-grid');
            
            if (!image || !text) return;

            const endSrc = image.dataset.endSrc;
            const startSrc = "img/body/ristorante/torcia-disattivata-lg.webp";

            if (entry.isIntersecting) {
                image.src = endSrc;
                text.classList.add('torch-text-active');
                grid.classList.add('act');
            } else {
                image.src = startSrc;
                text.classList.remove('torch-text-active');
                grid.classList.remove('act');
            }
        });
    }, {
        threshold: 0.6
    });

    // Avvia l'osservazione solo se siamo inizialmente in modalità mobile
    if (isMobile.matches) {
        sections.forEach(section => observer.observe(section));
    }

    // Gestiamo il ridimensionamento della finestra in tempo reale
    isMobile.addEventListener('change', (e) => {
        if (e.matches) {
            // Se scendiamo sotto i 1200px, riattiviamo l'Observer
            sections.forEach(section => observer.observe(section));
        } else {
            // Se saliamo sopra i 1200px, spegniamo l'Observer e resettiamo tutto
            sections.forEach(section => {
                observer.unobserve(section);
                const image = section.querySelector('.torch');
                const text = section.querySelector('.torch-text');
                const grid = section.closest('.torch-grid'); // Corretto il bug: cercava .torch-grid dentro la sezione, ma è un suo antenato/fratello
                
                if(image) image.src = "img/body/ristorante/torcia-disattivata-lg.webp";
                if(text) text.classList.remove('torch-text-active');
                if(grid) grid.classList.remove('act');
            });

            // Resettiamo anche lo stato visivo delle leve per sicurezza
            const tutteLeLeve = document.querySelectorAll('.lever');
            tutteLeLeve.forEach(leva => {
                leva.src = "img/body/ristorante/leva-alzata.webp";
                leva.srcset = "";
                // Resettiamo la proprietà custom del ciclo click dello script successivo
                leva.isLevaAlzata = true; 
            });
        }
    });
});