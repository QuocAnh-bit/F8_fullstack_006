let timer = 0;
let count = 30;
let checkCount = false;
const INTERVAL = 1000; // 1000ms
const countEl = document.querySelector(".count span");
const btnLink = document.querySelector(".btn-link");
const handleCounter = function (currentTimer) {
  console.log(currentTimer);
  if (timer <= currentTimer) {
    count--;
    countEl.innerText = count;
    timer = currentTimer + INTERVAL;
  }
  if (count > 0) {
    requestAnimationFrame(handleCounter);
  }
  if (count === 0) {
    checkCount = true;
    btnLink.removeAttribute("disabled");
  }
};
btnLink.addEventListener("click", function () {
  if (checkCount) {
    window.location.href = "https://www.google.com";
  }
});
handleCounter();
