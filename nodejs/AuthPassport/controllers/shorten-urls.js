const shortid = require("shortid");
const { object, string, ref } = require("yup");
const uniqueService = require("../service/uniqueService");
const model = require("../models/index");
const ShortenUrl = model.ShortenUrl;
const QRCode = require("qrcode");

module.exports = {
  index: async (req, res) => {
    const baseUrl = process.env.BASE_SHORT_URL;
    const shortenUrls = await ShortenUrl.findAll({
      order: [["id", "DESC"]],
      where: { user_id: req.user.id },
    });
    console.log(req.url);
    const patternRootLink =
      /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}/;
    res.render("shorten-urls/index", {
      shortid,
      baseUrl,
      shortenUrls,
      patternRootLink,
    });
  },
  handleShorten: async (req, res) => {
    const baseUrl = process.env.BASE_SHORT_URL;
    const schema = object({
      root_link: string()
        .required("Vui lòng nhập liên kết")
        .matches(
          /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}/,
          "Nhập đúng định dạng liên kết"
        ),
      new_link: string()
        .required("Vui lòng nhập liên kết")
        .test("uniqueLink", async (value) => {
          return await uniqueService.checkIdUrl(value);
        }),
    });
    try {
      const body = await schema.validate(req.body, { abortEarly: false });
      await ShortenUrl.create({
        new_link: baseUrl + body.new_link,
        password: body.password,
        root_link: body.root_link,
        check: body.check ? true : false,
        user_id: req.user.id,
      });
      return res.json(req.body);
    } catch (e) {
      const err = Object.fromEntries(
        e?.inner.map((item) => [item.path, item.message])
      );
      req.flash("err", err);
      req.flash("old", req.body);
      console.log(err);
    }
    return res.redirect("/shorten-urls");
  },
  handleShortId: async (req, res) => {
    const baseUrl = process.env.BASE_SHORT_URL;
    const { shortId } = req.params;
    const fullUrl = await ShortenUrl.findOne({
      where: { new_link: baseUrl + shortId },
    });
    await fullUrl.update({ clicks: fullUrl.clicks + 1 });
    if (!fullUrl.check) {
      return res.redirect(fullUrl.root_link);
    } else {
      QRCode.toDataURL(fullUrl.root_link, (err, qrCodeUrl) => {
        if (err) {
          return res.send("lỗi");
        }
        console.log();
        return res.render("shorten-urls/confirm", { qrCodeUrl, fullUrl });
      });
    }
  },
};
