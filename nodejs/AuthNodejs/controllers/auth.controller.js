const { object, string } = require("yup");
const authService = require("../service/authService");

module.exports = {
  login: (req, res) => {
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
      if (!checkLogin) {
        req.flash("msg", "Email hoặc mật khẩu sai! Vui lòng thử lại");
        req.flash("old", req.body);
        return res.redirect("/login");
      } else {
        req.session.isLogin = true;
        req.session.user = body;
        return res.redirect("/");
      }
    } catch (e) {
      const err = Object.fromEntries(
        e?.inner.map((item) => [item.path, item.message])
      );
      req.flash("err", err);
      req.flash("old", req.body);
      console.log(err);
    }

    return res.redirect("/login");
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
          return await authService.checkEmailUnique(value);
        }),
      password: string()
        .required("Mật khẩu bắt buộc phải nhập")
        .min(8, "Mật khẩu phải trên 8 ký tự"),
    });
    try {
      const body = await schema.validate(req.body, { abortEarly: false });
      authService.userRegister(body);
      req.flash("register", body);
      req.flash("msg", "Đăng Ký thành công");
      return res.redirect("/login");
    } catch (e) {
      const err = Object.fromEntries(
        e?.inner.map((item) => [item.path, item.message])
      );
      req.flash("err", err);
      req.flash("old", req.body);
      console.log(err);
    }
    return res.redirect("/login/register");
  },
  handleLogout: (req, res) => {
    delete req.session.isLogin;
    delete req.session.user;
    return res.redirect("/login");
  },
};
