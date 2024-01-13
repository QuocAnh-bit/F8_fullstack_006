const { object, string } = require("yup");
const authService = require("../service/authService");
const uniqueService = require("../service/uniqueService");

module.exports = {
  index: (req, res) => {
    return res.redirect("/auth/login");
  },
  login: (req, res) => {
    const userAgent = req.useragent;
    console.log(userAgent);
    if (req.session.isLogin) {
      return res.redirect("/");
    } else {
      const mess = req.flash("msg");
      console.log(mess);
      res.render("auth/login", { req, mess });
    }
  },
  handleLogin: async (req, res) => {
    const schema = object({
      email: string()
        .required("Email bắt buộc phải nhập")
        .email("Email không đúng định dạng"),
      password: string()
        .required("Mật khẩu bắt buộc phải nhập")
        .min(8, "Mật khẩu phải trên 8 ký tự"),
    });
    try {
      const body = await schema.validate(req.body, { abortEarly: false });

      const checkLogin = await authService.userLogin(body);
      if (checkLogin === "status_false") {
        req.flash("msg", "Tài khoản chưa được kích hoạt");
        req.flash("old", req.body);
        return res.redirect("/auth/login");
      }
      if (!checkLogin) {
        req.flash("msg", "Email hoặc mật khẩu sai! Vui lòng thử lại");
        req.flash("old", req.body);
        return res.redirect("/auth/login");
      } else {
        req.session.isLogin = true;
        req.session.user = checkLogin;

        return res.redirect("/user");
      }
    } catch (e) {
      const err = Object.fromEntries(
        e?.inner.map((item) => [item.path, item.message])
      );
      req.flash("err", err);
      req.flash("old", req.body);
      console.log(err);
    }

    return res.redirect("/auth/login");
  },

  register: (req, res) => {
    if (req.session.isLogin) {
      return res.redirect("/");
    } else {
      res.render("auth/register", { req });
    }
  },
  handleRegister: async (req, res) => {
    const schema = object({
      name: string().required("Tên bắt buộc phải nhập"),
      email: string()
        .required("Email bắt buộc phải nhập")
        .email("Email không đúng định dạng")
        .test("unique", "Email đã tồn tại trên hệ thống", async (value) => {
          return await uniqueService.checkEmailUnique(value);
        }),
      password: string()
        .required("Mật khẩu bắt buộc phải nhập")
        .min(8, "Mật khẩu phải trên 8 ký tự"),
    });
    try {
      const body = await schema.validate(req.body, { abortEarly: false });
      body.status = body.status === "1" ? true : false;
      console.log(body.status);
      authService.userRegister(body);
      req.flash("register", body);
      req.flash("msg", "Đăng Ký thành công");
      return res.redirect("/auth/login");
    } catch (e) {
      const err = Object.fromEntries(
        e?.inner.map((item) => [item.path, item.message])
      );
      req.flash("err", err);
      req.flash("old", req.body);
      console.log(err);
    }
    return res.redirect("/auth/register");
  },
  handleLogout: (req, res) => {
    delete req.session.isLogin;
    delete req.session.user;
    return res.redirect("/auth/login");
  },
};
