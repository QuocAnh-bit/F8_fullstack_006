const containerWrapWidth =
  document.querySelector(".container-wrap").clientWidth;

const sideBarWidth = document.querySelector(".side-bar-right").clientWidth;
const musicPlay = document.querySelector(".music-play");

musicPlay.style.width = `${containerWrapWidth - sideBarWidth}px`;
