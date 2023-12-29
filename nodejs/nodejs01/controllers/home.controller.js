/*

Controller 
Tên controller 
Action : các hành động 
Vd:
- controller user có các hành động:
+ thêm , sửa, xóa , hiển thị 

*/

// tên các key phải bắt đầu bằng hành động
const homeController = {
  index: (req, res) => {
    const title = "<i>Học BE dễ hơn FE</i>";
    // gọi file view dùng render
    const check = false;
    const users = ["User 1", "User 2", "User 3"];

    // set Session
    req.session.message = "Hi F8";
    req.session.users = {
      name: "Hoàng an",
    };
    delete req.session.message;

    res.render("home/index", { title, check, users });
  },
  showProduct: (req, res) => {
    console.log(req.session.message);
    console.log(req.session.users);

    res.render("home/product"); // trả về 1 chuỗi khi dùng send
  },
};

export default homeController;
