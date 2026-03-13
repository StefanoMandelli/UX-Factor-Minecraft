document.addEventListener('DOMContentLoaded', () => {
    // Selezioniamo specificamente la tua card Greenstack
    const cards = document.querySelectorAll('.greenstack-burger-card');

    cards.forEach(card => {
        // Effetto al movimento del mouse
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            // Calcolo rotazione (15 gradi di inclinazione massima)
            const rotateX = ((y - centerY) / centerY) * -15;
            const rotateY = ((x - centerX) / centerX) * 15;

            // Applichiamo la trasformazione
            // Rimuoviamo la transition durante il mousemove per non avere ritardi nel "seguire" il cursore
            card.style.transition = "none";
            card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        // Reset quando il mouse esce dalla card
        card.addEventListener('mouseleave', () => {
            // Aggiungiamo una transition fluida per tornare alla posizione originale
            card.style.transition = "transform 0.5s ease";
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        });
    });

    // Effetto inclinazione durante lo Scroll
    window.addEventListener('scroll', () => {
        const windowHeight = window.innerHeight;

        cards.forEach(card => {
            const rect = card.getBoundingClientRect();

            // Calcolo posizione rispetto al centro dello schermo
            const cardCenterY = rect.top + rect.height / 2;
            const distanceFromCenter = (cardCenterY - windowHeight / 2) / (windowHeight / 2);

            // Applichiamo l'effetto solo se la card è visibile
            if (rect.top < windowHeight && rect.bottom > 0) {
                card.style.transition = "transform 0.2s ease-out"; 
                card.style.transform = `perspective(800px) rotateX(${distanceFromCenter * 5}deg)`;
            }
        });
    });
});