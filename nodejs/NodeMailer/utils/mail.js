const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com", // Host Mail server
  port: 465, // cổng
  secure: true,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: "qanhanh06@gmail.com",
    pass: "tfmq wzop xfwf dwez",
  },
});

const sendMail = async (to, subject, message, id) => {
  const html = `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Email Template</title>
      <style>
          body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              margin: 0;
              padding: 0;
              background-color: #f4f4f4;
          }
  
          .container {
              max-width: 600px;
              margin: 20px auto;
              padding: 20px;
              background-color: #ffffff;
              border-radius: 5px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
  
          h1 {
              color: #333333;
          }
  
          p {
              color: #666666;
          }
      </style>
  </head>
  <body>
  
      <div class="container">
          <h1>Subject: ${subject}</h1>
  
          <p>Chào ${to},</p>
  
          <p>${message}</p>
  
          <img src="https://node-mailer-nine.vercel.app/send-mail/tracking/${id}" alt="" />
      </div>
  
  </body>
  </html>`;
  const info = await transporter.sendMail({
    from: '"F8-EDU" <qanhanh06@gmail.com>', // sender address
    to, // list of receivers
    subject, // Subject line
    html, // html body
  });
  console.log(id);
  return info;
};
module.exports = sendMail;
