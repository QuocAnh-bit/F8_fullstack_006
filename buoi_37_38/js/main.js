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
                required
              />
            </div>
            <div class="form-control">
              <label for="">Password</label>
              <input
                type="password"
                class="password"
                placeholder="Password"
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
  <a href="" class="wrap">
    <span class="avatar" data-name=""></span>
    <span class="name-user">QUốc Anh</span>
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
  <input id="date-picker" />
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
    dateFormat: "d-m-Y H:i",
  });
};
const renderBlogs = (blogs) => {
  blogList.innerHTML = "";
  const contentWrap = document.createElement("div");
  contentWrap.className = "content";
  contentWrap.innerHTML = "";
  blogs.forEach((item) => {
    console.log(new Date().getHours(), new Date().getMinutes());

    const html = `
    <section class="blog-item">
    <span class="date">
    ${handlePostTime(item.createdAt)}
    </br>
    ${handleHouse(item.createdAt)}
    </span>
    <span class="link">
      <a href="" class="wrap">
        <span class="avatar" data-name="${handleAvt(item.userId.name)}"></span>
        <span class="name-user">${item.userId.name}</span>
      </a>
    </span>
    <h3 class="title-blog">${item.title}</h3>
    <p>${item.content}</p>
    <span class="hashtag-wrap">
      <a href="" class="hashtag"> ${item.userId.name}</a>
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
      if (datePicker) {
        console.log("ok");
      }
      const title = titleEl.value;
      const content = contentEl.value;
      handlePostBlog({ title, content });
      loading.classList.add("active");
    });
    wrapBtn.innerHTML = "";
    const btnLogout = document.createElement("button");
    btnLogout.className = "btn-logout";
    btnLogout.innerText = "Sign Out";
    wrapBtn.append(btnLogout);
    btnLogout.addEventListener("click", () => {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      location.reload();
    });
  }
  blogList.append(contentWrap);
};

const handleAvt = (name) => {
  const splitName = name.split(" ");
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
    // const btnLogout = document.createElement("button");
    // btnLogout.className = "btn-logout";
    // btnLogout.innerText = "Sign Out";
    // wrapBtn.append(btnLogout);
    // btnLogout.addEventListener("click", () => {
    //   localStorage.removeItem("access_token");
    //   localStorage.removeItem("refresh_token");
    //   location.reload();
    // });
    const formAddBlog = document.querySelector(".form-add-blog");
    const datePicker = document.querySelector("#date-picker");
    formAddBlog.addEventListener("submit", (e) => {
      e.preventDefault();
      if (datePicker) {
        console.log("ok");
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
      house > 12 ? `${house - 12}:${minutes} PM` : `${house}:${minutes} AM`
    }</span>
    
    `;
};

const refreshToken = async () => {
  const { response, data: refresh } = await client.post("auth/refresh-token", {
    refreshToken: localStorage.getItem("refresh_token"),
  });

  if (refresh.code === 200) {
    localStorage.setItem("access_token", refresh.data.token.accessToken);
    localStorage.setItem("refresh_token", refresh.data.token.refreshToken);
  } else {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    getBlogs({
      limit: PAGE_LIMIT,
      page: 1,
    });
  }
};

console.log(new Date("2023-10-15T17:32:19.167Z"));
// const getProfile = async () => {
//   const token = localStorage.getItem("access_token");
//   const { data } = await client.get("/auth/profile", token);
//   const nameEl = root.querySelector(".profile .name");
//   nameEl.innerText = data.name;
// };

// const render = () => {
//   const loginHtml = `<div class="container py-3">
// <h2 class="text-center">Đăng nhập</h2>
// <hr>
// <form action="" class="login">
//   <div class="mb-3">
//     <label for="">Email</label>
//     <input type="email" class="form-control email" placeholder="Email..." required />
//   </div>
//   <div class="mb-3">
//     <label for="">Password</label>
//     <input type="password" class="form-control password" placeholder="Password..." required />
//   </div>
//   <div class="d-grid">
//     <button class="btn btn-primary">Đăng nhập</button>
//   </div>
// </form>
// </div>`;

//   const welcomeHtml = `
// <div class="container py-3">
//     <h2 class="text-center">Chào mừng bạn đã quay trở lại</h2>
//     <ul class="profile list-unstyled d-flex gap-2">
//         <li>Chào Bạn: <strong class="name"></strong></li>
//         <li><a href="#" class="logout">Đăng Xuất</a></li>

//     </ul>
// </div>`;
//   if (localStorage.getItem("access_token")) {
//     root.innerHTML = welcomeHtml;
//     getProfile();

//     const logout = root.querySelector(".profile .logout");
//     console.log(logout);
//     logout.addEventListener("click", (e) => {
//       e.preventDefault();
//       localStorage.removeItem("access_token");
//       localStorage.removeItem("refresh_token");
//       render();
//     });
//   } else {
//     root.innerHTML = loginHtml;
//     const loginForm = document.querySelector(".login");
//     loginForm.addEventListener("submit", (e) => {
//       e.preventDefault();
//       const emailEl = e.target.querySelector(".email");
//       const passwordEl = e.target.querySelector(".password");

//       const email = emailEl.value;
//       const password = passwordEl.value;

//       handleLogin({ email, password });

//       emailEl.value = "";
//       passwordEl.value = "";
//     });
//   }
// };

// render();

// const handleLogin = async (data) => {
//   const { data: tokens } = await client.post("/auth/login", data);
//   const { access_token, refresh_token } = tokens;

//   localStorage.setItem("access_token", access_token);
//   localStorage.setItem("refresh_token", refresh_token);

//   render();
// };

// /*
// Storage
// 1. localStorage: Lưu trữ vĩnh viễn
// 2. sessionStorage: Lưu trữ theo phiên
// 3. cookie: Lưu trữ có thời hạn

// -> Chỉ lưu trữ Text
// */
