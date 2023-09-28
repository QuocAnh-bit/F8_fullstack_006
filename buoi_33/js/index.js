const searchBox = document.querySelector(".search-box");
const btn = document.querySelector(".btn_search");
const active = document.querySelector(".active");
const divStatus = document.createElement("div");
divStatus.className = "status";

const SpeechRecognition =
  window.speechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
// Nhận diện giọng nói VN
recognition.lang = "vi-VN";

recognition.continuous = false;

const handleVoice = (text) => {
  const handleText = text
    .toLowerCase()
    .replace("tôi", "")
    .replace("muốn", "")
    .replace("mở", "")
    .trim();
  console.log(handleText);
  if (handleText === "google" || handleText === "tìm kiếm") {
    // Google
    window.open("https://google.com");
  } else if (handleText === "facebook") {
    // Facebook
    window.open("https://facebook.com");
  } else if (handleText === "youtube") {
    // Youtube
    window.open("https://youtube.com");
  } else if (handleText === "google drive") {
    // GG drive
    window.open("https://drive.google.com");
  } else if (handleText === "google maps" || handleText === "bản đồ") {
    // GG map
    window.open("https://maps.google.com");
  } else if (
    handleText.includes("chỉ đường") ||
    handleText.includes("đường tới") ||
    handleText.includes("chỉ đường tới") ||
    handleText.includes("đi tới") ||
    handleText.includes("đi đến")
  ) {
    // Xử lý chỉ đường
    const handleUrl = handleText
      .replace("chỉ đường", "")
      .replace("đường tới", "")
      .replace("chỉ đường tới", "")
      .replace("đi", "")
      .replace("đến", "")
      .trim();
    console.log(handleUrl);
    window.open(`https://www.google.com/maps/search/${handleUrl}`);
  } else if (
    handleText.includes("nghe bài hát") ||
    handleText.includes("mở bài hát") ||
    handleText.includes("bài hát")
  ) {
    const handleUrl = handleText
      .replace("nghe bài hát", "")
      .replace("mở bài hát", "")
      .replace("bài hát", "")
      .trim();
    window.open(`https://zingmp3.vn/tim-kiem/tat-ca?q=${handleUrl}`);
  } else if (
    handleText.includes("xem video") ||
    handleText.includes("mở video") ||
    handleText.includes("video")
  ) {
    const handleUrl = handleText.replace("xem", "").replace("video", "").trim();
    window.open(`https://www.youtube.com/results?search_query=${handleUrl}`);
  } else {
    return "không thực hiện được";
  }
};

btn.addEventListener("click", (e) => {
  e.preventDefault();
  recognition.start();
  btn.style.background = "red";
  active.innerHTML = "Hãy nói điều bạn muốn vui lòng không nói lắp";
  searchBox.removeChild(divStatus);
});

// Sau khi kết thúc việc nói
recognition.onspeechend = () => {
  recognition.stop();
  btn.style.background = "#189BFF";
};

//Khi lỗi
recognition.onerror = () => {
  active.innerHTML = "Xin hãy nói lại !";
  btn.style.background = "#189BFF";
};

//Khi hoàn thành và trả về kết quả

recognition.onresult = (e) => {
  const text = e.results[0][0].transcript;
  active.innerHTML = "Đã nói xong. Hy vọng kết quả như ý";
  divStatus.innerText = `Đang thực hiện: ${text}`;
  searchBox.append(divStatus);
  setTimeout(() => {
    if (handleVoice(text) === "không thực hiện được") {
      divStatus.innerText = `Không thực hiện được`;
    } else {
      divStatus.innerText = `Đã thực hiện thành công`;
    }
  }, 1000);
};
