document.addEventListener("DOMContentLoaded", () => {
    const isMobile = window.matchMedia("(max-width: 1200px)");

    const sections = document.querySelectorAll('.scroll-section');

    const observer = new IntersectionObserver((entries) => {
        if (!isMobile.matches) return;

        entries.forEach(entry => {
            const image = entry.target.querySelector('.torch');
            const text = entry.target.querySelector('.torch-text');
            const grid = entry.target.closest('.torch-grid');
            
            if (!image || !text) return;

            const endSrc = image.dataset.endSrc;
            const startSrc = "img/body/ristorante/torcia disattivata.png";

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

    sections.forEach(section => {
        observer.observe(section);
    });

    isMobile.addEventListener('change', (e) => {
        if (!e.matches) {
            sections.forEach(section => {
                const image = section.querySelector('.torch');
                const text = section.querySelector('.torch-text');
                const grid = section.querySelector('.torch-grid');
                if(image) image.src = "img/body/ristorante/torcia disattivata.png";
                if(text) text.classList.remove('torch-text-active');
                if(grid) grid.classList.remove('act');
            });
        }
    });
});