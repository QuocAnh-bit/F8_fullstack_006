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

const str = "hoangan.web@gmail.com";
// const pattern = /^[a-zA-Z][a-zA-Z0-9]{1,}+@[0-9]{3,}/;
const pattern = /^[a-z\.0-9-_]{3,}@[a-z_\.0-9]+\.[a-z]{2,}$/;

const check = pattern.test(str);
console.log(check);
