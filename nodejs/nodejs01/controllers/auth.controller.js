import { object, string } from "yup";
import { getErr } from "../utils/validate.js";

const authController = {
  login: (req, res) => {
    //const msg = req.flash("msg");
    const errors = req.flash("errors");
    res.render("auth/login", {
      layout: "layout/layout.auth.ejs",
      errors,
      getErr,
    });
  },
  handleLogin: async (req, res) => {
    const schema = object({
      email: string()
        .required("Bắt buộc nhập email")
        .email("Định dạng không đúng"),
      password: string().required("Bắt buộc nhập mật khẩu"),
    });
    try {
      const data = await schema.validate(req.body, {
        abortEarly: false,
      });
    } catch (e) {
      const errors = Object.fromEntries(
        e.inner.map(({ path, message }) => [path, message])
      );
      req.flash("errors", errors);
      console.log(errors);
    }
    //req.flash("msg", "OK");
    return res.redirect("/dang-nhap");
  },
};
export default authController;
