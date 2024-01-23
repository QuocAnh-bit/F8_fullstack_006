const model = require("../models/index");
const { isRole } = require("../utils/role.utils");

const User = model.User;
const Role = model.Role;

module.exports = {
  index: async (req, res) => {
    const { status, keyword, group } = req.query;
    const filter = {};
    // if (status === "active" || status === "inactive") {
    //   filter.status = status === "active" ? true : false;
    // }
    // if (keyword) {
    //   filter[Op.or] = [
    //     {
    //       name: {
    //         [Op.iLike]: `%${keyword}%`,
    //       },
    //     },
    //     {
    //       email: {
    //         [Op.iLike]: `%${keyword}%`,
    //       },
    //     },
    //   ];
    // }
    // if (group) {
    //   filter.group_id = group;
    // }
    // const limit = 2;
    // const { page = 1 } = req.query;

    // const offset = (page - 1) * limit;
    const { rows: users, count } = await User.findAndCountAll({
      order: [["id", "desc"]],
      where: filter,
      //paranoid: false,
      //   limit,
      //   offset,
      //   include: [
      //     {
      //       model: model.Phone,
      //       as: "phones",
      //     },
      //     {
      //       model: model.Group,
      //       as: "group",
      //     },
      //   ],
    });
    // const totalPage = Math.ceil(count / limit);
    // const groups = await Group.findAll({
    //   order: [["name", "asc"]],
    // });
    res.render("users/index", { users, req });
  },
  permission: async (req, res) => {
    const { id } = req.params;
    const roles = await Role.findAll({ order: [["id", "desc"]] });
    const user = await User.findOne({
      where: { id },
      include: {
        model: Role,
        as: "roles",
      },
    });
    const msg = req.flash("msg");
    res.render("users/permission", { roles, isRole, user, msg });
  },
  handlePermission: async (req, res) => {
    const { id } = req.params;
    const user = await User.findByPk(id);
    const roles = !req.body.role
      ? []
      : !Array.isArray(req.body.role)
      ? [req.body.role]
      : req.body.role;
    if (user) {
      const rolesReq = await Promise.all(
        roles.map((role) => Role.findByPk(+role))
      );
      await user.setRoles(rolesReq);
    }
    req.flash("msg", "Phân quyền thành công");
    return res.redirect("/users/permission/" + id);
  },
};
