const model = require("../models/index");
const { object, string, ref } = require("yup");
const { isPermission } = require("../utils/permission.utils");
const uniqueService = require("../service/uniqueService");
const Role = model.Role;
const Permission = model.Permission;
const User = model.User;

module.exports = {
  index: async (req, res) => {
    const roles = await Role.findAll({
      order: [["id", "desc"]],
    });
    const msg = req.flash("msg");
    res.render("roles/index", { roles, msg });
  },
  add: async (req, res) => {
    res.render("roles/add", { req });
  },
  handleAdd: async (req, res) => {
    const schema = object({
      role_name: string()
        .required("Tên role bắt buộc phải nhập")
        .test("unique", "Tên role đã tồn tại", async (value) => {
          return await uniqueService.checkRoleUnique(value);
        }),
    });
    try {
      const body = await schema.validate(req.body, { abortEarly: false });

      const permissions = !body.permission
        ? []
        : !Array.isArray(body.permission)
        ? [body.permission]
        : body.permission;

      const role = await Role.create({
        name: body.role_name,
      });
      if (role) {
        if (permissions.length) {
          for (let i = 0; i < permissions.length; i++) {
            let permission = await Permission.findOne({
              where: { value: permissions[i] },
            });
            if (!permission) {
              permission = await Permission.create({
                value: permissions[i],
              });
            }
            await role.addPermissions(permission);
          }
        }
      }
      req.flash("msg", " Thêm thành công ");
    } catch (e) {
      const err = Object.fromEntries(
        e?.inner.map((item) => [item.path, item.message])
      );
      req.flash("err", err);
      req.flash("old", req.body);
      console.log(err);
    }
    return res.redirect("/roles");
  },
  edit: async (req, res, next) => {
    const { id } = req.params;
    try {
      const roles = await Role.findAll({
        order: [["id", "desc"]],
      });
      const role = await Role.findOne({
        where: { id },
        include: {
          model: Permission,
          as: "permissions",
        },
      });
      const msg = req.flash("msg");
      res.render("roles/edit", { roles, role, isPermission, req, msg });
    } catch (error) {
      return next(error);
    }
  },
  handleEdit: async (req, res) => {
    const { id } = req.params;
    const schema = object({
      role_name: string()
        .required("Tên role bắt buộc phải nhập")
        .test("unique", "Tên role đã tồn tại", async (value) => {
          return await uniqueService.checkRoleUnique(value, id);
        }),
    });

    try {
      const body = await schema.validate(req.body, { abortEarly: false });
      const permissions = !body.permission
        ? []
        : !Array.isArray(body.permission)
        ? [body.permission]
        : body.permission;
      console.log("permissions", permissions);
      const statusUpdateRole = await Role.update(
        { name: body.role_name },
        { where: { id } }
      );
      if (statusUpdateRole && permissions.length) {
        const permissionsReq = await Promise.all(
          permissions.map(async (permissionName) => {
            let permission = await Permission.findOne({
              where: { value: permissionName },
            });
            if (!permission) {
              permission = await Permission.create({
                value: permissionName,
              });
            }
            return permission;
          })
        );
        const role = await Role.findByPk(id);
        await role.setPermissions(permissionsReq);
        req.flash("msg", " Sửa thành công");
      } else {
        console.log("KHOOOOOOOOOOOOOOOOOOOOOOOOOOOO");
      }
    } catch (e) {
      console.log(e);

      const err = Object.fromEntries(
        e?.inner.map((item) => [item.path, item.message])
      );
      req.flash("err", err);
      req.flash("old", req.body);
    }
    return res.redirect("/roles/edit/" + id);
  },
  delete: async (req, res) => {
    const { id } = req.params;
    const role = await Role.findOne({
      where: { id },
      include: [
        {
          model: Permission,
          as: "permissions",
        },
        {
          model: User,
          as: "user",
        },
      ],
    });
    if (role.user.length) {
      await role.removeUser(role.user[0].id);
    }
    if (role) {
      const { permissions } = role;
      await role.removePermissions(permissions);
      await role.destroy();
    }

    return res.redirect("/roles");
  },
};
