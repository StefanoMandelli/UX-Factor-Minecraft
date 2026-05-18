document.addEventListener("DOMContentLoaded", () => {
    const tutteLeLeve = document.querySelectorAll('.lever');

    tutteLeLeve.forEach(leva => {
        // Salviamo il percorso originale della leva
        const srcLevaOriginale = leva.src;
        const srcLevaFinale = leva.getAttribute('data-end-src');

        leva.addEventListener('click', function() {
            // 1. Troviamo la riga (row) che contiene sia la leva che la card
            const rigaPadre = leva.closest('.row');
            
            // 2. Cerchiamo gli elementi dentro questa specifica riga
            const torchImage = rigaPadre.querySelector('.torch');
            const torchText = rigaPadre.querySelector('.torch-text');

            // 3. Verifichiamo lo stato attuale della leva per fare lo switch
            if (leva.src.includes(srcLevaOriginale)) {
                // --- STATO ATTIVO ---
                leva.src = srcLevaFinale;
                
                if (torchText) torchText.classList.add('torch-text-active');
                
                // Se vuoi cambiare anche l'immagine della torcia interna alla card:
                if (torchImage) {
                    torchImage.src = torchImage.dataset.endSrc; 
                }
            } else {
                // --- STATO DISATTIVATO ---
                leva.src = srcLevaOriginale;
                
                if (torchText) torchText.classList.remove('torch-text-active');
                
                if (torchImage) {
                    torchImage.src = "img/body/ristorante/torcia disattivata lg.png";
                }
            }
        });
    });
});