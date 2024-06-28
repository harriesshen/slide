document.addEventListener("DOMContentLoaded", function () {
  // 1. 取得圖片列表與圖片container
  const carouselTrack = document.querySelector(".carousel-track");
  const carouselImages = document.querySelectorAll(".carousel-image");
  const images = Array.from(carouselTrack.children);
  const dots = document.querySelectorAll(".carousel .dots li");
  let interval;
  // 2. 取得圖片寬度
  const imageWidth = images[0].getBoundingClientRect().width + 10; // 圖片寬度加上間距
  const originalImagesCount = images.length;
  // 3. 利用圖片列表找出實際呈現的圖片
  const realImages = [];
  carouselImages.forEach((node, index) => {
    if (!node.classList.contains("clone")) {
      realImages.push({ element: node, index: index });
    }
  });
  const startImageIndex = realImages[0].index;
  // 4. 定義開始圖片位置
  let currentIndex = startImageIndex;
  const lastImage = realImages.at(-1).index;
  // 5. 利用translate3d 移動到第一張實際圖片位置
  carouselTrack.style.transform = `translate3d(-${
    imageWidth * startImageIndex
  }px,0,0)`;
  // 移動dot
  function addActive(index) {
    if (realImages.findIndex((i) => i.index === index) !== -1)
      dots[realImages.findIndex((i) => i.index === index)].classList.add(
        "active"
      );
    carouselImages[index].classList.add("active");
  }
  // 刪除Active的dot和img
  function removeActive() {
    const dotsActive = document.querySelector(".carousel .dots li.active");
    const imgsActive = document.querySelectorAll(
      ".carousel-track .carousel-image.active"
    );
    dotsActive.classList.remove("active");
    imgsActive.forEach((img) => {
      img.classList.remove("active");
    });
  }

  function containerTransform(transition, transform) {
    carouselTrack.style.transition = transition;
    carouselTrack.style.transform = transform;
  }
  function moveCarousel() {
    removeActive();
    currentIndex = currentIndex + 1;
    // 移動到實際圖片位置
    containerTransform(
      "transform 0.5s ease",
      `translate3d(-${imageWidth * currentIndex}px,0,0)`
    );

    //  往後到clone的圖片後馬上回到第一張實際圖片位置
    if (currentIndex === lastImage + 1) {
      setTimeout(() => {
        containerTransform(
          "none",
          `translate3d(-${imageWidth * startImageIndex}px,0,0)`
        );
        addActive(startImageIndex);
        currentIndex = startImageIndex;
      }, 500);
    }
    addActive(currentIndex);

    setTimeout(() => {
      carouselTrack.style.transition = "";
      carouselTrack.style.scrollBehavior = "none";
    }, 500);
    clearInterval(interval);
    interval = setInterval(moveCarousel, 2000);
  }

  interval = setInterval(moveCarousel, 2000);

  dots.forEach((dot, index) =>
    dot.addEventListener("click", () => {
      console.log("click dot");
      currentIndex = index;
      moveCarousel();
    })
  );
});
