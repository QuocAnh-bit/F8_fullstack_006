// Bai 1
var a = 5;
var b = 6;
var a = b + a;
var b = a - b;
var a = a - b;
console.log(a, b);
// bai2
s = 10 + 20 + 5 ** 10 / 2;
console.log(s);
// bai3
a = 5;
b = 8;
c = 9;
if (a > b && a > c) {
  console.log("so lon nhat la: ", a);
} else if (b > c && b > a) {
  console.log("so lon nhat la: ", b);
} else {
  console.log("so lon nhat la: ", c);
}
// bai 4
a = 0;
b = 1;
if (a * b < 0) {
  console.log("Khac dau");
} else if (a * b > 0) {
  console.log("Cung dau");
} else {
  console.log("so khong hop le");
}
//  Bai 5
var a = 6;
var b = 4;
var c = 5;
var tg = 0;
if (a < b) {
  tg = a;
  a = b;
  b = tg;
} else if (a < c) {
  tg = a;
  a = c;
  c = tg;
} else if (b < c) {
  tg = b;
  b = c;
  c = tg;
}
console.log(c, b, a);
