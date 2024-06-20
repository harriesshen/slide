let currentSlideIndex = 0;
const slides = document.querySelectorAll(".carousel-inner img");
const totalSlides = slides.length;
const currentSlideElement = document.getElementById("currentSlide");

function showSlide(slideIndex) {
  slides.forEach((slide) => {
    slide.classList.add("hidden");
  });
  slides[slideIndex].classList.remove("hidden");
  currentSlideElement.textContent = slideIndex + 1;
}

function prevSlide() {
  currentSlideIndex = (currentSlideIndex - 1 + totalSlides) % totalSlides;
  showSlide(currentSlideIndex);
}

function nextSlide() {
  currentSlideIndex = (currentSlideIndex + 1) % totalSlides;
  showSlide(currentSlideIndex);
}

showSlide(currentSlideIndex);
