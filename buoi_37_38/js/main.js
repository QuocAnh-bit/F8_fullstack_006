import { config } from "./config.js";
import { client } from "./client.js";
const { SERVER_AUTH_API, PAGE_LIMIT } = config;

const container = document.querySelector(".container");
const loading = document.querySelector(".loading-wrap");
const blogList = document.querySelector(".blog-list");
const wrapBtn = document.querySelector(".open-sign-in");
const openSignIn = document.querySelector(".btn-sign-in");
const toastWrap = document.createElement("div");
toastWrap.className = "toast-wrap";
const htmlToast = `
  <div class="toast-icon">A</div>
  <div class="toast-content">
    <h3 class="title-toast">Thành công</h3>
    <p class="message-toast">message</p>
  </div>
  `;
toastWrap.innerHTML = htmlToast;

openSignIn.addEventListener("click", () => {
  renderBoxLogin();
});

const renderBoxLogin = () => {
  const wrapperLogin = document.createElement("div");
  wrapperLogin.className = "wrapper-login";
  const closeForm = document.createElement("div");
  closeForm.className = "close-form";
  closeForm.innerHTML = '<i class="fa-regular fa-circle-xmark">';
  wrapperLogin.append(closeForm);
  container.insertAdjacentElement("afterbegin", wrapperLogin);
  wrapperLogin.style.display = "flex";

  const boxLogin = document.createElement("div");
  boxLogin.className = "box-login";
  const htmlLogin = `
  <form action="" class="login-form">
            <div class="title-form">Đăng nhập</div>
            <div class="form-control">
              <label for="">Email</label>
              <input
                type="email"
                class="email"
                placeholder="Email..."
                value = "qanhanh07@gmail.com"
                required
              />
            </div>
            <div class="form-control">
              <label for="">Password</label>
              <input
                type="password"
                class="password"
                placeholder="Password"
                value = "12345678Aa"
                required
              />
            </div>
            <div class="btn-form">
              <button type="submit" class="btn-login">Đăng Nhập</button>
              <button type="button" class="btn-register">Đăng Ký</button>
            </div>
          </form>
  `;

  const htmlRegister = `
  <form action="" class="register-form">
            <div class="title-form">Đăng Ký</div>
            <div class="form-control">
              <label for="">Your Name</label>
              <input
                type="text"
                class="user-name"
                placeholder="Your name..."
                required
              />
            </div>
            <div class="form-control">
              <label for="">Email</label>
              <input
                type="email"
                class="email-register"
                placeholder="Email..."
                required
              />
            </div>
            <div class="form-control">
              <label for="">Password</label>
              <input
                type="password"
                class="password-register"
                placeholder="Password"
                required
              />
            </div>

            <div class="btn-form">
              <button type="button" class="btn-login-back">Trở về đăng nhập</button>
              <button type="submit" class="btn-register-submit">Đăng Ký</button>
            </div>
          </form>
  `;

  boxLogin.innerHTML = htmlLogin;
  wrapperLogin.append(boxLogin);

  wrapperLogin.addEventListener("click", (e) => {
    if (e.target.parentElement.className === "close-form") {
      wrapperLogin.style.display = "none";
      boxLogin.remove();
    }

    if (e.target.className === "btn-register") {
      boxLogin.innerHTML = "";
      boxLogin.innerHTML = htmlRegister;
      const registerForm = document.querySelector(".register-form");
      registerForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const nameEl = e.target.querySelector(".user-name");
        const emailEl = e.target.querySelector(".email-register");
        const passwordEl = e.target.querySelector(".password-register");
        const name = nameEl.value;
        const email = emailEl.value;
        const password = passwordEl.value;
        console.log(name, email, password);
        handleRegister({ name, email, password });
        loading.classList.add("active");
      });
    }

    if (e.target.className === "btn-login-back") {
      boxLogin.innerHTML = htmlLogin;
      const loginForm = document.querySelector(".login-form");

      loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        console.log(e.target);
        const emailEl = e.target.querySelector(".email");
        const passwordEl = e.target.querySelector(".password");

        const email = emailEl.value;
        const password = passwordEl.value;

        handleLogin({ email, password });

        emailEl.value = "";
        passwordEl.value = "";
        loading.classList.add("active");
        getBlogs({
          limit: PAGE_LIMIT,
          page: 1,
        });
      });
    }
  });

  const loginForm = document.querySelector(".login-form");

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log(e.target);
    const emailEl = e.target.querySelector(".email");
    const passwordEl = e.target.querySelector(".password");

    const email = emailEl.value;
    const password = passwordEl.value;

    handleLogin({ email, password });

    emailEl.value = "";
    passwordEl.value = "";
    loading.classList.add("active");
    getBlogs({
      limit: PAGE_LIMIT,
      page: 1,
    });
  });
};
const handCreateBlogs = async () => {
  client.setUrl(SERVER_AUTH_API);
  const token = localStorage.getItem("access_token");
  const { data } = await client.get("/users/profile", token);
  if (data.code !== 200) {
    refreshToken();
  }
  // if (data.code !== 200) {
  //   localStorage.removeItem("access_token");
  //   localStorage.removeItem("refresh_token");
  //   location.reload();
  // }
  const nameEl = document.querySelector(".name-user");
  const avtEl = document.querySelector(".avatar");

  nameEl.innerText = data.data.name;
  avtEl.dataset.name = handleAvt(data.data.name);
};

