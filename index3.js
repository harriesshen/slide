document.addEventListener("DOMContentLoaded", function () {
  // 往右移動 移除第一個img 新增第一個img在最後面
  // 取得全部圖片src
  const carouselTrack = document.querySelector(".carousel-track");
  const carouselImages = document.querySelectorAll(".carousel-image");
  const images = Array.from(carouselTrack.children);
  const imageWidth = images[0].getBoundingClientRect().width + 10; // 圖片寬度加上間距
  const originalImagesCount = images.length;
  let currentIndex = 2;
  let prevIndex = 0;

  function moveCarousel() {
    prevIndex = currentIndex;
    currentIndex = (currentIndex + 1) % originalImagesCount;
    if (currentIndex === 6) {
      setTimeout(() => {
        // carouselTrack.appendChild(carouselImages[prevIndex]);
        carouselTrack.style.transition = "none";
        carouselTrack.style.scrollBehavior = "none";
        carouselTrack.style.transform = `translate3d(-620px,0,0)`;
        carouselImages[2].classList.add("active");
        currentIndex = 2;
      }, 300);
    }
    carouselTrack.style.transition = "transform 0.5s ease ";
    // carouselTrack.style.scrollBehavior = "smooth";
    carouselTrack.style.transform = `translate3d(-${
      imageWidth * currentIndex
    }px,0,0)`;
    carouselImages[currentIndex].classList.add("active");
    setTimeout(() => {
      carouselTrack.style.transition = "";
      carouselTrack.style.scrollBehavior = "none";
      carouselImages[prevIndex].classList.remove("active");
    }, 500);
    console.log("currentIndex", currentIndex);

    // if (currentIndex > 4) {
    //   setTimeout(() => {
    //     carouselTrack.style.transition = "none";
    //     carouselTrack.style.transform = ``;
    //     currentIndex = 0;
    //   }, 500); // 確保過渡結束
    // }
  }

  setInterval(moveCarousel, 2000);
});
