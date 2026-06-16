document.addEventListener("DOMContentLoaded", () => {
    const tutteLeLeve = document.querySelectorAll('.lever');

    tutteLeLeve.forEach(leva => {
        const srcLevaOriginale = leva.src;
        const srcsetLevaOriginale = leva.srcset;

        const srcLevaFinale = leva.getAttribute('data-end-src');
        const srcsetLevaFinale = leva.getAttribute('data-end-srcset');

        let isLevaAlzata = true;

        leva.addEventListener('click', function() {
            const rigaPadre = leva.closest('.row');
            
            const torchImage = rigaPadre.querySelector('.torch');
            const torchGrid = rigaPadre.querySelector('.torch-grid');
            const torchText = rigaPadre.querySelector('.torch-text');

            if (isLevaAlzata) {
                leva.src = srcLevaFinale;
                if (srcsetLevaFinale) leva.srcset = srcsetLevaFinale;
                
                if (torchText) {
                    torchText.classList.add('torch-text-active');
                    torchGrid.classList.add('act');
                }
                
                if (torchImage) {
                    torchImage.src = torchImage.dataset.endSrc; 
                }
                
                isLevaAlzata = false; 

            } else {
                leva.src = srcLevaOriginale;
                leva.srcset = srcsetLevaOriginale;
                
                if (torchText) {
                    torchText.classList.remove('torch-text-active');
                    torchGrid.classList.remove('act');
                }
                
                if (torchImage) {
                    torchImage.src = "img/body/ristorante/torcia-disattivata-lg.png";
                }
                
                isLevaAlzata = true;
            }
        });
    });
});