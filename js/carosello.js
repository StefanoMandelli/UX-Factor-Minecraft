
  // Seleziona tutti i radio button che hanno name="slider"
  const slides = document.querySelectorAll('input[name="slider"]');
  let currentIndex = Array.from(slides).findIndex(input => input.checked); 
  const intervalTime = 4000; // 4 secondi tra uno scorrimento e l'altro

  function nextSlide() {
    // Calcola l'indice della prossima slide (0, 1, 2, 3, 4 e poi torna a 0)
    currentIndex = (currentIndex + 1) % slides.length;
    
    // Attiva il radio button corrispondente
    slides[currentIndex].checked = true;
  }

  // Avvia l'automatismo
  let slideInterval = setInterval(nextSlide, intervalTime);

  // GESTIONE INTERAZIONE UTENTE
  // Se l'utente clicca su una card, aggiorniamo l'indice per non far "saltare" il carosello
  slides.forEach((input, index) => {
    input.addEventListener('change', () => {
      currentIndex = index;
      // Reset del timer: l'autoplay riparte da zero dopo un clic manuale
      clearInterval(slideInterval);
      slideInterval = setInterval(nextSlide, intervalTime);
    });
  });

  // (Opzionale) Ferma il movimento quando il mouse è sopra il carosello
  const sliderBox = document.querySelector('.box-slider');
  sliderBox.addEventListener('mouseenter', () => clearInterval(slideInterval));
  sliderBox.addEventListener('mouseleave', () => {
    slideInterval = setInterval(nextSlide, intervalTime);
  });
