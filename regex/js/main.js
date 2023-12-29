/*
Regex
Regular Expression
Biểu Thức chính quy

- tập hợp các ký hiệu theo một quy tắc nhất định để xử lý chuỗi 
- Viết bằng ngôn ngữ Perl 

Tác dụng: 
- So khớp => test()
- Cắt chuỗi -> match()
- Thay thế -> replace()

Cú pháp : /bieu_thuc/modifier
- regex => Các ký hiệu của biểu thức chính quy
- modifier => Cấu hình cho biểu thức chính quy
+ g: global
+ i: không phân biệt chữ hoa chữ thường
+ m: multi_line khớp nhiều dòng 
+ s: khớp 1 dòng

Các ký hiệu cơ bản 
- char -> tìm chuỗi char trong chuỗi gốc 
- Khớp đầu chuỗi : ^
- Khớp cuỗi chuỗi : $
- Khớp ký tự đại diện: 
+ [A-Z]: Chữ hoa
+ [a-z]: Chữ thường
+ [0-9]: Số
+ [charList] : Các ký tự chỉ định (Khớp theo điều kiện hoặc) chỉ 1 ddk đúng là trả về true
+ khớp đọ dài: Mặc định các biểu thức chỉ có độ dài là 1
+ {min, max}-> độ dài từ min -> max
+ {min,} -> độ dài từ min đến vô cùng
+ {max} -> độ dài cố định
- ký hiệu viết tắt của độ dài
{0,1}-> ?
{1,} -> +
{0,} -> *

Nếu muốn so khớp các ký hiêu thường bị trùng  với ký hiệu
của biểu thức chính quy => \ phía trước
+ dấu chấm (.)
+ dấu ngoặc vuông([])
+ dấu gạch chéo (/)
*/

// const str = "hoangan.web@gmail.com";
// // const pattern = /^[a-zA-Z][a-zA-Z0-9]{1,}+@[0-9]{3,}/;
// const pattern = /^[a-z\.0-9-_]{3,}@[a-z_\.0-9]+\.[a-z]{2,}$/;
// const check = pattern.test(str);
// console.log(check);

/*----------------------------------------------------------------------------------------*/
/*
các ký hiệu viết tắt
- \d ->[0-9] 
- \D -> Các ký tự không phải là số 
- \s -> Khoảng trắng
- \S -> không phải khoảng trắng
- \w-> a-z, A-Z, 0-9, _
- \W -> ngược lại của \w 

- Phủ định: (^) // hiểu như điều kiện And
- Hoặc: (|)

ký tự đại diện cho tất cả các ký tự (.)



*/
// Trang test regex101
// const str = "http://fullstack.edu.vn";
// const pattern = /.+/;
// const check = pattern.test(str);
// console.log(check);

// const str = `https://www.youtube.com/watch?v=ZznQHI0XKaE`;

// // Check chuỗi url xem có phải của  url của youtube hay không

// const pattern = /^(http|https):\/\/*(www.)(youtube\.com.+|youtu\.be.+)$/;
// const check = pattern.test(str);
// console.log(check);

/*
Cắt chuỗi 
sử dụng hàm .match(rexgex)

-> capturing group: lấy 1 phần của biểu thức chính quy (Không sử dụng cho global)

*/

// const content = `Hello 0398568668, abc 0123456789`;
// const content = `ABC hoangan@gmail.com acd hoangan1@gmail.com  hoangan@fullstack.edu.vn`;
// const pattern = /[a-z\.0-9-_]{3,}@[a-z_\.0-9]+\.[a-z]{2,}/g;
// const result = content.match(pattern);
// console.log(result);
// const domainList = result.map((email) => {
//   const pattern = /[a-z\.0-9-_]{3,}@([a-z_\.0-9]+\.[a-z]{2,})/;
//   const domain = email.match(pattern);
//   return domain[1];
// });
// console.log(domainList);

// non-capturing Group (thêm dấu ?: vào phần không muốn chụp)
// const url = `https://fullstack.edu.vn/khoa-hoc/`;
// const pattern = /^(?:http|https):\/\//;
// const result = url.match(pattern);
// console.log(result);

// Greedy
// Lưu ý: dấu ? được đặt sau độ dài  là greedy ( tránh nhầm lẫn với ? độ dài {0,1} đặt ở đằng trước)

// const str = `<img src="https://fullstack.edu" with="200">`;

// const pattern = /<img.*src="(.+?)">/;

// thay thế

// let content = "SĐT 0398568668 aa 0123456789";
// const pattern = /(0|\+84)\d{9}/g;
// content = content.replace(pattern, "***");
// console.log(content);

// đối sánh chuỗi
// chỉ hoạt động với capturing group tương ứng với với từng cặp ngoặc tròn
//
// let content = "SĐT 0398568668 aa +84123456789";
// const pattern = /((0|\+84)\d{9})/g;
// content = content.replace(pattern, `<a href="tel:$1">$1 $2</a>`);
// console.log(content);

// Chuyển đổi thành pattern
const a = `abc\/\d+`;
const pattern2 = new RegExp(a, "gi");
console.log(pattern2);
