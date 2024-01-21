const model = require("../models/index");
const User = model.User;
const Provider = model.Provider;

module.exports = {
  index: async (req, res) => {
    const infoUser = await User.findOne({
      where: { id: req.user.id },
      include: {
        model: model.Provider,
        as: "provider",
      },
    });

    res.render("index", { infoUser });
  },
};
