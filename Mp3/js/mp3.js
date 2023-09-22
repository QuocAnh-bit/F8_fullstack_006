var progressBar = document.querySelector(".progress-bar");
var progress = progressBar.querySelector(".progress");
var progressDot = progress.querySelector(" span");
var progressBarWidth = progressBar.clientWidth;
var audio = document.querySelector("audio");
var currentTimeEl = progressBar.previousElementSibling;
var durationTimeEl = progressBar.nextElementSibling;

var isDrag = false;
var rate = 0;
var initialRate = 0;

progressBar.addEventListener("mousedown", function (e) {
  if (e.which === 1) {
    rate = (e.offsetX * 100) / progressBarWidth;
    progress.style.width = `${rate}%`;
    initialRate = rate;
    initialClientX = e.clientX;
    isDrag = true;
    console.log("dot22");
  }
});
progressDot.addEventListener("mousedown", function (e) {
  if (e.which === 1) {
    console.log("dot");
  }
});
