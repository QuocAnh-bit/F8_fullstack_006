// Bai 1 : Hoán vị 2 số không  sử biến trung gian
// Ý tưởng dùng +,- để xử lý hoặc dùng * /
var a = 5;
var b = 6;
var a = b + a; // lấy tổng
var b = a - b; // 11 - 6 =>  b = 5
var a = a - b; // 11 - 5 => a = 6
console.log(a, b);

// bai2 : thực hiện phép toán
s = 10 + 20 + 5 ** 10 / 2;
console.log(s);

// bai3: Tìm số lớn nhất
// Ý tưởng : sử dụng kỹ thuật đặt lính canh đặt giả định 1 số là số lớn nhất
var c = 5;
var b = 100;
var c = 9;
var max = a; // Giả định a là số lớn nhất đầu tiên
if (max < b) {
  max = b;
}
if (max < c) {
  max = c;
}
console.log(`Max:`, max);

// bai 4 : Kiểm tra số cùng dấu
// Ý tường : Sử dụng phép nhân để kiểm tra
// => Nhân cùng dấu ra dương và khác dấu thì ra âm
// Số 0 là số trung tính không âm không dương
var a = 0;
var b = 1;
if (a * b > 0) {
  console.log("Cùng dấu");
} else {
  console.log("Trái dấu");
}
//  Bai 5; sắp xếp theo thứ tự tăng dần
// Ý tưởng : so sánh các số liền kề
// => nếu số trước lớn hơn số sau thực hiện đổi chỗ bằng 1 biến trung gian
var a = 6;
var b = 4;
var c = 5;
var tg = 0;
if (a > b) {
  tg = a;
  a = b;
  b = tg;
}
if (a > c) {
  tg = a;
  a = c;
  c = tg;
}
if (b > c) {
  tg = b;
  b = c;
  c = tg;
}
console.log(a, b, c);
