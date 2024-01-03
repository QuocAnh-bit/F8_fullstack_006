const userModel = require("../model/user.model");
const moment = require("moment");
const { object, string } = require("yup");
module.exports = {
  index: async (req, res) => {
    const { status, keyword } = req.query;
    let statusBool;
    if (status === "active" || status === "inactive") {
      statusBool = status === "active" ? true : false;
    }

    //Đọc dữ liệu từ database
    const users = await userModel.all(statusBool, keyword);
    const msg = req.flash("msg");
    res.render("users/index", { users, moment, status, keyword, msg });
  },
  add: (req, res) => {
    console.log(req.body);
    res.render("users/add", { req });
  },
  handleAdd: async (req, res) => {
    const schema = object({
      name: string().required("Tên bắt buộc phải nhập"),
      email: string()
        .required("Email bắt buộc phải nhập")
        .email("Email không đúng định dạng")
        .test("unique", "Email đã tồn tại trên hệ thống", async (value) => {
          return await userModel.emailUnique(value);
        }),
    });
    try {
      const body = await schema.validate(req.body, { abortEarly: false });
      body.status = body.status === "1" ? true : false;
      await userModel.create(body);
      req.flash("msg", "Thêm thành công");
      return res.redirect("/users");
      // const result = await userModel.emailUnique(body.email);
      // console.log(result);
    } catch (e) {
      console.log(e);
      const errors = Object.fromEntries(
        e?.inner.map((item) => [item.path, item.message])
      );
      req.flash("errors", errors);
      req.flash("old", req.body);
    }
    return res.redirect("/users/add");
  },
  edit: async (req, res) => {
    const editId = req.params.id;
    console.log(req.body);
    const [editData] = await userModel.getEdit(editId);
    res.render("users/edit", { editData, req });
  },
  handleEdit: async (req, res) => {
    const editId = req.body.id;
    const editEmail = req.body.email;

    const schema = object({
      name: string().required("Tên bắt buộc phải nhập"),
      email: string()
        .required("Email bắt buộc phải nhập")
        .email("Email không đúng định dạng"),
    });

    try {
      const body = await schema.validate(req.body, { abortEarly: false });
      await userModel.updateUser(body);
      req.flash("msg", "Cập nhật thành công");
      return res.redirect("/users");
    } catch (e) {
      console.log(e);
      const errors = Object?.fromEntries(
        e?.inner?.map((item) => [item.path, item.message])
      );

      req.flash("errors", errors);
    }
    return res.redirect(`/users/edit/${editId}?`);
  },
  delete: async (req, res) => {
    const userId = req.body.userId;
    await userModel.delete(userId);
    return res.redirect("/users");
  },
};
