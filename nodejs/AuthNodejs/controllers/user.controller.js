const { object, string, ref } = require("yup");
const uniqueService = require("../service/uniqueService");
const userService = require("../service/userService");
const model = require("../models/index");
const moment = require("moment");
const Device = model.Device;
const User = model.User;

module.exports = {
  index: async (req, res) => {
    const mess = req.flash("msg");
    const messPass = req.flash("msgPass");
    const userId = req.session.user.id;

    try {
      const userDevice = await userService.userDeviceDb(req.useragent, userId);
      const user = await userService.getUser(userId);
      return res.render("user/index", {
        user,
        req,
        mess,
        messPass,
        userDevice,
        moment,
      });
    } catch (error) {
      console.log(error);
    }
  },
  handleEditName: async (req, res) => {
    const { id: userId, password } = req.session.user;
    const schema = object({
      name: string().required("Tên bắt buộc phải nhập"),
      email: string()
        .required("Email bắt buộc phải nhập")
        .email("Email không đúng định dạng")
        .test("unique", "Email đã tồn tại trên hệ thống", async (value) => {
          return await uniqueService.checkEmailUnique(value, userId);
        }),
    });
    try {
      const body = await schema.validate(req.body, { abortEarly: false });

      const a = await User.update(body, {
        where: { id: userId },
      });
      req.flash("msg", "Thay đổi thông tin thành công");
      return res.redirect("/user");
    } catch (e) {
      console.log(e);
      const err = Object.fromEntries(
        e?.inner.map((item) => [item.path, item.message])
      );
      req.flash("err", err);

      req.flash("old", req.body);
      console.log(err);
    }
    return res.redirect("/user");
  },
  handleEditPass: async (req, res) => {
    const { id: userId, password } = req.session.user;
    const schema = object({
      oldPass: string()
        .test("oldPass", "Mật Khẩu cũ không đúng", async (value) => {
          return await userService.checkOldPass(value, password);
        })
        .required("Nhập mật khẩu cũ")
        .min(8, "Mật khẩu phải trên 8 ký tự"),
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
      await userService.userUpdatePass(body.password, userId);
      req.flash("msgPass", "Thay đổi thông tin thành công");
      return res.redirect("/user");
    } catch (e) {
      console.log(e.inner);
      const err = Object.fromEntries(
        e?.inner.map((item) => [item.path, item.message])
      );
      req.flash("err", err);

      req.flash("old", req.body);
    }
    return res.redirect("/user");
  },
};
