const bcrypt = require("bcrypt");
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
const model = require("../models/index");
const User = model.User;

// Băm password của người dùng
const hashPassRegister = (password) => {
  const hashPassWord = bcrypt.hashSync(password, salt);
  return hashPassWord;
};

const userRegister = async (userProfile) => {
  const { name, email, password } = userProfile;
  const hashPassWord = hashPassRegister(password);
  await User.create({
    name: name,
    email: email,
    password: hashPassWord,
  });
};

const userLogin = async (userLogin) => {
  const { email, password } = userLogin;

  try {
    const check = await User.findOne({ where: { email } });

    if (check === null) {
      return false;
    }
    const result = await bcrypt.compare(password, check.password);
    if (result) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    console.log("Login error:", e);
    return false;
  }
};

const checkEmailUnique = async (email) => {
  const check = await User.findOne({ where: { email } });
  return check === null ? true : false;
};

module.exports = {
  userRegister,
  checkEmailUnique,
  userLogin,
};
