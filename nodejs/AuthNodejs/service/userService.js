const { where } = require("sequelize");
const model = require("../models/index");
const User = model.User;
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

module.exports = {
  getUser,
  checkOldPass,
  userUpdatePass,
};
