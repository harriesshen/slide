const list = document.querySelector(".slider .list");
const items = document.querySelectorAll(".slider .list .item");
const dots = document.querySelectorAll(".slider .dots li");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
const second = 2000;
let active = 0;
let lengthItem = items.length - 1;
let autoNextSlider; // 輪播interval
prev.addEventListener("click", () => {
  if (active - 1 < 0) active = lengthItem;
  else active -= 1;
  reloadSlider();
});

next.addEventListener("click", () => {
  if (active + 1 > lengthItem) active = 0;
  else active += 1;
  reloadSlider();
});

autoNextSlider = setInterval(() => {
  next.click();
}, second);

// 移動圖片
const reloadSlider = () => {
  // offsetLeft 與 relative 的距離
  let checkLeft = items[active].offsetLeft;
  list.style.left = -checkLeft + "px";

  const lastActiveDot = document.querySelector(".slider .dots .active");
  lastActiveDot.classList.remove("active");
  dots[active].classList.add("active");
  // 點擊時要重新設定interval 重新計時
  clearInterval(autoNextSlider);

  autoNextSlider = setInterval(() => {
    next.click();
  }, second);
};

dots.forEach((li, key) => {
  li.addEventListener("click", () => {
    active = key;
    reloadSlider();
  });
});
