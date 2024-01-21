const { object, string, ref } = require("yup");
const uniqueService = require("../service/uniqueService");
const authService = require("../service/authService");
const jwt = require("jsonwebtoken");

module.exports = {
  login: (req, res) => {
    const error = req.flash("error");
    const msg = req.flash("msg");

    res.render("auth/login", { error, req, msg });
  },
  handleLogin: async (req, res, next) => {
    const schema = object({
      email: string()
        .required("Email bắt buộc phải nhập")
        .email("Email không đúng định dạng"),
      password: string()
        .required("Mật khẩu bắt buộc phải nhập")
        .min(8, "Mật khẩu phải trên 8 ký tự"),
    });
    try {
      await schema.validate(req.body, { abortEarly: false });
      return next();
    } catch (e) {
      const err = Object.fromEntries(
        e?.inner.map((item) => [item.path, item.message])
      );
      req.flash("err", err);
      req.flash("old", req.body);
    }
    return res.redirect("/auth/login");
  },
  register: (req, res) => {
    res.render("auth/register", { req });
  },
  handleRegister: async (req, res) => {
    const schema = object({
      name: string().required("Tên bắt buộc phải nhập"),
      email: string()
        .required("Email bắt buộc phải nhập")
        .email("Email không đúng định dạng"),
      // .test("unique", "Email đã tồn tại trên hệ thống", async (value) => {
      //   return await uniqueService.checkEmailUnique(value);
      // }),
      password: string()
        .required("Mật khẩu bắt buộc phải nhập")
        .min(8, "Mật khẩu phải trên 8 ký tự"),
    });
    try {
      const body = await schema.validate(req.body, { abortEarly: false });
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
  forgotPassword: (req, res) => {
    const msg = req.flash("msg");
    res.render("auth/forgot", { msg });
  },
  handleForgot: async (req, res) => {
    const schema = object({
      email: string()
        .required("Email bắt buộc phải nhập")
        .email("Email không đúng định dạng"),
    });
    try {
      const body = await schema.validate(req.body, { abortEarly: false });
      const forgotPassword = await authService.forgotPassword(body.email);
      if (!forgotPassword) {
        req.flash("msg", "Không tồn tại email");
        return res.redirect("/auth/forgot-password");
      }
      req.flash(
        "msg",
        "Gửi thành công ! Vui lòng kiểm tra lại mail để lấy lại mật khẩu"
      );
    } catch (e) {
      const err = Object.fromEntries(
        e?.inner.map((item) => [item.path, item.message])
      );
      req.flash("err", err);
      req.flash("old", req.body);
      console.log(err);
    }
    return res.redirect("/auth/forgot-password");
  },
  resetPassword: (req, res) => {
    const msg = req.flash("msg");

    res.render("auth/resetPassword", { req, msg });
  },
  handleResetPassword: async (req, res) => {
    const { token } = req.query;
    const schema = object({
      password: string()
        .required("Mật khẩu phải nhập")
        .min(8, "Mật khẩu phải trên 8 ký tự"),
      passwordConfirm: string().oneOf(
        [ref("password"), null],
        "Mật khẩu không trùng khớp"
      ),
    });
    try {
      const body = await schema.validate(req.body, { abortEarly: false });
      const resetPassword = await authService.resetPassword(
        token,
        body.password
      );
      console.log(resetPassword);
      if (!resetPassword) {
        req.flash("msg", "Tài khoản không hợp lệ hoặc token đã hết hạn");
        return res.redirect(`/auth/reset-password?token=${token}`);
      }
      req.flash("msg", "Đổi mật khẩu thành công");
      return res.redirect(`/auth/login`);
    } catch (e) {
      const err = Object.fromEntries(
        e?.inner.map((item) => [item.path, item.message])
      );
      req.flash("err", err);
      req.flash("old", req.body);
      console.log(err);
    }
    return res.redirect(`/auth/reset-password?token=${token}`);
  },
};
