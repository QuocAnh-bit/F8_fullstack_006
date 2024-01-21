const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
const model = require("../models/index");
const User = model.User;
const Provider = model.Provider;

const sendMail = require("../utils/sendMail");

// Băm password của người dùng
const hashPass = (password) => {
  const hashPassWord = bcrypt.hashSync(password, salt);
  return hashPassWord;
};

const userRegister = async (userProfile) => {
  const { name, email, password, status } = userProfile;
  const hashPassWord = hashPass(password);
  const [provider, created] = await Provider.findOrCreate({
    where: { name: "email" },
    defaults: {
      name: "email",
    },
  });
  if (created) {
    console.log(provider.id);
  }
  await User.create({
    name,
    email,
    password: hashPassWord,
    status,
    provider_id: provider.id,
    // Provider: {
    //   name: "email",
    // },
    // include: [Provider],
  });
};

const forgotPassword = async (email) => {
  const provider = await Provider.findOne({
    where: { name: "email" },
  });
  console.log(provider.id);
  const user = await User.findOne({
    where: { email, provider_id: provider.id },
  });
  try {
    if (!user) {
      return false;
    }
    const token = jwt.sign(
      { email: user.email, id: user.id },
      process.env.PRIVATE_KEY,
      { expiresIn: "15m" }
    );
    console.log(token);
    await sendMail(email, token);

    return true;
  } catch (error) {
    console.log(error);
  }
};

const resetPassword = async (token, password) => {
  try {
    const decoded = jwt.verify(token, process.env.PRIVATE_KEY);
    if (decoded && decoded.id) {
      const user = await User.findOne({
        where: { id: decoded.id },
      });
      if (!user) {
        return false;
      }
      console.log(password);
      const hashPassWord = hashPass(password);
      await User.update(
        { password: hashPassWord },
        { where: { id: decoded.id } }
      );
      return true;
    }
  } catch (e) {
    console.log("lỗi");
    return false;
  }
};

module.exports = {
  userRegister,
  forgotPassword,
  resetPassword,
};
