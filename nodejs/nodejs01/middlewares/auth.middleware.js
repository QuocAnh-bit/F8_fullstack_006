// Middleware là 1 hàm gồm 3 tham số
// Req -> oj, res -> oj, next -> hàm

const authMiddleware = (req, res, next) => {
  const isLogin = true;
  if (!isLogin) {
    res.redirect("/dang-nhap");
  }
  next(); // Cho phép request đi tiếp
};
export default authMiddleware;
