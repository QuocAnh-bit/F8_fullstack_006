const model = require("../models/index");
const User = model.User;
const Role = model.Role;

const { Op } = require("sequelize");

const checkEmailUnique = async (email, id = 0) => {
  try {
    const ignore = id > 0 ? { email, id: { [Op.not]: id } } : { email };
    console.log("ignore", ignore);
    const check = await User.findOne({ where: ignore });
    return check === null ? true : false;
  } catch (error) {
    console.log(error);
  }
};

const checkRoleUnique = async (name, id = 0) => {
  name = name.trim();
  try {
    const ignore = id > 0 ? { name, id: { [Op.not]: +id } } : { name };
    console.log("ignore", name);
    const check = await Role.findOne({ where: ignore });
    return check === null ? true : false;
  } catch (error) {
    console.log(error);
  }
};
``;

module.exports = {
  checkEmailUnique,
  checkRoleUnique,
};
