import { client } from "./client.js";
import { config } from "./config.js";
const { PAGE_LIMIT } = config;

const btnStart = document.querySelector(".btn-start");
const quizStart = document.querySelector(".quiz-start");
let pagination = 1;
let totalPage;
let durationTimeQuiz = 2000;
let currentTimeQuiz = 2000;
console.log(btnStart);

btnStart.addEventListener("click", (e) => {
  if (e.which === 1) {
    let count = 3;
    btnStart.style.display = "none";

    const countStart = document.createElement("div");
    countStart.className = "count-start";
    const span = document.createElement("span");
    span.className = "count-down";
    span.innerText = count;
    countStart.append(span);
    quizStart.append(countStart);
    console.log(pagination);

    countDownStart(count);
  }
  /*<div class="count-start"><span>3</span></div>*/
});

const countDownStart = (count) => {
  const span = document.querySelector(".count-down");
  const intervalID = setInterval(() => {
    span.innerText = count--;
    span.style.fontSize = "4rem";
    console.log(count);
    if (count < 0) {
      clearInterval(intervalID);
      span.innerText = "Go !!!";
      render();
    }
  }, 1500);
};
console.log(pagination);

const getPost = async (query = {}) => {
  const queryString = new URLSearchParams(query).toString();
  const { response, data } = await client.get(`/question?${queryString}`);
  const total = response.headers.get("x-total-count");
  totalPage = Math.ceil(total / PAGE_LIMIT);

  return data;
  // renderPaginate(totalPage);
  // render(data);
};

const render = async () => {
  const quizGame = document.querySelector(".quiz-game");
  const data = await getPost({
    _page: pagination,
    _limit: PAGE_LIMIT,
  });
  console.log(data);
  data.forEach((question) => {
    const html = `<div class="question-wrap">
    <div class="quiz-top">
      <div class="progress-bar">
        <span class="progress-bar-inner"></span>
      </div>
      <div class="item-top">
        <div class="item-right">
          <div class="total-quiz">
            <span>${pagination + `/` + totalPage}</span>
          </div>
          <div class="streak">
            <div class="streak-line-left"></div>
            <div class="streak-line-right"></div>
            <div class="streak-status"></div>
          </div>
        </div>
        <div class="item-left">
          <div class="scores">
            Scores:
            <span>5</span>
          </div>
        </div>
      </div>
    </div>
    <div class="quiz-mid">
      <div class="content-quiz">
        <p class="quiz">${question.question}</p>
      </div>
      <div class="answer-quiz">
      ${
        question.options.length > 0
          ? question.options
              .map((item) => `<div class="item-answer">${item}</div>`)
              .join("")
          : ""
      }
      </div>
    </div>
    <div class="quiz-footer"></div>
  </div>`;
    quizGame.innerHTML = html;
  });
  console.log(pagination);
  countDownQuiz();
};
console.log(pagination);

// render();
const countDownQuiz = () => {
  const progressBar = document.querySelector(".progress-bar-inner");

  let countDown = setInterval(() => {
    currentTimeQuiz--;
    // Tính tỷ lệ currentTime so với tổng thời gian
    let rateWidth = (currentTimeQuiz / durationTimeQuiz) * 100;
    console.log(rateWidth);
    if (currentTimeQuiz >= 0) {
      progressBar.style.width = `${rateWidth}%`;
    }
    if (currentTimeQuiz < 0) {
      pagination++;
      clearInterval(countDown);
      render();
      if (pagination <= totalPage) {
        currentTimeQuiz = 2000;
      }
    }
  }, 1);
};
