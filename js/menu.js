document.addEventListener("DOMContentLoaded", function () {
    const btnEnchant = document.getElementById("btn-enchant");
    const menuSection = document.getElementById("menu-section");

    btnEnchant.addEventListener("click", function () {
        menuSection.classList.toggle("enchanted-text");
        btnEnchant.classList.toggle("enchanted-text");
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                btnEnchant.classList.add("show-btn");
            } else {
                btnEnchant.classList.remove("show-btn");
            }
        });
    }, {
        threshold: 0.05
    });

    if (menuSection) {
        observer.observe(menuSection);
    }
});