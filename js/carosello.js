// Seleziona tutti i radio button che hanno name="slider"
const slides = document.querySelectorAll('input[name="slider"]');
let currentIndex = Array.from(slides).findIndex(input => input.checked); 
const intervalTime = 4000; // 4 secondi di intervallo
let slideInterval = setInterval(nextSlide, intervalTime);

function nextSlide() {
  // Passa alla slide successiva (torna a 0 dopo l'ultima)
  currentIndex = (currentIndex + 1) % slides.length;
  slides[currentIndex].checked = true;
}

function prevSlide() {
  // Passa alla slide precedente (torna all'ultima se scende sotto lo zero)
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  slides[currentIndex].checked = true;
}

// Resetta il timer dell'autoplay per evitare cambi di slide troppo ravvicinati
function resetInterval() {
  clearInterval(slideInterval);
  slideInterval = setInterval(nextSlide, intervalTime);
}

// Gestione clic manuale sulle card del carosello
slides.forEach((input, index) => {
  input.addEventListener('change', () => {
    currentIndex = index;
    resetInterval();
  });
});

// Gestione clic sulle frecce direzionali
const prevArrow = document.querySelector('.prev-arrow');
const nextArrow = document.querySelector('.next-arrow');

if (nextArrow && prevArrow) {
  nextArrow.addEventListener('click', () => {
    nextSlide();
    resetInterval();
  });

  prevArrow.addEventListener('click', () => {
    prevSlide();
    resetInterval();
  });
}

// Ferma l'autoplay quando il mouse entra nel carosello e lo riavvia quando esce
const sliderBox = document.querySelector('.box-slider');
if (sliderBox) {
  sliderBox.addEventListener('mouseenter', () => clearInterval(slideInterval));
  sliderBox.addEventListener('mouseleave', () => {
    slideInterval = setInterval(nextSlide, intervalTime);
  });
}