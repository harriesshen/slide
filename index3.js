document.addEventListener("DOMContentLoaded", function () {
  // 1. 取得圖片列表與圖片container
  const carouselTrack = document.querySelector(".carousel-track");
  const carouselImages = document.querySelectorAll(".carousel-image");
  const images = Array.from(carouselTrack.children);
  const dots = document.querySelectorAll(".carousel .dots li");
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
  // 4. 定義開始圖片位置
  let currentIndex = realImages[0].index;
  let prevIndex = currentIndex;
  const lastImage = realImages.at(-1).index;
  // 5. 利用translate3d 移動到第一張實際圖片位置
  carouselTrack.style.transform = `translate3d(-${
    imageWidth * realImages[0].index
  }px,0,0)`;

  function moveDot(index, type = "") {
    if (type === "remove") {
      dots[index].classList.remove("active");
      return;
    }
    dots[index].classList.add("active");
  }

  function moveCarousel() {
    prevIndex = currentIndex;
    currentIndex = currentIndex + 1;
    //  往後到clone的圖片後馬上回到第一張實際圖片位置
    if (currentIndex === lastImage + 1) {
      setTimeout(() => {
        carouselTrack.style.transition = "none";
        carouselTrack.style.scrollBehavior = "none";
        carouselTrack.style.transform = `translate3d(-${
          imageWidth * realImages[0].index
        }px,0,0)`;
        carouselImages[realImages[0].index].classList.add("active");
        moveDot(realImages.findIndex((i) => i.index === realImages[0].index));
        moveDot(
          realImages.findIndex((i) => i.index === prevIndex),
          "remove"
        );
        carouselImages[lastImage + 1].classList.remove("active"); // 刪除clone圖片的active
        currentIndex = realImages[0].index;
      }, 500);
    }
    // 移動到實際圖片位置
    carouselTrack.style.transition = "transform 0.5s ease ";
    carouselTrack.style.transform = `translate3d(-${
      imageWidth * currentIndex
    }px,0,0)`;
    carouselImages[currentIndex].classList.add("active");
    console.log("realImages", realImages);
    if (realImages.findIndex((i) => i.index === currentIndex) !== -1) {
      moveDot(realImages.findIndex((i) => i.index === currentIndex));
      moveDot(
        realImages.findIndex((i) => i.index === prevIndex),
        "remove"
      );
    }

    setTimeout(() => {
      carouselTrack.style.transition = "";
      carouselTrack.style.scrollBehavior = "none";
      carouselImages[prevIndex].classList.remove("active");
    }, 500);
  }

  setInterval(moveCarousel, 2000);
});
