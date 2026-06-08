window.addEventListener('DOMContentLoaded', () => {

    const urlParams = new URLSearchParams(window.location.search);
    // Recuperiamo il valore di 'action' dall'URL (es: ?action=nether)
    const azioneRichiesta = urlParams.get('action'); 

    if (azioneRichiesta) {

        let bottoneDaCliccare = null;

        // Scegliamo il bottone corretto in base al testo preciso contenuto nell'URL
        if (azioneRichiesta === 'nether') {
            bottoneDaCliccare = document.querySelector('#nether-tab');
        } 
        else if (azioneRichiesta === 'overworld') {
            bottoneDaCliccare = document.querySelector('#overworld-tab');
        } 
        else if (azioneRichiesta === 'end') {
            bottoneDaCliccare = document.querySelector('#end-tab');
        }

        // Se abbiamo trovato il bottone corrispondente alla richiesta, lo clicchiamo
        if (bottoneDaCliccare) {
            bottoneDaCliccare.click();

            // Facciamo lo scroll verso la sezione principale del menu (che contiene i tab)
            const menuSection = document.querySelector('.menu-section');
            
            setTimeout(() => {
                if (menuSection) {
                    menuSection.scrollIntoView({ behavior: 'smooth' });
                }
            }, 300);
        }
    }
});