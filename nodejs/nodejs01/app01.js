//Import thu vien co san của node js
import http from "http";
import { getProduct } from "./modules/product.js";
getProduct();
const server = http.createServer((req, res) => {
  const path = req.url;
  const cookie = req.headers["cookie"];
  console.log(cookie);
  const method = req.method;
  console.log(method);

  // xử lý logic --> truy vấn với database --> trả về dữ liệu

  res.setHeader("abc", "xyz");
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.statusCode = 200;
  // set Cookie
  res.setHeader = ("Set-Cookie", "name=hoangan;path=/;Max-Age=86400;HttpOnly");
  if (path === "/") {
    res.write("Học js ");
  } else if (path === "/san-pham") {
    res.write("Sản phẩm");
  } else {
    res.write("not Found");
  }
  res.end();
});

server.listen("8080", "localhost", () => {
  console.log("Server đang chạy : http://localhost:8080");
});

/*
các package hay dùng của node (có sẵn)
http
fs: làm việc với file
path: làm việc với đường dẫn của hệ thống

CommonJS --> sử dụng require
ES6 Module --> sử dụng import / export
*/
