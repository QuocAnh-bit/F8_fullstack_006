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
  value = (value / 100) * audio.duration;

  // Tính tỉ lệ của value xem chiếm bao nhiêu phần trăm của tổng thời gian
  audio.currentTime = value;

  // gán cho thời gian chạy hiện tại
};

// Xử lý sự kiện khi ấn chuột vào thanh bar
progressBar.addEventListener("mousedown", function (e) {
  // Tinh ty le vi tri click voi width
  rate = (e.offsetX * 100) / progressBarWidth;
  progress.style.width = `${rate}%`;
  initialRate = rate; // Giá trị ban đầu
  isDrag = true;
  initialClientX = e.clientX; // tọa độ ban đầu
  handleChange(rate);
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
    if (rate < 0) {
      rate = 0;
    }
    if (rate > 100) {
      rate = 100;
    }
    progress.style.width = `${rate}%`;

    // Khi kéo trả về thời gian kéo
    var currentTime = (rate / 100) * audio.duration;
    currentTimeEl.innerText = getTime(currentTime);
  }
});
document.addEventListener("mouseup", function (e) {
  if (isDrag) {
    isDrag = false;
    initialRate = rate;
    handleChange(initialRate);
  }
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
var currentTime = 0;
audio.addEventListener("timeupdate", function (e) {
  // nếu không check ở đây sẽ xảy ra việc tranh nhau chạy
  if (!isDrag) {
    currentTimeEl.innerText = getTime(this.currentTime);
    // tính tỷ lệ %
    rate = (this.currentTime / this.duration) * 100;
    progress.style.width = `${rate}%`;
    // console.log(rate);
  }
  handleKaraoke(audio.currentTime);
  // getSentence(lyric);
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
console.log(audio.currentTime);
audio.addEventListener("ended", function () {
  progress.style.width = 0;
  this.currentTime = 0;
  playBtn.innerHTML = playIcon;
  rate = 0;
});

var songInfo = `
<p>Đâu Ai Chung Tình Được Mãi</p>
<p>Ca Sĩ : ACV</p>`;
var karaoke = document.querySelector(".karaoke");
var btnKaraoke = document.querySelector(".btn-karaoke");
var playBox = document.querySelector(".player-box");
var karaokeContent = document.querySelector(".karaoke-inner");
btnKaraoke.addEventListener("click", function () {
  if (this.innerText === "Karaoke") {
    this.innerText = "Đóng";
    // karaokeContent.innerHTML = songInfo;
  } else {
    this.innerText = "Karaoke";
    // karaokeContent.innerHTML = "";
  }
  playBox.classList.toggle("down");
  karaoke.classList.toggle("up");
});
var currentPage;
var handleKaraoke = function (currentTime) {
  currentTime *= 1000;
  var index = lyric.findIndex(function (wordItem) {
    var wordItemArr = wordItem.words;
    return (
      currentTime >= wordItemArr[0].startTime &&
      currentTime <= wordItemArr[wordItemArr.length - 1].endTime
    );
  });
  console.log(index);
  if (index !== -1) {
    // var karaokeContent = document.querySelector(".karaoke-inner");

    /*
    page = 1-> index  = 0 -> 1
    page = 2 -> index = 2 -> 3
    page = 3 -> index = 4 -> 5

    index = (Page - 1) *2
    => Ct : page = index / 2 +1
    */
    var page = Math.floor(index / 2 + 1);
    handleColor(currentTime);
    if (page !== currentPage) {
      var offset = (page - 1) * 2;
      if (index >= offset && offset + 2) {
        karaokeContent.innerText = "";
        var div = document.createElement("div");
        for (var i = offset; i < offset + 2; i++) {
          // Vòng lặp các câu trong 1 màn hình
          var p = document.createElement("p");

          // Vòng lặp các từ trong câu
          lyric[i].words.forEach(function (word) {
            var wordEl = document.createElement("span");
            wordEl.classList.add("word");
            wordEl.innerText = word.data;

            // lấy data set của starTime - end Time
            wordEl.dataset.startTime = word.startTime;
            wordEl.dataset.endTime = word.endTime;

            var span = document.createElement("span");
            span.innerText = word.data;
            wordEl.append(span);

            p.append(wordEl);

            // if (currentTime >= word.startTime) {
            //   span.style.width = `100%`;
            //   if (currentTime >= word.startTime && word.endTime) {
            //     var wordTime = word.endTimeTime - word.startTime;
            //   }
            // }
          });
          div.append(p);

          // if (p.previousElementSibling !== null) {
          //   p.previousElementSibling.remove();
          // }
        }
        karaokeContent.append(div);
      }
      currentPage = page;
    }
  }
};
var handleColor = function (currentTime) {
  var wordItems = karaokeContent.querySelectorAll(".word");
  wordItems.forEach(function (wordItem) {
    if (currentTime >= wordItem.dataset.startTime) {
      wordItem.children[0].style.width = "100%";
      var wordTime = wordItem.dataset.endTime - wordItem.dataset.startTime;
      if (wordTime > 50) {
        wordItem.children[0].style.transition = `width ${wordTime}ms linear`;
      }
    }
  });
};
// var getSecond = function (miliSecond) {
//   return miliSecond / 1000;
// };

// var karaoke = document.querySelector(".karaoke-inner");
// var p = document.createElement("p");
// karaoke.append(p);
// console.log(karaoke);
// var getSentence = function (lyric) {
//   var checkWord = lyric.find(function (word) {
//     var startTime = getSecond(word.words[0].startTime);
//     var endTime = getSecond(word.words[word.words.length - 1].endTime);
//     return audio.currentTime >= startTime && audio.currentTime <= endTime;
//   });
//   if (checkWord) {
//     var html = "";

//     checkWord.words.forEach(function (word) {
//       html += `<span>${word.data}</span>`;
//     });
//     p.innerHTML = html;
//     console.log(html);
//   } else {
//     if (
//       audio.currentTime < getSecond(lyric[0].words[0].startTime) ||
//       audio.currentTime > getSecond(lyric[lyric.length - 1].words[2].endTime)
//     ) {
//       p.innerHTML = `Ai Chung Tình Được Mãi <br> <span class="singer-name">Đinh Tùng Huy, ACV</span>`;
//     }
//   }
// };
// getSentence(lyric);
