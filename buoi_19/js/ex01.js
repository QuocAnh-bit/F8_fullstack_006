// Bài 1 : Tìm số Lớn nhất , nhỏ nhất in ra vị trí
var numberInteger = [-1, 6, 0, 2, 5, 1, 3];
function numberMax(numberArray) {
  var max = numberArray[0]; // gán giả sử vị trí 0 là lớn nhất
  var indexMax = 0;
  for (var i = 1; i < numberArray.length; i++) {
    if (max < numberArray[i]) {
      // nếu max nhỏ hơn phần tử trong mảng thì gán lại max
      max = numberArray[i];
      indexMax = i;
    }
  }
  console.log(`Số lớn nhất trong mảng là: ${max} Index = ${indexMax}`);
}

function numberMin(numberArray) {
  var min = numberArray[0]; // gán giả sử vị trí 0 là nhỏ nhất
  var indexMin = 0;
  for (var i = 1; i < numberArray.length; i++) {
    if (min > numberArray[i]) {
      // nếu min lớn hơn phần tử trong mảng thì gán lại min
      min = numberArray[i];
      indexMin = i;
    }
  }
  console.log(`Số nhỏ nhất trong mảng là: ${min} Index = ${indexMin}`);
}
numberMax(numberInteger);
numberMin(numberInteger);
// Bài 2 : Tính tbc các số nguyên tố có trong mảng , nếu không có trả về 'Không có số nguyên tố '
var numberArray = [-3, 2, 0, 9, 13, 34, 17, 7, 5, 8];
function isPrime(number) {
  if (number < 2) {
    return false;
  } else {
    for (var i = 2; i < number; i++) {
      if (number % i == 0) {
        // nếu number chia hết cho 1 số khác nữa thì loại
        return false;
      }
    }
  }
  return true;
}
function averagePrime(numberArray) {
  var total = 0; // Tính tổng
  var dem = 0; // đếm số lần cộng
  var tbc = 0; // tính tb
  for (var i = 0; i < numberArray.length; i++) {
    if (isPrime(numberArray[i])) {
      // gọi hàm kiểm tra số nguyên tố
      total += numberArray[i]; // cộng tổng các số nguyên tố
      dem++;
    }
  }
  if (total === 0) {
    console.log("không có số nguyên  tố nào");
  } else {
    console.log(
      `Trung bình cộng của các số nguyên tố trong mảng là ${(tbc =
        total / dem)}`
    );
  }
}
averagePrime(numberArray);
// Bài 3: Lọc trùng
var array = [1, 2, 3, 43, 2, 2, 2, 3, 4, 5, 6, 7, 43];
console.log(Array.from(new Set(array)));
// Bài 4 :
var numbers = [5, 1, 9, 8, 10];
var element = 4;
numbers.push(element);
numbers.sort(function (a, b) {
  if (b > a) {
    return -1;
  }
});
console.log(numbers);
