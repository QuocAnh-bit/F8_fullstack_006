// Bai 1 : Tính cước taxi
var km = 121;
var price1 = 15000; // Ngưỡng 1
var price2 = 13500; // Ngưỡng 2
var price3 = 11000; // Ngưỡng 3
var discount = 10;
var cost;
if (km <= 1) {
  cost = 1 * price1;
} else {
  if (km <= 5) {
    cost = 1 * price1 + (km - 1) * price2;
  } else {
    cost = 1 * price1 + (5 - 1) * price2 + (km - 5) * price3;

    if (km > 120) {
      cost = (cost * (100 - discount)) / 100;
    }
  }
}
console.log(cost);

// Bai 2 : Tinh gia dien
var kwh = 100; // số điện
var lv1 = 1678; // các ngưỡng
var lv2 = 1734;
var lv3 = 2014;
var lv4 = 2536;
var lv5 = 2834;
var lv6 = 2927;
var cost;
if (kwh <= 0) {
  console.log("Vui lòng nhập số điện khác 0");
} else if (kwh <= 50) {
  cost = kwh * lv1;
} else if (kwh <= 100) {
  cost = 50 * lv1 + (kwh - 50) * lv2;
} else if (kwh <= 200) {
  cost = 50 * lv1 + (100 - 50) * lv2 + (kwh - 100) * lv3;
} else if (kwh <= 300) {
  cost = 50 * lv1 + (100 - 50) * lv2 + (200 - 100) * lv3 + (kwh - 200) * lv4;
} else if (kwh <= 400) {
  cost =
    50 * lv1 +
    (100 - 50) * lv2 +
    (200 - 100) * lv3 +
    (300 - 200) * lv4 +
    (kwh - 300) * lv5;
} else {
  cost =
    50 * lv1 +
    (100 - 50) * lv2 +
    (200 - 100) * lv3 +
    (300 - 200) * lv4 +
    (400 - 300) * lv5 +
    (kwh - 400) * lv6;
}
console.log(cost);

// bai 3 tinh bieu thuc
var n = 2;
var total = 0;
for (var i = 1; i <= n; i++) {
  total += i * (i + 1);
}
console.log(total);

// bai 4 viet ham so nguyen
function isPrime(number) {
  var n = number;
  if (n % 1 !== 0 || n <= 1) {
    // Nếu n k là số nguyên và n <= 1 thì trả về false
    return false;
  } else {
    for (var i = 2; i < n; i++) {
      // vòng lặp kiểm tra nếu  như có nhiều hơn 1 ước thì trả về false
      if (n % i === 0) {
        return false;
      }
    }
  }
  return true;
}
var n = 5;
if (isPrime(n)) {
  console.log(`So ${n} la so nguyen to`);
} else {
  console.log(`So ${n} la  khong la so nguyen to`);
}
// bai 5
document.write(`<h2> Bài 5: Tam giác số</h2>`);
var n = 5; // so dong
var dem = 1;
for (var i = 1; i <= n; i++) {
  for (var j = 1; j <= i; j++) {
    document.write(`<span><strong>${dem} </strong></span>`);
    dem++;
  }
  document.write(`</br>`);
}
//bai6 ban co
document.write(`<h2> Bài 6: Bàn Cờ</h2>`);
// Ô màu trắng
document.write(`<div class="chessboard">`);
var n = 8;
var dem = 0; // so dong
for (var i = 1; i <= n; i++) {
  for (var j = 1; j <= n; j++) {
    if (i % 2 === 0) {
      document.write(
        `<div ${j % 2 === 0 ? `class="white"` : `class="black"`} ></div>`
      ); // Ô màu trắng
    } else {
      document.write(
        `<div ${j % 2 === 0 ? `class="black"` : `class="white"`} ></div>`
      );
    }
  }
  document.write(`</br>`);
}
document.write(`</div>`);
// bai 7 : bang nhan
document.write(`<h2> Bài 7: Bảng nhân</h2>`);
document.write(`<div class="multiplication">`);
for (var i = 1; i <= 10; i++) {
  document.write(`<div class="multiplication-item">`);
  document.write(`<strong> Bảng nhân ${i}</strong>`);
  for (var j = 0; j <= 10; j++) {
    document.write(`<span> ${i} x ${j} = ${i * j} </span>`);
  }
  document.write(`</div>`);
}
// bai 8 :tinh gia trị bieu thuc
function S(n) {
  if (n === 1) {
    return 1;
  } else if (n > 1) {
  }
}
document.write(`</div>`);

function sum(n) {
  if (n === 1) {
    return 1;
  } else {
    return 1 / n + sum(n - 1);
  }
}

var n = 3;
console.log(sum(n));
