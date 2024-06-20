const list = document.querySelector(".slider .list");
const items = document.querySelectorAll(".slider .list .item");
const dots = document.querySelectorAll(".slider .dots li");
const prev = document.getElementById("prev");
const next = document.getElementById("next");

let active = 0;
let lengthItem = items.length - 1;

prev.addEventListener("click", () => {
  console.log("prev click");
  if (active - 1 < 0) active = lengthItem;
  else active -= 1;
  reloadSlider();
});

next.addEventListener("click", () => {
  console.log("next click");
  if (active + 1 > lengthItem) active = 0;
  else active += 1;
  reloadSlider();
});
// 輪播interval
let autoNextSlider = setInterval(() => {
  next.click();
}, 2000);
// 移動圖片
const reloadSlider = () => {
  // offsetLeft 與 relative 的距離
  let checkLeft = items[active].offsetLeft;
  console.log("left", checkLeft);
  list.style.left = -checkLeft + "px";

  const lastActiveDot = document.querySelector(".slider .dots .active");
  lastActiveDot.classList.remove("active");
  dots[active].classList.add("active");
  // 點擊時要重新設定interval 重新計時
  clearInterval(autoNextSlider);
  autoNextSlider = setInterval(() => {
    next.click();
  }, 2000);
};

dots.forEach((li, key) => {
  li.addEventListener("click", () => {
    active = key;
    reloadSlider();
  });
});
