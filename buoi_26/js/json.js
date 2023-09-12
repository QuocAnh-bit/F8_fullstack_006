// JSON
// Là Chuỗi
// Mô tả dữ liệu một cách chính xác
// SD để giao tiếp dữ liệu giữa các nề tảng

// VD
// F8 <-> App F8
// Chuyển dữ liệu từ wed F8 định dang chung mà app f8 đọc được (đảm bảo tính toàn vẹn của dữ liệu )
// xml và json
// Hầu như các ngôn ngữ đều đọc được và chuyển thành kiểu dữ liệu của ngôn ngữ đó

// Các thao tác với JSON
// 1. CHuyển từ các kiểu dữ liệu thanh Json
// Json.stringify()
//2. Chuyển từ JSON về kiểu dữ liệu tương ứng JSON.parse

var users = [
  {
    id: 1,
    name: "Hoàng an",
    mail: "Hoangan@gmail.com",
  },
  {
    id: 2,
    name: "Hoàng an2",
    mail: "Hoangan2@gmail.com",
  },
  {
    id: 3,
    name: "Hoàng an3",
    mail: "Hoangan3@gmail.com",
  },
];
var json = JSON.stringify(users);
console.log(json);

/*
Nguyên tăc:
- key phải nằm trong cặp dấu nháy kép
- kết thúc bằng cặp key, value cuối cùng không được có dấu ,
*/
