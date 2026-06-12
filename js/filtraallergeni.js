document.addEventListener("DOMContentLoaded", function () {
    // Seleziona le checkbox usando la classe corretta presente nell'HTML
    const checkboxes = document.querySelectorAll(".filtro-checkbox");
    const panini = document.querySelectorAll(".hamburger-card");

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener("change", filtraPanini);
    });

    function filtraPanini() {
        // Recupera i valori delle checkbox attualmente selezionate
        const filtriAttivi = Array.from(checkboxes)
            .filter(i => i.checked)
            .map(i => i.value);

        panini.forEach(panino => {
            // Recupera gli ingredienti associati al panino dall'attributo HTML
            const attrIngredienti = panino.getAttribute("data-ingredienti");
            const ingredientiPanino = attrIngredienti ? attrIngredienti.split(" ") : [];

            if (filtriAttivi.length === 0) {
                // Se non ci sono filtri attivi, mostra tutti i panini normalmente
                panino.classList.remove("filter-out");
            } else {
                // Controlla se il panino contiene ALMENO uno degli ingredienti selezionati
                const corrisponde = filtriAttivi.some(ingr => ingredientiPanino.includes(ingr));

                if (corrisponde) {
                    // Se corrisponde al filtro, rimuove l'effetto grigio
                    panino.classList.add("filter-out");
                } else {
                    // Se NON corrisponde, il panino diventa grigio
                    panino.classList.remove("filter-out");
                }
            }
        });
    }
});