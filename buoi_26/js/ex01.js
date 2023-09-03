var progressBar = document.querySelector(".progress-bar");
var progress = document.querySelector(".progress");
var progressDot = document.querySelector(".progress span");
var progressBarWidth = progressBar.clientWidth;
// audio
var audio = document.querySelector(".audio");
var currentTimeEl = progressBar.previousElementSibling;
var durationTimeEl = progressBar.nextElementSibling;

//  xử lý  sự kiện kéo
var isDrag = false;
var initialClientX = 0; /// giá trị ban đầu của ClientX
var initialRate = 0; // Tỷ lệ ban đầu
var rate = 0; // tỷ lệ

var handleChange = function (value) {
  value = (audio.duration * value) / 100;
  // Tính tỉ lệ của value xem chiếm bao nhiêu phần trăm của tổng thời gian
  audio.currentTime = value;
  // gán cho thời gian chạy hiện tại
};

// Xử lý sự kiện khi ấn chuột vào thanh bar
progressBar.addEventListener("mousedown", function (e) {
  // Tinh ty le vi tri click voi width
  rate = (e.offsetX * 100) / progressBarWidth;
  handleChange(rate);
  progress.style.width = `${rate}%`;
  initialRate = rate; // Giá trị ban đầu
  isDrag = true;
  initialClientX = e.clientX; // tọa độ ban đầu
});

// Xử lý sự kiện khi ấn chuột vào dot
progressDot.addEventListener("mousedown", function (e) {
  e.stopPropagation(); // Nếu không có hàm này thì k chọn được vào nút chỉ chọn được vào thanh bar
  isDrag = true;
  initialClientX = e.clientX;
  // tọa đô kích chuột của dot
});

// Xử lý sự kiện khi kéo chuột
document.addEventListener("mousemove", function (e) {
  if (isDrag) {
    var space = e.clientX - initialClientX; // clineX mới nhất trừ đi clientX ban đầu  => khoảng cách kéo
    console.log(e.clientX, initialClientX, space);
    rate = (space * 100) / progressBarWidth + initialRate; // tỉ lệ % của space với thanh bar + thêm khoảng đã trừ
    if (rate >= 0 && rate <= 100) {
      progress.style.width = `${rate}%`;
    }
  }
});
document.addEventListener("mouseup", function (e) {
  isDrag = false;
  initialRate = rate;
  handleChange(initialRate);
});

// khi bam chuot vao cham mau tim
// lay duoc clientX tai vi tri bam chuot
// Khi keo chuot lay dc clientX vi tri gan nhat (keo den dau lay den day )
// Tính khoảng cahcs kéo clientX mới nhất - vị trí ban dầu khi click

var playBtn = document.querySelector(".player-btn");
var playIcon = `<i class="fa-solid fa-play"></i>`;
var pauseIcon = `<i class="fa-solid fa-pause"></i>`;
var getTime = function (seconds) {
  var min = Math.floor(seconds / 60);
  seconds = Math.floor(seconds - min * 60);
  return `${min < 10 ? "0" + min : min} : ${
    seconds < 10 ? "0" + seconds : seconds
  }`;
};
audio.addEventListener("loadeddata", function () {
  durationTimeEl.innerText = getTime(audio.duration);
});

playBtn.addEventListener("click", function (e) {
  e.stopPropagation(); // Nếu không có hàm này thì k chọn được vào nút chỉ chọn được vào thanh bar

  if (audio.paused) {
    audio.play();
    this.innerHTML = pauseIcon;
  } else {
    audio.pause();
    this.innerHTML = playIcon;
  }
});

audio.addEventListener("timeupdate", function (e) {
  // nếu không check ở đây sẽ xảy ra việc tranh nhau chạy
  if (!isDrag) {
    currentTimeEl.innerText = getTime(this.currentTime);
    // tính tỷ lệ %
    rate = (this.currentTime / this.duration) * 100;
    progress.style.width = `${rate}%`;
    // console.log(rate);
  }
});
var timer = progressBar.querySelector(".timer");

progressBar.addEventListener("mousemove", function (e) {
  timer.style.left = `${e.offsetX}px`;
  timer.style.display = "block";
  // Tính tỉ lệ của timer so với width của progressBar
  var rateTimer = (e.offsetX * 100) / progressBarWidth;
  // Tính tỉ lệ xem rateTimer chiếm bao nhiêu phần trăm trong tổng thời gian
  var rate = (audio.duration * rateTimer) / 100;
  timer.innerText = getTime(rate);
});
progressBar.addEventListener("mouseout", function (e) {
  timer.style.display = "none";
});
progressDot.addEventListener("mousemove", function (e) {
  e.stopPropagation();
});
audio.addEventListener("ended", function () {
  progress.style.width = 0;
  this.currentTime = 0;
  playBtn.innerHTML = playIcon;
  rate = 0;
});
