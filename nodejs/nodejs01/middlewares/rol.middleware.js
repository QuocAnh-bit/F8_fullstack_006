const rolMiddleware = (req, res, next) => {
  const status = true;
  if (!status) {
    res.redirect("/users");
  }
  next();
};
export default rolMiddleware;