const renderCreateBlog = () => {
  blogList.innerHTML = "";
  const createBlog = document.createElement("div");
  createBlog.className = "create-blog";
  const htmlCreate = `
  <span class="link">
  <a href="#" class="wrap">
    <span class="avatar" data-name=""></span>
    <span class="name-user"></span>
  </a>
</span>
<form action="" class="form-add-blog">
  <div class="form-control">
    <label for="">Enter Your title </label>
    <input
      type="text"
      class="title-create"
      placeholder="Pls enter the title"
      required
    />
  </div>
  <div class="form-control">
    <label for="">Enter Your content </label>
    <textarea
      class="create-content"
      name=""
      id=""
      cols="30"
      rows="10"
      placeholder="Text here..."
    ></textarea>
  </div>
  <div class="wrap-date">
  <input id="date-picker" />
  <label for="date-picker" class="label-date"></label>

  </div>
  <div class="btn-form">
    <button class="btn-add-create">Post</button>
  </div>
</form>
  `;
  createBlog.innerHTML = htmlCreate;

  blogList.insertAdjacentElement("afterbegin", createBlog);
  datePicker();
  handCreateBlogs();
};

const datePicker = () => {
  const datePicker = document.querySelector("#date-picker");

  flatpickr(datePicker, {
    enableTime: true,
    minDate: "today",
    dateFormat: "m/d/Y H:i",
  });
};
const renderBlogs = (blogs) => {
  blogList.innerHTML = "";
  const contentWrap = document.createElement("div");
  contentWrap.className = "content";
  contentWrap.innerHTML = "";
  blogs.forEach((item) => {
    const html = `
    <section class="blog-item">
    <span class="date">
    <span class="minute">${handlePostTime(item.createdAt)}</span>
    </br>
    <span class="house">${handleHouse(item.createdAt)}</span>
    </span>
    <span class="link">
      <a href="" class="wrap">
        <span class="avatar" data-name="${handleAvt(item.userId.name)}"></span>
        <span class="name-user">${item.userId.name}</span>
      </a>
    </span>
    <h3 class="title-blog">${item.title}</h3>
    <p class="content-blog">
    ${truncate(item.content)}
   </p>
    <span class="hashtag-wrap">
      <a href="${
        item.userId._id
      }" class="hashtag hashtag-name"> ${removeAccents(item.userId.name)}</a>
      <a href="${item._id}" class="hashtag detail" >Detail</a>
    </span>
    <span class="name">${item.userId.name}</span>
  </section>
    `;
    contentWrap.innerHTML += html;
  });

  if (localStorage.getItem("access_token")) {
    renderCreateBlog();
    openSignIn.remove();
    const datePicker = document.querySelector("#date-picker");

    const formAddBlog = document.querySelector(".form-add-blog");
    formAddBlog.addEventListener("submit", (e) => {
      e.preventDefault();
      const titleEl = e.target.querySelector(".title-create");
      const contentEl = e.target.querySelector(".create-content");

      const title = titleEl.value;
      const content = contentEl.value;
      if (datePicker.value === "") {
        handlePostBlog({ title, content });
        loading.classList.add("active");
      } else {
        handleDatePiker(datePicker.value);
        const labelDate = document.querySelector(".label-date");
        setTimeout(() => {
          labelDate.innerText = "";
          datePicker.value = "";
        }, 3000);
      }
    });
    wrapBtn.innerHTML = "";
    const btnLogout = document.createElement("button");
    btnLogout.className = "btn-logout";
    btnLogout.innerText = "Sign Out";
    wrapBtn.append(btnLogout);
    btnLogout.addEventListener("click", async () => {
      const token = localStorage.getItem("access_token");
      loading.classList.add("active");
      const { data: response } = await client.post("/auth/logout", {}, token);
      loading.classList.remove("active");
      showResponse(response);
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      setTimeout(() => {
        location.reload();
      }, 1500);
    });
  }
  blogList.append(contentWrap);

  // Regex
  handleRegexContent();

  const details = document.querySelectorAll(".detail");
  details.forEach((detail) => {
    detail.addEventListener("click", (e) => {
      e.preventDefault();
      if (localStorage.getItem("access_token")) {
        const idUser = detail.getAttribute("href");
        loading.classList.add("active");
        handleDetail(idUser);
      } else {
        renderBoxLogin();
      }
    });
  });

  const hashTagNames = document.querySelectorAll(".hashtag-name");
  console.log(hashTagNames);
  hashTagNames.forEach((hashTagName) => {
    hashTagName.addEventListener("click", (e) => {
      e.preventDefault();
      if (localStorage.getItem("access_token")) {
        const idUser = hashTagName.getAttribute("href");
        loading.classList.add("active");
        console.log(idUser);
        handleProfile(idUser);
      } else {
        renderBoxLogin();
      }
    });
  });
};
const handleProfile = async (id) => {
  const { data } = await client.get(`/users/${id}`);
  loading.classList.remove("active");

  blogList.innerHTML = "";
  const contentWrap = document.createElement("div");
  contentWrap.className = "content";
  contentWrap.innerHTML = "";
  blogList.append(contentWrap);
  data.data.blogs.forEach((item, index) => {
    const html = `
          
            <section class="blog-item">
              <span class="date">
                <span class="minute">${handlePostTime(item.createdAt)}</span>
                <br />
                <span class="house">
                  <span class="house">${handleHouse(item.createdAt)}</span>
                </span>
              </span>
              <span class="link">
                <a href="" class="wrap">
                  <span class="avatar" data-name="${handleAvt(
                    data.data.name
                  )}"></span>
                  <span class="name-user">${data.data.name}</span>
                </a>
              </span>
              <h3 class="title-blog">${item.title}</h3>
              <p class="content-blog">${item.content}</p>
              <span class="hashtag-wrap">
              <a href="${item._id}" class="hashtag detail" >Detail</a>
              </span>
              <span class="name">${data.data.name}</span>
            </section>
          `;
    contentWrap.innerHTML += html;
  });
  const backHome = document.querySelector(".title-blog");
  backHome.innerHTML = "";
  const a = document.createElement("a");
  a.className = "back-home";
  a.innerText = "Go Home";
  a.href = "";
  backHome.append(a);
  a.addEventListener("click", (e) => {
    e.preventDefault();
    location.reload();
  });
  handleRegexContent();

  blogList.addEventListener("click", (e) => {
    e.preventDefault();
    if (e.target.className === "hashtag detail") {
      const userId = e.target.getAttribute("href");
      loading.classList.add("active");

      handleDetail(userId);
    }
  });
};
const handleDetail = async (id) => {
  const { data } = await client.get(`/blogs/${id}`);
  loading.classList.remove("active");

  console.log(data);
  blogList.innerHTML = "";
  const html = `
  
          <div class="content">
            <section class="blog-item">
              <span class="date">
                <span class="minute">${handlePostTime(
                  data.data.createdAt
                )}</span>
                <br />
                <span class="house">
                  <span class="house">${handleHouse(data.data.createdAt)}</span>
                </span>
              </span>
              <span class="link">
                <a href="" class="wrap">
                  <span class="avatar" data-name="${handleAvt(
                    data.data.userId.name
                  )}"></span>
                  <span class="name-user">${data.data.userId.name}</span>
                </a>
              </span>
              <h3 class="title-blog">${data.data.title}</h3>
              <p class="content-blog">${data.data.content}</p>
              <span class="hashtag-wrap">
                <a href="${data.data.userId._id}" class="hashtag hashtag-name">
                ${removeAccents(data.data.userId.name)}</a>
              </span>
              <span class="name">${data.data.userId.name}</span>
            </section>
          </div>
    
  `;
  blogList.innerHTML = html;
  const backHome = document.querySelector(".title-blog");
  backHome.innerHTML = "";
  const a = document.createElement("a");
  a.className = "back-home";
  a.innerText = "Go Home";
  a.href = "";
  backHome.append(a);
  a.addEventListener("click", (e) => {
    e.preventDefault();
    location.reload();
  });
  handleRegexContent();
  blogList.addEventListener("click", (e) => {
    e.preventDefault();
    if (e.target.className === "hashtag hashtag-name") {
      const userId = e.target.getAttribute("href");
      loading.classList.add("active");
      handleProfile(userId);
      console.log("ok");
    }
  });
};
const handleRegexContent = () => {
  const contentBlogs = document.querySelectorAll(".content-blog");
  contentBlogs.forEach((contentBlog) => {
    contentBlog.innerText = handleLink(contentBlog.innerText);
    contentBlog.innerText = handleLinkYouTuBe(contentBlog.innerText);
    contentBlog.innerText = handleEmailLink(contentBlog.innerText);
    contentBlog.innerText = handleNumberPhoneLink(contentBlog.innerText);

    contentBlog.innerHTML = contentBlog.innerText;
  });
};

