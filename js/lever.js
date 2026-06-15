document.addEventListener("DOMContentLoaded", () => {
    const tutteLeLeve = document.querySelectorAll('.lever');

    tutteLeLeve.forEach(leva => {
        // 1. Salviamo i valori ORIGINALI (sia src che srcset)
        const srcLevaOriginale = leva.src;
        const srcsetLevaOriginale = leva.srcset;

        // 2. Recuperiamo i valori FINALI dai data-attributes
        const srcLevaFinale = leva.getAttribute('data-end-src');
        const srcsetLevaFinale = leva.getAttribute('data-end-srcset');

        // Usiamo una variabile di stato (booleana) invece di controllare le stringhe delle URL
        let isLevaAlzata = true;

        leva.addEventListener('click', function() {
            // Troviamo la riga (row) che contiene sia la leva che la card
            const rigaPadre = leva.closest('.row');
            
            // Cerchiamo gli elementi dentro questa specifica riga
            const torchImage = rigaPadre.querySelector('.torch');
            const torchText = rigaPadre.querySelector('.torch-text');

            if (isLevaAlzata) {
                // --- ATTIVAZIONE (LA LEVA VA GIÙ) ---
                leva.src = srcLevaFinale;
                if (srcsetLevaFinale) leva.srcset = srcsetLevaFinale; // Aggiorna srcset se esiste
                
                if (torchText) torchText.classList.add('torch-text-active');
                
                if (torchImage) {
                    torchImage.src = torchImage.dataset.endSrc; 
                    // Se anche la torcia userà srcset in futuro, potrai aggiornare anche lei qui
                }
                
                isLevaAlzata = false; // Cambiamo lo stato
            } else {
                // --- DISATTIVAZIONE (LA LEVA TORNA SU) ---
                leva.src = srcLevaOriginale;
                leva.srcset = srcsetLevaOriginale; // Ripristina il srcset originale
                
                if (torchText) torchText.classList.remove('torch-text-active');
                
                if (torchImage) {
                    // Nota: ricordati di convertire in .webp anche questa torcia appena puoi!
                    torchImage.src = "img/body/ristorante/torcia-disattivata-lg.png";
                }
                
                isLevaAlzata = true; // Cambiamo lo stato
            }
        });
    });
});