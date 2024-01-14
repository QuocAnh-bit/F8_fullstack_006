const { where } = require("sequelize");
const model = require("../models/index");
const User = model.User;
const Device = model.Device;

const bcrypt = require("bcrypt");
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

const getUser = async (id) => {
  try {
    return await User.findOne({ where: { id } });
  } catch (e) {
    console.log("Login error:", e);
  }
};

const hashPass = (password) => {
  const hashPassWord = bcrypt.hashSync(password, salt);
  return hashPassWord;
};

const userUpdatePass = async (password, id) => {
  const hashPassWord = hashPass(password);
  try {
    await User.update(
      {
        password: hashPassWord,
      },
      { where: { id } }
    );
  } catch (e) {
    console.log("Login error:", e);
    return false;
  }
};

const checkOldPass = async (valuePass, oldPass) => {
  const result = await bcrypt.compare(valuePass, oldPass);
  if (result) {
    console.log("đúng");
    return true;
  } else {
    return false;
  }
};

const userDeviceDb = async (deviceInfo, userId) => {
  const { browser, source, os, isMobile, isDesktop } = deviceInfo;
  const timeLogin = Date.now();
  const timeActive = Date.now();
  const [device, created] = await Device.findOrCreate({
    where: { src: source },
    defaults: {
      user_id: userId,
      name: isDesktop
        ? "Máy Tính"
        : isMobile
        ? "Điện Thoại"
        : "Thiết bị không xác định",
      browser,
      system: os,
      src: source,
      login_time: timeLogin,
      active_time: timeActive,
    },
  });

  if (!created) {
    await Device.update(
      { login_time: timeLogin, active_time: timeActive },
      { where: { user_id: userId } }
    );
  }
  return await Device.findAll({ where: { user_id: userId } });
};

module.exports = {
  getUser,
  checkOldPass,
  userUpdatePass,
  userDeviceDb,
};
