import { config } from "./config.js";
import { client } from "./client.js";

const { SERVER_AUTH_API } = config;

client.setUrl(SERVER_AUTH_API);

const root = document.querySelector("#root");

// Hàm gọi API Profile
const getProfile = async () => {
  const token = localStorage.getItem("access_token");

  const { data } = await client.get("/auth/profile", token);

  const nameEl = root.querySelector(".profile .name");
  const img = root.querySelector(".profile .avt");
  console.log();
  img.src =
    "https://fastly.picsum.photos/id/206/200/300.jpg?hmac=zgY9ucK8PnViYfAc_jWui8B3N-I1-cVdM4BtXYOpk7I";
  nameEl.innerText = data.name;
};

const render = () => {
  const loginHtml = `
    <div class="container py-3">
        <h2 class="text-center">Đăng nhập</h2>
    <hr />
    <form action="" class="form-login">
      <div class="mb-3">
        <label for="">Email</label>
        <input
          type="email"
          class="form-control email"
          placeholder="Email..."
          required
        />
      </div>
      <div class="mb-3">
        <label for="">Password</label>
        <input
          type="password"
          class="form-control password"
          placeholder="Password..."
          required
        />
      </div>
      <div class="d-grid">
        <button class="btn btn-primary">Đăng nhập</button>
      </div>
    </form>
    </div>
    `;

  const welcomeHtml = `
    <div class="container py-3">
        <h2 class="text-center">Chào mừng đã quay trở lại</h2>
        <ul class="profile list-unstyled d-flex gap-2">
            <img src="" alt="" class="avt">
            <li>Chào bạn: <b class="name"></b></li>
            <li><a href="!#" class="logout">Đăng Xuất</a></li>
        </ul>
    </div>
    `;

  if (localStorage.getItem("access_token")) {
    root.innerHTML = welcomeHtml;
    // lấy thông tin user
    getProfile();

    const logOut = root.querySelector(".profile .logout");

    logOut.addEventListener("click", (e) => {
      console.log("ok");
      e.preventDefault();

      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");

      render();
    });
  } else {
    root.innerHTML = loginHtml;

    const formLogin = document.querySelector(".form-login");

    formLogin.addEventListener("submit", (e) => {
      e.preventDefault();

      const emailEl = e.target.querySelector(".email");
      const passwordEl = e.target.querySelector(".password");

      const email = emailEl.value;
      const password = passwordEl.value;

      handleLogin({ email, password });

      emailEl.value = "";
      passwordEl.value = "";
    });
  }
};

render();

// Hàm gọi API
const handleLogin = async (data) => {
  const { data: tokens } = await client.post(`/auth/login`, data);

  const { access_token, refresh_token } = tokens;

  localStorage.setItem("access_token", access_token);
  localStorage.setItem("refresh_token", refresh_token);

  render();
};

/*
1. localStorage : Lưu trữ vĩnh viễn
2. sessionStorage : Lưu trữ theo phiên 
3. cookie: Lưu trữ có thời hạn, dung lượng ít


-> Chỉ lưu trữ được text 
*/
/*
 logout :
 - Call Api
 - Xóa storage
 -  Xử lý khi user sửa accessToken -> verify server
 - Nếu trả về 200 = > OK
 - Nếu trả về 401 => Logout

 Khi access Token hết hạn => Xử lý luôn việc cấp lại accessToken mới = > lưu storage => 
 call lại api cần lấy dữ liệu
 Ví dụ : 
 1. Lấy dsach sản phẩm -> lấy được

 2. lấy danh sách bài viết -> acesstoken hết hạn -> không lấy được bài viết

 - call api /refresh -> lấy access mới -> lưu localStorage -> call lại ds bài viết

 3. Lấy danh sách khóa học

*/
