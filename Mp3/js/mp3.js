const progressBar = document.querySelector(".progress-bar");
const progress = progressBar.querySelector(".progress");
const progressDot = progress.querySelector(" span");
const progressBarWidth = progressBar.clientWidth;
const audio = document.querySelector("audio");
const menuSong = document.querySelector(".menu");

let currentTimeEl = progressBar.previousElementSibling;
let durationTimeEl = progressBar.nextElementSibling;

const nextRight = document.querySelector(".next-right");
const nextLeft = document.querySelector(".next-left");
const radomBtn = document.querySelector(".random-btn");
const repeatBtn = document.querySelector(".repeat-btn");

const playBtn = document.querySelector(".play-btn button");
const playIcon = `<i class="fa-solid fa-play"></i>`;
const pauseIcon = `<i class="fa-solid fa-pause"></i>`;

let indexSong = 0;
let isDrag = false;
let rate = 0;
let initialRate = 0;
let isRandom = false;
let isRepeat = false;

let songName = dataSongs[0].nameSong;
let singerName = dataSongs[0].singerName;
let lyric = JSON.parse(dataSongs[0].lyric).data.sentences;

const loadIndexSong = function () {
  audio.src = dataSongs[indexSong].srcMp3;
};
loadIndexSong();

menuSong.innerHTML = `
<ul>
    ${dataSongs
      .map(
        (item, index) => `<li class="item-song" data-index="${index}">

    <div>
      <img class="img-song " src="${item.img}" alt="" />
      <div>
        <p>${item.nameSong}</p>
        <p>${item.singerName}</p>
      </div>
    </div>
    </li>`
      )
      .join("")}
</ul>
`;

var listItems = menuSong.querySelectorAll("ul li");

const handleAddActive = function () {
  listItems.forEach((item, index) => {
    if (index === indexSong) {
      listItems[index].classList.add("active");
    } else {
      listItems[index].classList.remove("active");
    }
  });
};
handleAddActive();

const loadNameSong = function () {
  songName = dataSongs[indexSong].nameSong;
  singerName = dataSongs[indexSong].singerName;
  renderSongInfo();
};

const loadLyricSong = function () {
  lyric = JSON.parse(dataSongs[indexSong].lyric).data.sentences;
};

const handleRandomSong = function () {
  let newIndex;
  do {
    newIndex = Math.floor(Math.random() * dataSongs.length);
  } while (newIndex === indexSong);
  indexSong = newIndex;
  loadIndexSong();
  loadNameSong();
  handleAddActive();
  loadLyricSong();
};

const handleNextSong = function () {
  if (indexSong === dataSongs.length - 1) {
    indexSong = 0;
  } else {
    indexSong++;
  }
  playBtn.innerHTML = pauseIcon;
  loadIndexSong();
  handleAddActive();
  loadNameSong();
  loadLyricSong();
};

menuSong.addEventListener("click", function (e) {
  const itemSong = e.target.closest("li.item-song:not(.active");
  if (itemSong) {
    const dataIndex = itemSong.getAttribute("data-index");
    indexSong = Number(dataIndex);
    loadIndexSong();
    handleAddActive();
    loadNameSong();
    loadLyricSong();

    playBtn.innerHTML = pauseIcon;
    audio.play();
  }
});

const handlePrevSong = function () {
  if (indexSong === 0) {
    indexSong = dataSongs.length - 1;
  } else {
    indexSong--;
  }
  playBtn.innerHTML = pauseIcon;
  loadIndexSong();
  handleAddActive();
  loadLyricSong();

  loadNameSong();
};

radomBtn.addEventListener("click", function (e) {
  if (e.which === 1) {
    isRandom = !isRandom;
    radomBtn.classList.toggle("active-btn", isRandom);
  }
});

repeatBtn.addEventListener("click", function (e) {
  if (e.which === 1) {
    isRepeat = !isRepeat;
    repeatBtn.classList.toggle("active-btn", isRepeat);
  }
});

