const { User, Provider } = require("../../models/index");
const { Op, where } = require("sequelize");
const { object, string, ref } = require("yup");
const authService = require("../../service/authService");

module.exports = {
  index: async (req, res) => {
    const {
      order = "asc",
      sort = "id",
      status,
      q,
      page = 1,
      limit,
    } = req.query;
    const filters = {};
    const options = {
      order: [[sort, order]],
      attributes: { exclude: ["password"] },
      where: filters, // loại trừ trường password
      include: {
        model: Provider,
        as: "provider",
      },
    };
    if (status == "true" || status == "false") {
      filters.status = status === "true";
    }
    if (q) {
      filters[Op.or] = {
        name: {
          [Op.iLike]: `%${q.trim()}%`,
        },
        email: {
          [Op.iLike]: `%${q.trim()}%`,
        },
      };
    }
    if (limit && Number.isInteger(+limit)) {
      const offset = (page - 1) * limit;
      options.offset = offset;
      options.limit = limit;
    }
    const response = {};
    try {
      const { count, rows: users } = await User.findAndCountAll(options);
      response.status = 200;
      response.message = "Success";
      response.data = users;
      response.count = count;
    } catch (e) {
      response.status = 500;
      response.message = "Server Error";
    }
    res.status(response.status).json(response);
  },
  find: async (req, res) => {
    const { id } = req.params;
    const response = {};
    try {
      const user = await User.findByPk(id, {
        attributes: { exclude: ["password"] },
        include: {
          model: Provider,
          as: "provider",
        },
      });

      if (!user) {
        Object.assign(response, {
          status: 404,
          message: "Not Found",
        });
      } else {
        Object.assign(response, {
          status: 200,
          message: "Success",
          data: user,
        });
      }
    } catch (e) {
      response.status = 500;
      response.message = "Server Error";
    }
    res.status(response.status).json(response);
  },
  store: async (req, res) => {
    const schema = object({
      name: string().required("Nhập tên"),
      email: string().required("Nhập email").email("Sai email"),
      password: string().required("Nhập password"),
      status: string()
        .required("Nhập status")
        .test("check-boolean", (value) => {
          return value === "true" || value === "false";
        }),
    });
    const response = {};

    try {
      const body = await schema.validate(req.body, { abortEarly: false });
      body.status = body.status === "true";
      body.password = authService.hashPass(body.password);
      const user = await User.create(body);
      delete user.dataValues.password;
      Object.assign(response, {
        status: 201,
        message: "Success",
        data: user,
      });
    } catch (e) {
      const err = Object.fromEntries(
        e?.inner.map((item) => [item.path, item.message])
      );
      Object.assign(response, {
        status: 400,
        message: "Bad Request",
        err,
      });
    }
    res.status(response.status).json(response);
  },
  update: async (req, res) => {
    const { id } = req.params;
    const method = req.method;
    const rule = {};
    if (req.body.name) {
      rule.name = string().min(5, "tối thiểu 5 ký tự");
    }
    if (req.body.email) {
      rule.email = string().email(" không đúng định dạng");
    }
    if (req.body.password) {
      rule.password = string().min(6, "tối thiểu 6 ký tự");
    }
    if (req.body.status) {
      rule.status = string()
        .required("Nhập status")
        .test("check-boolean", (value) => {
          return value === "true" || value === "false";
        });
    }
    const schema = object({});
    const response = {};

    try {
      let body = await schema.validate(req.body, { abortEarly: false });
      if (body.status === "true" || body.status === "false") {
        body.status = body.status === "true";
      }
      if (body.password) {
        body.password = authService.hashPass(body.password);
      }
      if (method === "PUT") {
        body = Object.assign(
          {
            name: null,
            password: null,
            status: null,
          },
          body
        );
      }
      await User.update(body, { where: { id } });
      const user = await User.findByPk(id);
      delete user.dataValues.password;
      Object.assign(response, {
        status: 200,
        message: "Success",
        data: user,
      });
    } catch (e) {
      console.log(e);
      const err = Object.fromEntries(
        e?.inner.map((item) => [item.path, item.message])
      );
      Object.assign(response, {
        status: 400,
        message: "Bad Request",
        err,
      });
    }
    res.status(response.status).json(response);
  },
  delete: async (req, res) => {
    const { id } = req.params;
    await User.destroy({ where: { id } });
    res.status(204).json({
      status: 204,
      message: "Success",
    });
  },
};
