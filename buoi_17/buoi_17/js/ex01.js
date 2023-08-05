// Bai 1 : Tính cước taxi
var n = 121; //so km di duoc
var numberKm_1 = 1,
  numberKm_2 = 5,
  numberKm_3 = 120; // cac nguong tinh tien
var price_1 = 15000,
  price_2 = 13500,
  price_3 = 11000; // gia cac nguong
var totalBill = 0;
if (n <= numberKm_1) {
  totalBill = n * price_1;
} else if (n <= numberKm_2) {
  totalBill = price_1 * numberKm_1 + (n - numberKm_1) * price_2;
} else if (n > numberKm_2 && n <= numberKm_3) {
  totalBill =
    price_1 * numberKm_1 +
    (numberKm_2 - numberKm_1) * price_2 +
    (n - numberKm_2) * price_3;
} else if (n > numberKm_3) {
  totalBill =
    (price_1 * numberKm_1 +
      (numberKm_2 - numberKm_1) * price_2 +
      (numberKm_3 - numberKm_2) * price_3 +
      (n - numberKm_3) * price_3) *
    0.9;
}
console.log(`Tổng tiền  phải thanh toán là: ${totalBill}đ`);

// Bai 2 : Tinh gia dien
var n = 214; // so dien tieu thu
var numberKwh_1 = 1678,
  numberKwh_2 = 1734,
  numberKwh_3 = 2014,
  numberKwh_4 = 2536,
  numberKwh_5 = 2834,
  numberKwh_6 = 2927;
var totalBill = 0;
if (n > 0 && n <= 50) {
  totalBill = n * numberKwh_1;
} else if (n > 50 && n <= 100) {
  totalBill = 50 * numberKwh_1 + (n - 50) * numberKwh_2;
} else if (n > 100 && n <= 200) {
  totalBill = 50 * numberKwh_1 + 50 * numberKwh_2 + (n - 100) * numberKwh_3;
} else if (n > 200 && n <= 300) {
  totalBill =
    50 * numberKwh_1 +
    100 * numberKwh_2 +
    200 * numberKwh_3 +
    (n - 350) * numberKwh_4;
} else if (n > 300 && n <= 400) {
  totalBill =
    50 * numberKwh_1 +
    100 * numberKwh_2 +
    200 * numberKwh_3 +
    300 * numberKwh_4 +
    (n - 650) * numberKwh_5;
} else if (n > 400) {
  totalBill =
    50 * numberKwh_1 +
    100 * numberKwh_2 +
    200 * numberKwh_3 +
    300 * numberKwh_4 +
    400 * numberKwh_5 +
    (n - 1050) * numberKwh_6;
}
console.log(`Tổng tiền điện phải thanh toán là: ${totalBill}đ`);
// bai 3 tinh bieu thuc
var n = 5;
var subTotal = 1,
  total = 0;
for (var i = 1; i <= n; i++) {
  subTotal = i * (i + 1);
  total += subTotal;
}
console.log(total);
// bai 4 viet ham so nguyen
function prime(number) {
  var n = number;
  if (n < 2) {
    return false;
  } else {
    for (var i = 2; i < n; i++) {
      if (n % i === 0) {
        return false;
      }
    }
  }
  return true;
}
var n = 0;
if (prime(n) === true) {
  console.log(`So ${n} la so nguyen to`);
} else if (prime(n) === false) {
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
      if (j % 2 === 0) {
        document.write(`<div class="white"></div>`); // Ô màu trắng
      } else {
        document.write(`<div class="black"></div>`); // Ô màu đen
      }
    } else {
      if (j % 2 === 0) {
        document.write(`<div class="black"></div>`);
      } else {
        document.write(`<div class="white"></div>`);
      }
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
