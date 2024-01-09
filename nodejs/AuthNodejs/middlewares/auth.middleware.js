const login = (req, res, next) => {
  if (req.session.isLogin) {
    next();
  } else {
    res.redirect("/auth/login");
  }
};

module.exports = {
  login,
};
