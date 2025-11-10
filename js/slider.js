let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const totalSlides = slides.length;
let autoSlideInterval;

// === FUNCIÓN PRINCIPAL PARA MOSTRAR SLIDES ===
function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
  });
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
  currentSlide = index;
}

// === FUNCIÓN PARA AVANZAR AUTOMÁTICAMENTE ===
function nextSlide() {
  const nextIndex = (currentSlide + 1) % totalSlides;
  showSlide(nextIndex);
}

// === REINICIAR EL TEMPORIZADOR AUTOMÁTICO ===
function resetAutoSlide() {
  clearInterval(autoSlideInterval);
  autoSlideInterval = setInterval(nextSlide, 5000);
}

// === EVENTOS DE CLIC EN LOS PUNTOS ===
dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    showSlide(index);
    resetAutoSlide(); // Reinicia el tiempo al hacer clic
  });
});

// === MOSTRAR EL PRIMERO Y EMPEZAR ROTACIÓN ===
showSlide(currentSlide);
resetAutoSlide();
