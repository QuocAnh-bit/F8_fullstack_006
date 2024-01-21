module.exports = (req, res, next) => {
  const getErr = (err) => {
    if (err?.length) {
      err = err[0];
      return err;
    }
  };
  const getOld = (old) => {
    if (old?.length) {
      old = old[0];
      return old;
    }
  };

  const err = req.flash("err");
  const old = req.flash("old");
  req.errors = getErr(err);
  req.old = getOld(old);
  req.userRegister = req.flash("register");

  next();
};
