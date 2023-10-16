import { config } from "./config.js";
import { client } from "./client.js";

const { SERVER_AUTH_API, PAGE_LIMIT } = config;

// Xử lý đóng mở login
const wrapBtn = document.querySelector(".open-sign-in");
const openSignIn = document.querySelector(".btn-sign-in");
console.log(openSignIn);
const container = document.querySelector(".container");

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
        boxLogin.innerHTML = htmlLogin;
      });
    }

    if (e.target.className === "btn-login-back") {
      boxLogin.innerHTML = htmlLogin;
    }
  });

  const loginForm = document.querySelector(".login-form");
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const emailEl = e.target.querySelector(".email");
    const passwordEl = e.target.querySelector(".password");

    const email = emailEl.value;
    const password = passwordEl.value;

    handleLogin({ email, password });

    emailEl.value = "";
    passwordEl.value = "";
  });
};

const renderCreateBlog = () => {
  const blogList = document.querySelector(".blog-list");
  const createBlog = document.createElement("div");
  createBlog.className = "create-blog";
  const htmlCreate = `
  <span class="link">
  <a href="" class="wrap">
    <span class="avatar"></span>
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
  <div class="btn-form">
    <button class="btn-add-create">Post</button>
  </div>
</form>
  `;
  createBlog.innerHTML = htmlCreate;
  blogList.insertAdjacentElement("afterbegin", createBlog);
};
const renderBlogs = (blogs) => {
  const contentWrap = document.querySelector(".content");

  blogs.forEach((item) => {
    const html = `
    <section class="blog-item">
    <span class="date">
      14
      <br />
      10
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
    const btnLogout = document.createElement("button");
    btnLogout.className = "btn-logout";
    wrapBtn.append(btnLogout);
    btnLogout.addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      document.querySelector(".create-blog").remove();
      btnLogout.remove();
      const btnLogout = document.createElement("div");
      btnLogout.className = "btn-sign-in";
      wrapBtn.append(btnLogout);
    });
  }
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
  showResponse(tokens);
  if (tokens.status_code === "SUCCESS") {
    const { accessToken, refreshToken } = tokens.data;
    localStorage.setItem("access_token", accessToken);
    localStorage.setItem("refresh_token", refreshToken);
    document.querySelector(".wrapper-login").remove();
    openSignIn.remove();
    renderCreateBlog();
    const btnLogout = document.createElement("button");
    btnLogout.className = "btn-logout";
    wrapBtn.append(btnLogout);
    btnLogout.addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      document.querySelector(".create-blog").remove();
      btnLogout.remove();
      const btnLogout = document.createElement("div");
      btnLogout.className = "btn-sign-in";
      wrapBtn.append(btnLogout);
    });
  }
};

const handleRegister = async (data) => {
  const { data: response } = await client.post("/auth/register", data);

  showResponse(response);
};

const showResponse = async (response) => {
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
  console.log(response);
  if (response.code === 400) {
    container.append(toastWrap);
    getStatus(toastWrap, response);
    toastWrap.style.background = "red";
  } else {
    container.append(toastWrap);
    toastWrap.style.background = "#77fe00";
    getStatus(toastWrap, response);
  }
};

const getStatus = (element, response) => {
  const titleToast = element.querySelector(".title-toast");
  const messageToast = element.querySelector(".message-toast");

  titleToast.innerText = response.status_code;
  messageToast.innerText = response.message;
  setTimeout(() => {
    element.remove();
  }, 2000);
};

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
