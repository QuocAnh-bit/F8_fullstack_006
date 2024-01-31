const { Role, Permission, User } = require("../models/index");
module.exports = (value) => {
  return async (req, res, next) => {
    const user = await User.findOne({
      where: { id: req.user.id },
      include: {
        model: Role,
        as: "roles",
        include: {
          model: Permission,
          as: "permissions",
        },
      },
    }); //Thông tin người dùng
    const permissions = [];
    if (user?.roles?.length) {
      user.roles.forEach((role) => {
        if (role?.permissions?.length) {
          role.permissions.forEach((item) => {
            !permissions.includes(item.value) && permissions.push(item.value);
          });
        }
      });
    }
    if (permissions.includes) next();
  };
};