nextRight.addEventListener("click", function (e) {
  if (e.which === 1) {
    if (isRandom) {
      handleRandomSong();
    } else {
      handleNextSong();
    }
    audio.play();
  }
});

nextLeft.addEventListener("click", function (e) {
  if (e.which === 1) {
    if (isRandom) {
      handleRandomSong();
    } else {
      handlePrevSong();
    }
    audio.play();
  }
});

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

const getTime = function (seconds) {
  let min = Math.floor(seconds / 60);
  seconds = Math.floor(seconds - min * 60);

  return `${min < 10 ? "0" + min : min}:${
    seconds < 10 ? "0" + seconds : seconds
  }`;
};

console.log(audio.readyState);

audio.addEventListener("loadeddata", function () {
  if (audio.readyState > 0) {
    durationTimeEl.innerText = getTime(this.duration);
  }
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

audio.addEventListener("ended", async function () {
  progress.style.width = 0;
  this.currentTime = 0;
  playBtn.innerHTML = playIcon;
  rate = 0;

  if (isRepeat) {
    audio.play();
    playBtn.innerHTML = pauseIcon;
    return;
  }
  if (isRandom) {
    handleRandomSong();
  } else {
    handleNextSong();
  }
  audio.play();
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

// Giai Đoạn 1 : Xử lý Hiển thị câu hát
console.log(lyric);
let currentIndex;
var showSentence = false;

var renderSongInfo = function () {
  karaokeContent.innerHTML = `
  <p>${songName}</p>
  <p>${singerName}</p>
  `;

  showSentence = false;
};

renderSongInfo();

const renderSentences = function () {
  let currentTime = Math.floor(audio.currentTime * 1000); // chuyển từ ms thành s
  let sentenceIndex = lyric.findIndex(function (sentence) {
    return (
      currentTime >= sentence.words[0].startTime &&
      currentTime <= sentence.words[sentence.words.length - 1].startTime
    );
  });

  // xử lú trước khi vào hát 5 giây
  let rangeStart = Math.abs(currentTime - lyric[0].words[0].startTime);
  if (rangeStart > 0 && rangeStart < 5000) {
    sentenceIndex = 0;
  } else if (rangeStart > 5000 && currentTime < lyric[0].words[0].startTime) {
    renderSongInfo();
  } else if (
    currentTime >
    lyric[lyric.length - 1].words[lyric[lyric.length - 1].words.length - 1]
      .endTime
  ) {
    renderSongInfo();
  }
  if (sentenceIndex !== -1 && sentenceIndex !== currentIndex) {
    // Trước khi hát câu đầu tiên của bài hát
    if (sentenceIndex === 0) {
      let output = `
        <p >${getSentence(0)}</p>
        <p>${getSentence(1)}</p>
        `;
      karaokeContent.innerHTML = output;
      showSentence = true;
    } else {
      //Khi bắt đầu hát từ câu thứ 2 trở đi
      /*
      index = 1 -> Ẩn dòng đầu (0) -> Hiển thị index = 2
      index = 2 -> Ẩn dòng hai (1) -> Hiển thị index = 3
      index = 3 -> Ẩn dòng đầu (0) -> Hiển thị index = 4
      index = 4 -> Ẩn dòng hai (1) -> Hiển thị index = 5
      */

      if (!showSentence) {
        var output = `
        <p>${getSentence(sentenceIndex)}</p>
        <p>${getSentence(sentenceIndex + 1)}</p>
      `;
        karaokeContent.innerHTML = output;
        showSentence = true;
      }
      setTimeout(function () {
        if (sentenceIndex % 2 !== 0) {
          nextSentence(karaokeContent.children[0], {
            data: getSentence(sentenceIndex + 1),
          });
        } else {
          nextSentence(karaokeContent.children[1], {
            data: getSentence(sentenceIndex + 1),
          });
        }
      }, 300);
    }
    currentIndex = sentenceIndex;
  }
};
audio.addEventListener("timeupdate", renderSentences);

// Lấy câu hát dựa vào index của câu
const getSentence = function (index) {
  return lyric[index]?.words
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
