document.addEventListener("DOMContentLoaded", function () {
    const switcherContainer = document.getElementById("language-switcher");
    const menuSection = document.getElementById("menu-section");
    const bottoniLingua = document.querySelectorAll(".btn-lang");

    function cambiaLingua(lingua) {
        const elementi = document.querySelectorAll("[data-i18n]");
        elementi.forEach(elemento => {
            const chiave = elemento.getAttribute("data-i18n");
            if (dizionario[lingua] && dizionario[lingua][chiave]) {
                elemento.textContent = dizionario[lingua][chiave];
            }
        });
    }

    bottoniLingua.forEach(bottone => {
        bottone.addEventListener("click", function() {

            bottoniLingua.forEach(b => b.classList.remove("inverted"));
            this.classList.add("inverted");

            
            const selezione = this.getAttribute("data-lang");
            if (selezione === "gal") {
                menuSection.classList.add("enchanted-text");
            } else {
                menuSection.classList.remove("enchanted-text");
                cambiaLingua(selezione);
            }
        });
    });

    if (switcherContainer && menuSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    switcherContainer.classList.add("show-btn");
                } else {
                    switcherContainer.classList.remove("show-btn");
                }
            });
        }, {
            threshold: 0.05
        });

        observer.observe(menuSection);
    }

});

// Il dizionario
const dizionario = {
    "it": {
        "sub-price-special": "Scopri questo panino nelle diverse versioni a partire da:",
        "special-description": "Riempi il tuo inventario con la nuova Stack Series!",
        "special-overworld-subdescription": "Il GreenStack racchiude la freschezza dell'Overworld in un blocco compatto: soffice pane al muschio e ingredienti naturali per una saturazione massima, ideale per chi vuole esplorare la superficie.",
        "special-button": "SCOPRI LA NOVITÁ",
        "fornace": "Fornace",
        "sub-price": "Disponibile in diverse versioni a partire da: ",
        "alambicco": "Alambicco",
        "alb-o-1": "Calda come la TNT nascosta nel Tempio del Deserto",
        "alb-o-2": "Gela più della Neve Farinosa senza stivali in pelle",
        "alb-o-3": "Intricata come le liane in un Tempio della Giungla",
        "arnia": "Arnia",
        "arnia-o-1": "Cotto dal sole, dura come la Terracotta indurita",
        "arnia-o-2": "Limpido come l'aria rarefatta al limite di costruzione",
        "arnia-o-3": "Così delicato che serve Tocco di Velluto per raccoglierlo"
    },
    "en": {
        "sub-price-special": "Discover it in different versions starting from:",
        "special-description": "Fill your inventory with the new Stack Series!",
        "special-overworld-subdescription": "The GreenStack encapsulates the freshness of the Overworld in a compact block: soft mossy bread and natural ingredients for maximum saturation, ideal for those who want to explore the surface.",
        "special-button": "DISCOVER THE NEW",
        "fornace": "Furnace",
        "sub-price": "Available in different versions starting from: ",
        "alambicco": "Brewing Stand",
        "alb-o-1": "Hot as TNT hidden in the Desert Temple",
        "alb-o-2": "Colder than Powder Snow without leather boots",
        "alb-o-3": "Intricate as vines in a Jungle Temple",
        "arnia": "Beehive",
        "arnia-o-1": "Sun-baked, hard as hardened Terracotta",
        "arnia-o-2": "Clear as the rarefied air at build limit",
        "arnia-o-3": "So delicate it requires Silk Touch to collect"
    }
};