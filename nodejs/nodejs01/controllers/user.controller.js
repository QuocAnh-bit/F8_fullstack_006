const userController = {
  index: (req, res) => {
    const { status, keyword } = req.query;
    /*
    Request:
    - Nhận thông tin
    - validate
    Model: xử lý dữ liệu

    Xử lý các logic nghiệp vụ (Nếu có) 

    View: trả dữ liệ cho client
    */
    res.render("users/users", { status, keyword });
  },
  add: (req, res) => {
    res.send("thêm người dùng");
  },
  edit: (req, res) => {
    const id = req.params.id;
    res.send("<h1>Sửa người dùng: " + id + "</h1>");
  },
  orderList: (req, res) => {
    res.send("DS Đơn hàng ");
  },
  orderCompleted: (req, res) => {
    res.send("Đơn hàng hoàn thành");
  },
  orderCancel: (req, res) => {
    res.send("Đơn hàng Huy");
  },
};

export default userController;