const handleNumberPhoneLink = (content) => {
  const patternPhone = /(84|0[3|5|7|8|9])+([0-9]{8,9})\b/g;
  return content.replace(patternPhone, (number) => {
    return `<a href="tel:${number}" target="_blank"  class="link link-phone">${number}</a>`;
  });
};

const handleEmailLink = (content) => {
  const patternEmail = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4})/g;

  return content.replace(patternEmail, (email) => {
    return `<a href="mailto:${email}" target="_blank" class="link link-email">${email}</a>`;
  });
};

const handleLink = (content) => {
  console.log(content);
  const patternLink =
    /((http|https):\/\/[a-z-_0-9\.]+\.[a-z]{2,}\/(?!watch).*?)([-a-zA-Z0-9()@:%_\+.~#?&\/\/=]*)/g;
  return content.replace(patternLink, (link) => {
    return `<a href="${link}" target="_blank"  class="link link-link">${link}</a>`;
  });
};

const handleLinkYouTuBe = (content) => {
  const patternYouTuBe =
    /(http|https):\/\/*(?:www.)(youtube\.com|youtu\.be)\/watch\?v=([\w-]{11})(&([-a-zA-Z0-9()@:%_\+.~#?&\/\/=]*))*/g;

  return content.replaceAll(patternYouTuBe, (item) => {
    const idVideo = item.split(/([\w-]{11})/)[1];

    return `
        <iframe
          width='460'
          height='300'
          src='https://www.youtube.com/embed/${idVideo}'
          title='Youtube'
          frameBorder='0'
          allowFullScreen></iframe>
      `;
  });
};
const truncate = (data) => {
  const size = 150;
  return data.length > size ? data.slice(0, size - 1) + "…" : data;
};
function removeAccents(str) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D");
}
const handleAvt = (name) => {
  const splitName = name.trim().split(" ");

  return splitName[splitName.length - 1].slice(0, 1);
};

client.setUrl(SERVER_AUTH_API);

const getBlogs = async (query = {}) => {
  const queryString = new URLSearchParams(query).toString();
  const { data } = await client.get(`/blogs?${queryString}`);
  renderBlogs(data.data);
};
getBlogs({
  limit: PAGE_LIMIT,
  page: 1,
});

const handleLogin = async (data) => {
  const { data: tokens } = await client.post(`/auth/login`, data);
  loading.classList.remove("active");
  showResponse(tokens);
  console.log(data);
  if (tokens.status_code === "SUCCESS") {
    const { accessToken, refreshToken } = tokens.data;
    localStorage.setItem("access_token", accessToken);
    localStorage.setItem("refresh_token", refreshToken);
    document.querySelector(".wrapper-login").remove();
    openSignIn.remove();
    renderCreateBlog();
    getBlogs({
      limit: PAGE_LIMIT,
      page: 1,
    });

    const formAddBlog = document.querySelector(".form-add-blog");
    const datePicker = document.querySelector("#date-picker");
    formAddBlog.addEventListener("submit", (e) => {
      e.preventDefault();
      if (datePicker.value === "") {
        console.log(datePicker.value);
      }
      const titleEl = e.target.querySelector(".title-create");
      const contentEl = e.target.querySelector(".create-content");
      const title = titleEl.value;
      const content = contentEl.value;
      loading.classList.add("active");

      handlePostBlog({ title, content });
    });
  }
};

const handleRegister = async (data) => {
  try {
    const { data: response } = await client.post("/auth/register", data);
    console.log(data);
    showResponse(response);
    loading.classList.remove("active");
  } catch (error) {
    loading.classList.remove("active");
    container.append(toastWrap);
    toastWrap.style.background = "red";
    const titleToast = document.querySelector(".title-toast");
    const messageToast = document.querySelector(".message-toast");
    titleToast.innerText = "ERROR 504";
    messageToast.innerText = "Đã có lỗi xảy ra xin vui lòng thử lại";
    setTimeout(() => {
      toastWrap.remove();
    }, 2000);
  }
};

const handlePostBlog = async (data) => {
  const token = localStorage.getItem("access_token");
  const { data: response } = await client.post("/blogs", data, token);
  loading.classList.remove("active");

  showResponse(response);
  await getBlogs({
    limit: PAGE_LIMIT,
    page: 1,
  });
};
const showResponse = (response) => {
  if (response.code === 400) {
    container.append(toastWrap);
    getStatus(response);
    toastWrap.style.background = "red";
  } else {
    container.append(toastWrap);
    toastWrap.style.background = "#77fe00";
    getStatus(response);
  }
};

const getStatus = (response) => {
  const titleToast = toastWrap.querySelector(".title-toast");
  const messageToast = toastWrap.querySelector(".message-toast");

  titleToast.innerText = response.status_code;
  messageToast.innerText = response.message;
  setTimeout(() => {
    toastWrap.remove();
  }, 2000);
};
const handlePostTime = (timeCreate) => {
  const formatter = new Intl.RelativeTimeFormat("vn");
  const timeNow = new Date().getTime();
  const timeOld = new Date(timeCreate).getTime();
  const timeLeft = timeNow - timeOld; /// ms

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  if (timeLeft < 6000) {
    return `Vài giây trước`;
  } else if (timeLeft < 3600000) {
    return formatter.format(-minutes, "minutes");
  } else if (timeLeft < 86400000) {
    return formatter.format(-hours, "hours");
  } else if (timeLeft < 2419200000) {
    return formatter.format(-days, "days");
  }
};

const handleHouse = (timeCreate) => {
  const house = new Date(timeCreate).getHours();
  const minutes = new Date(timeCreate).getMinutes();

  return `
    <span class="house">${
      house > 12
        ? `${house - 12 < 10 ? `0${house - 12}` : house - 12}:${
            minutes < 10 ? `0${minutes}` : minutes
          } PM`
        : `${house < 10 ? `0${house}` : house}:${
            minutes < 10 ? `0${minutes}` : minutes
          } AM`
    }</span>
    
    `;
};

const refreshToken = async () => {
  const { response, data: refresh } = await client.post("/auth/refresh-token", {
    refreshToken: localStorage.getItem("refresh_token"),
  });

  if (response.ok) {
    if (refresh.code === 200) {
      localStorage.setItem("access_token", refresh.data.token.accessToken);
      localStorage.setItem("refresh_token", refresh.data.token.refreshToken);
      getBlogs({
        limit: PAGE_LIMIT,
        page: 1,
      });
    }
  } else {
    const token = localStorage.getItem("access_token");
    const { data: response } = await client.post("/auth/logout", {}, token);
    showResponse(response);
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setTimeout(() => {
      location.reload();
    }, 1000);
  }
};

const handleDatePiker = (dateValue) => {
  const labelDate = document.querySelector(".label-date");
  console.log(labelDate);
  const timeNow = new Date().getTime();
  const timeCreate = new Date(dateValue).getTime();
  const timeLeft = timeCreate - timeNow;

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  if (timeLeft < 6000) {
    return (labelDate.innerText = `Bài đăng sẽ đăng sau: ${seconds} giây `);
  } else if (timeLeft < 3600000) {
    return (labelDate.innerText = `Bài đăng sẽ đăng sau: ${minutes} phút ${seconds} giây `);
  } else if (timeLeft < 86400000) {
    return (labelDate.innerText = `Bài đăng sẽ đăng sau: ${hours} giờ ${minutes} phút ${seconds} giây `);
  } else if (timeLeft < 2419200000) {
    return (labelDate.innerText = `Bài đăng sẽ đăng sau: ${days} ngày ${hours} giờ ${minutes} phút ${seconds} giây `);
  }
};
