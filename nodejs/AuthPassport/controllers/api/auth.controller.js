const jwt = require("jsonwebtoken");
const { User, Provider } = require("../../models/index");
const bcrypt = require("bcrypt");

module.exports = {
  login: async (req, res) => {
    // lấy body
    const { email, password } = req.body;
    // validate

    const response = {};
    if (!email || !password) {
      Object.assign(response, {
        status: 400,
        message: "Bad request",
        error: "Vui lòng nhập email và mật khẩu",
      });
    } else {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        Object.assign(response, {
          status: 400,
          message: "Bad request",
          error: "Email hoặc mật khẩu không chính xác",
        });
      } else {
        const { password: hash } = user;
        const result = bcrypt.compareSync(password, hash);
        if (!result) {
          Object.assign(response, {
            status: 400,
            message: "Bad request",
            error: "Email hoặc mật khẩu không chính xác",
          });
        } else {
          const { JWT_SECRET, JWT_EXPIRE } = process.env;
          const token = jwt.sign({ id: user.id }, JWT_SECRET, {
            expiresIn: JWT_EXPIRE,
          });
          Object.assign(response, {
            status: 200,
            message: "Success",
            access_token: token,
          });
        }
      }
    }
    // Kiểm tra xem có tồn tại trong db k
    // password hash
    // confirm password hash
    // Tạo token (JWt)
    res.status(response.status).json(response);
  },
  profileGG: async (req, res) => {
    const response = {};
    try {
      if (req.user) {
        // Tìm các hình thức đã đăng nhập
        const user = req.user;
        const providerUser = await User.findAll({
          where: { email: user.email },
          include: {
            model: Provider,
            as: "provider",
          },
        });
        const provider = providerUser.reduce((acc, item) => {
          const providerInfo = {
            name: item.provider.name,
            image: item.avatar,
          };
          acc[item.provider.name] = providerInfo;
          return acc;
        }, {});
        user.dataValues.provider = provider;
        delete user.dataValues.password;
        Object.assign(response, {
          status: 200,
          message: "Success",
          user: user,
          cookies: req.cookies,
        });
      } else {
        throw new Error();
      }
    } catch (error) {
      Object.assign(response, {
        status: 401,
        message: "Unauthorized",
      });
    }
    res.status(response.status).json(response);
  },
  profile: async (req, res) => {
    const bearer = req.get("Authorization");
    const response = {};

    if (bearer) {
      const token = bearer.replace("Bearer", "").trim();
      const { JWT_SECRET } = process.env;
      try {
        const decoded = jwt.verify(token, JWT_SECRET);
        console.log(decoded);
        const { id } = decoded;
        const user = await User.findByPk(id);
        Object.assign(response, {
          status: 200,
          message: "Success",
          data: user,
        });
      } catch (e) {
        Object.assign(response, {
          status: 401,
          message: "Unauthorized",
        });
      }
    }
    res.status(response.status).json(response);
  },
};
