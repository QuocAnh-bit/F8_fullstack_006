const progressBar = document.querySelector(".progress-bar");
const progress = progressBar.querySelector(".progress");
const progressDot = progress.querySelector(" span");
const progressBarWidth = progressBar.clientWidth;
const audio = document.querySelector("audio");
let currentTimeEl = progressBar.previousElementSibling;
let durationTimeEl = progressBar.nextElementSibling;

let isDrag = false;
let rate = 0;
let initialRate = 0;
let initialClientX = 0;

const handleChange = function (value) {
  value = (value / 100) * audio.duration;
  audio.currentTime = value;
};
progressBar.addEventListener("mousedown", function (e) {
  if (e.which === 1) {
    isDrag = true;

    rate = (e.offsetX * 100) / progressBarWidth;
    progress.style.width = `${rate}%`;
    initialRate = rate;
    initialClientX = e.clientX;
    handleChange(rate);
  }
});
// progressBar.addEventListener("mousemove", function (e) {
//   progressDot.classList.add("show-dot");
// });
progressDot.addEventListener("mousedown", function (e) {
  e.stopPropagation();
  if (e.which === 1) {
    isDrag = true;
    initialClientX = e.clientX;
  }
});

document.addEventListener("mousemove", function (e) {
  e.preventDefault();
  if (isDrag) {
    let space = e.clientX - initialClientX;
    rate = (space * 100) / progressBarWidth + initialRate;
    if (rate < 0) {
      rate = 0;
    }
    if (rate > 100) {
      rate = 100;
    }
    progress.style.width = `${rate}%`;
    let currentTime = (rate / 100) * audio.duration;
    currentTimeEl.innerText = getTime(currentTime);
  }
});
document.addEventListener("mouseup", function () {
  if (isDrag) {
    isDrag = false;
    initialRate = rate;
    handleChange(initialRate);
  }
});

const playBtn = document.querySelector(".play-btn button");
const playIcon = `<i class="fa-solid fa-play"></i>`;
const pauseIcon = `<i class="fa-solid fa-pause"></i>`;

const getTime = function (seconds) {
  let min = Math.floor(seconds / 60);
  seconds = Math.floor(seconds - min * 60);

  return `${min < 10 ? "0" + min : min}:${
    seconds < 10 ? "0" + seconds : seconds
  }`;
};

if (audio.readyState > 0) {
  durationTimeEl.innerText = getTime(this.duration);
}

audio.addEventListener("loadeddata", function () {
  durationTimeEl.innerText = getTime(this.duration);
});

playBtn.addEventListener("click", function (e) {
  e.stopPropagation();
  if (audio.paused) {
    audio.play();
    this.innerHTML = pauseIcon;
  } else {
    audio.pause();
    this.innerHTML = playIcon;
  }
});

audio.addEventListener("timeupdate", function () {
  if (!isDrag) {
    currentTimeEl.innerText = getTime(this.currentTime);
    rate = (this.currentTime / this.duration) * 100;
    progress.style.width = `${rate}%`;
  }
});

audio.addEventListener("ended", function () {
  progress.style.width = 0;
  this.currentTime = 0;
  playBtn.innerHTML = playIcon;
  rate = 0;
});

const timer = progressBar.querySelector(".timer");

progressBar.addEventListener("mousemove", function (e) {
  if (!isDrag) {
    timer.style.left = `${e.offsetX}px`;
    timer.style.display = "block";
    let rateTimer = (e.offsetX * 100) / progressBarWidth;
    let rate = (audio.duration * rateTimer) / 100;
    timer.innerText = getTime(rate);
  }
});
progressBar.addEventListener("mouseout", function (e) {
  timer.style.display = "none";
});
progressDot.addEventListener("mousemove", function (e) {
  e.stopPropagation();
});

// KARAOKE

const karaoke = document.querySelector(".karaoke");
const karaokeContent = karaoke.querySelector(".karaoke-content");

const songName = `Đâu ai chung tình được mãi`;
const singerName = `Ca sĩ: Đinh Tùng Huy, AVC`;

