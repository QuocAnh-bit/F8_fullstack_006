const LocalStrategy = require("passport-local").Strategy;
const { User, Provider } = require("../models/index");
const bcrypt = require("bcrypt");

const passportLocal = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  async (email, password, done) => {
    const provider = await Provider.findOne({
      where: { name: "email" },
    });
    const user = await User.findOne({
      where: { email, provider_id: provider.id },
    });
    if (!user) {
      return done(null, false, {
        message: "Email không tồn tại hoặc mật khẩu không tồn tại ",
      }); // gửi message vào flash nếu khoog tìm thấy
    }
    const passwordDB = user.password;
    const result = bcrypt.compareSync(password, passwordDB);
    if (result) {
      return done(null, user); // Lưu user vào session
    }

    done(null, false, {
      message: "Email không tồn tại hoặc mật khẩu không tồn tại ",
    });
  }
);

module.exports = passportLocal;
