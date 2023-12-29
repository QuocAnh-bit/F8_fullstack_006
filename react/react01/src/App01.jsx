// import Header from "./components/Header";
// import React from "react";
function App() {
  // const h1 = React.createElement(
  //   "h1",
  //   {
  //     id: "title",
  //     className: "title",
  //     style: { color: "red", fontStyle: "italic" },
  //     onClick: (e) => {
  //       console.log(e.target);
  //     },
  //   },
  //   "Hi F8"
  // );

  // const h2 = React.createElement("h2", {}, "Học REACT Không kho");

  // const number = 10;
  // const range = [...Array(number).keys()];
  // const li = range.map((index) =>
  //   React.createElement("li", {}, `Item ${index + 1}`)
  // );
  // const ul = React.createElement("ul", { className: "menu" }, ...li);
  // const div = React.createElement(
  //   "div",
  //   {
  //     className: "wrapper",
  //   },
  //   h1,
  //   ul,
  //   h2
  // );
  const Product = () => {
    return <h2>Danh Sách sản phẩm</h2>;
  };
  const handleClick = (text) => {
    // bọc lại 1 hàm không tham số vào một hàm có tham số
    console.log(text);
  };
  const title = "xin Chào F8";

  // let welcome = <h2>Chào Mừng bạn đã quay trở lạiiii</h2>;
  const isLogin = false;
  // if (!isLogin) {
  //   welcome = <h2>Vui Lòng đăng nhập lại</h2>;
  // }

  // Render 1 danh sách chuyển về arr
  const lists = ["item1", "item2", "item3"];
  const div2 = (
    <>
      <Product />
      <h3>{title}</h3>
      {lists.map((item, index) => (
        <h3 key={index}>{item}</h3>
      ))}
      {isLogin ? (
        <h2>Chào Mừng bạn đã quay trở lạiiii</h2>
      ) : (
        <h2>Vui Lòng đăng nhập lại</h2>
      )}
      {isLogin && (
        <ul className="menu">
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
        </ul>
      )}
      <button
        className={`btn`}
        onClick={() => {
          handleClick("nhengssssg");
        }}
      >
        Click Me
      </button>
    </>
  );

  return div2;
}

export default App;
