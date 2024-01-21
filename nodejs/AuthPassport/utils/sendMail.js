const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST, // Host Mail server
  port: 465, // cổng
  secure: true,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
});
const sendMail = async (to, token) => {
  const info = await transporter.sendMail({
    from: '"Quên mật khẩu" <qanhanh06@gmail.com>', // sender address
    to, // list of receivers
    subject: "Xin vui lòng bấm vào đường link để có thể lấy lại mật khẩu", // Subject line
    html: `<a href="https://auth-passport.vercel.app/auth/reset-password?token=${token}">Link</a>`, // html body
  });

  return info;
};
module.exports = sendMail;
