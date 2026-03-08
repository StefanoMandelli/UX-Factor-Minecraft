document.addEventListener("DOMContentLoaded", () => {
    const section = document.querySelector('.scroll-section');
    const image = document.querySelector('.torch');
    const text = document.querySelector('.torch-text');

    // Salviamo la sorgente originale
    const originalSrc = image.src;
    const endSrc = image.dataset.endSrc;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Quando la sezione è visibile:
                image.src = endSrc;
                text.classList.add('torch-text-active');
            } else {
                // Opzionale: torna indietro quando esci dalla visuale
                image.src = originalSrc;
                text.classList.remove('torch-text-active');
            }
        });
    }, {
        threshold: 0.6 // L'effetto scatta quando il 60% della sezione è visibile
    });

    observer.observe(section);
});