// Giai Đoạn 1 : Xử lý Hiển thị câu hát
console.log(lyric);
let currentIndex;
const renderSentences = function () {
  let currentTime = Math.floor(audio.currentTime * 1000); // chuyển từ ms thành s
  let sentencesIndex = lyric.findIndex(function (sentence) {
    return (
      currentTime >= sentence.words[0].startTime &&
      currentTime <= sentence.words[sentence.words.length - 1].startTime
    );
  });

  // xử lú trước khi vào hát 5 giây
  let rangeStar = Math.abs(currentTime - lyric[0].words[0].startTime);
  if (rangeStar > 0 && rangeStar < 5000) {
    sentencesIndex = 0;
  }
  if (sentencesIndex !== -1 && sentencesIndex !== currentIndex) {
    // Trước khi hát câu đầu tiên của bài hát
    if (sentencesIndex === 0) {
      let output = `
        <p >${getSentence(0)}</p>
        <p>${getSentence(1)}</p>
        `;
      karaokeContent.innerHTML = output;
    } else {
      // Khi bắt đầu hát từ câu thứ 2 trở đi
      /*
      index = 1 -> ẩn đòng (0) -> Hiển thị index = 2
      index = 2 -> ẩn đòng (1) -> Hiển thị index = 3
      index = 3 -> ẩn đòng (0) -> Hiển thị index = 4
      index = 4 -> ẩn đòng (1) -> Hiển thị index = 5
      => Lẻ đầu chẵn đôi
      */
      setTimeout(function () {
        if (sentencesIndex % 2 !== 0) {
          nextSentence(karaokeContent.children[0], {
            data: getSentence(sentencesIndex + 1),
          });
        } else {
          nextSentence(karaokeContent.children[1], {
            data: getSentence(sentencesIndex + 1),
          });
        }
      }, 500);
    }
    currentIndex = sentencesIndex;
  }
};
audio.addEventListener("timeupdate", renderSentences);

// Lấy câu hát dựa vào index của câu
const getSentence = function (index) {
  return lyric[index].words
    .map(function (word) {
      return `<span class="word" data-start-time="${word.startTime}" data-end-time="${word.endTime}">
      ${word.data}<span>${word.data}</span></span>`;
    })
    .join(" ");
};

// Thay đổi các câu hát theo kiểu so le
const nextSentence = function (element, sentence) {
  element.style.transition = "opacity 0.6s ease-in-out";
  element.style.opacity = 0;
  setTimeout(function () {
    element.innerHTML = sentence.data;
    element.style.opacity = 1;
  }, 600);
};

// Tao requestAnimationFrame -> tạo hiệu ứng tô màu  mượt
const requestAnimationFrame =
  window.requestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.msRequestAnimationFrame;

const cancelAnimationFrame =
  window.cancelAnimationFrame || window.mozCancelAnimationFrame;

let requestId;

audio.addEventListener("play", function () {
  console.log(audio.currentTime);
  requestId = requestAnimationFrame(handleColorKaraoke);
});
audio.addEventListener("pause", function () {
  console.log(audio.currentTime);

  requestId = cancelAnimationFrame(handleColorKaraoke);
});

const handleColorKaraoke = function () {
  // xử lý Chắc năng tô màu
  let currentTime = Math.floor(audio.currentTime * 1000); // chuyển từ ms thành s

  let wordEl = karaokeContent.querySelectorAll(".word");
  if (wordEl.length) {
    wordEl.forEach(function (word, index) {
      if (
        currentTime > word.dataset.startTime &&
        currentTime < word.dataset.endTime
      ) {
        // Tính phần trăm  time hiện tại trong 1 từ
        let percent =
          ((currentTime - word.dataset.startTime) * 100) /
          (word.dataset.endTime - word.dataset.startTime);

        word.children[0].style.width = `${percent}%`;
      }
      if (currentTime >= word.dataset.endTime) {
        word.children[0].style.width = `100%`;
      }
    });
  }
  requestId = requestAnimationFrame(handleColorKaraoke);
};
