document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card-3d');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -15;
            const rotateY = ((x - centerX) / centerX) * 15;

            card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        });
    });

    window.addEventListener('scroll', () => {
        const cards = document.querySelectorAll('.card-3d');
        const windowHeight = window.innerHeight;

        cards.forEach(card => {
            const rect = card.getBoundingClientRect();

            // Calcoliamo quanto la card è vicina al centro dello schermo (da 0 a 1)
            const cardCenterY = rect.top + rect.height / 2;
            const distanceFromCenter = (cardCenterY - windowHeight / 2) / (windowHeight / 2);

            // Limitiamo l'effetto: se la card è fuori vista, non calcoliamo nulla
            if (rect.top < windowHeight && rect.bottom > 0) {
                // L'inclinazione sull'asse X dipenderà dalla posizione verticale
                // Più è in alto, più si inclina "indietro", più è in basso, più "in avanti"

                // La card si inclina sia verticalmente che lateralmente mentre scivola via
                card.style.transform = `perspective(800px) rotateX(${distanceFromCenter * 10}deg) rotateY(${distanceFromCenter * 10}deg)`;
                card.style.transition = "transform 0.1s ease-out"; // Per rendere il movimento fluido
            }
        });
    });
});