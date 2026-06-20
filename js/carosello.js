
  const slides = document.querySelectorAll('input[name="slider"]');
  let currentIndex = Array.from(slides).findIndex(input => input.checked); 
  const intervalTime = 4000; // 4 secondi tra uno scorrimento e l'altro

  function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    
    slides[currentIndex].checked = true;
  }

  let slideInterval = setInterval(nextSlide, intervalTime);

  // GESTIONE INTERAZIONE UTENTE
  slides.forEach((input, index) => {
    input.addEventListener('change', () => {
      currentIndex = index;
      // Reset del timer: l'autoplay riparte da zero dopo un clic manuale
      clearInterval(slideInterval);
      slideInterval = setInterval(nextSlide, intervalTime);
    });
  });

  const sliderBox = document.querySelector('.box-slider');
  sliderBox.addEventListener('mouseenter', () => clearInterval(slideInterval));
  sliderBox.addEventListener('mouseleave', () => {
    slideInterval = setInterval(nextSlide, intervalTime);
  });
