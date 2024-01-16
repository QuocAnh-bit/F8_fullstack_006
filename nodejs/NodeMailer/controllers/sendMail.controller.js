const { object, string } = require("yup");
const crypto = require("crypto");
const model = require("../models/index");
const History = model.History;
const sendMail = require("../utils/mail");
const path = require("path");
const moment = require("moment");
const flash = require("express-flash");

const pathTracking = path.resolve(
  __dirname,
  "..",
  "public",
  "images",
  "tracking.png"
);

module.exports = {
  index: async (req, res) => {
    const msg = req.flash("msg");
    res.render("sendMail/index", { msg, req });
  },
  handleSendMail: async (req, res) => {
    const schema = object({
      email: string()
        .required("Email người nhận bắt buộc phải nhập")
        .email("Email không đúng định dạng"),
      title: string().required("Tiêu đề bắt buộc phải nhập"),
      message: string().required("Tin nhắn bắt buộc phải nhập"),
    });
    try {
      const id = crypto.randomUUID();
      const body = await schema.validate(req.body, { abortEarly: false });
      await sendMail(body.email, body.title, body.message, id);
      req.flash("msg", "Gửi Thành công");

      await History.create({
        id,
        send_to: body.email,
        title: body.title,
        message: body.message,
      });
    } catch (e) {
      const errors = Object.fromEntries(
        e?.inner.map((item) => [item.path, item.message])
      );
      req.flash("errors", errors);
      req.flash("old", req.body);
    }
    return res.redirect("/send-mail");
  },
  handleTracking: async (req, res) => {
    const mailId = req.params.id;

    await History.update(
      { status: true },
      {
        where: { id: mailId },
      }
    );
    res.sendFile(pathTracking);
  },
  history: async (req, res) => {
    const limit = 5;
    const { page = 1 } = req.query;
    const offset = (page - 1) * limit;
    const { rows: histories, count } = await History.findAndCountAll({
      order: [["created_at", "desc"]],
      limit,
      offset,
    });
    const totalPage = Math.ceil(count / limit);
    res.render("sendMail/history", { histories, totalPage, req, moment });
  },
  historyDetail: async (req, res, next) => {
    const { id } = req.params;
    try {
      const history = await History.findOne({
        where: { id },
      });
      if (history === null) {
        throw new Error("Id không tồn tại");
      }
      res.render("sendMail/detailHistory", { history, moment });
    } catch (e) {
      next(e);
    }
  },
};
