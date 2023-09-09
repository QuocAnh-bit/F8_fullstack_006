// Bài 1 : Tìm số Lớn nhất , nhỏ nhất in ra vị trí
var numberInteger = [-1, 6, 0, 2, 5, 1, 3];
var maxArr = numberInteger[0];
var minArr = numberInteger[0];
var maxIndex = 0;
var minIndex = 0;

for (var i in numberInteger) {
  if (maxArr < numberInteger[i]) {
    maxArr = numberInteger[i];
    maxIndex = i;
  }
  if (minArr > numberInteger[i]) {
    minArr = numberInteger[i];
    minIndex = i;
  }
}
console.log(`Max : ${maxArr}, Index : ${maxIndex}`);
console.log(`Min : ${minArr}, Index : ${minIndex}`);

// Bài 2 : Tính tbc các số nguyên tố có trong mảng , nếu không có trả về 'Không có số nguyên tố '
var numberArray = [-3, 2, 0, 9, 13, 34, 17, 7, 5, 8];
var isPrime = function (n) {
  if (n <= 1 || n % 1 !== 0) {
    return false;
  }
  for (var i = 2; i < n - 1; i++) {
    if (n % i === 0) {
      return false;
    }
  }
  return true;
};
var total = 0;
var count = 0;
var agv;
for (var i = 0; i < numberArray.length; i++) {
  if (isPrime(numberArray[i])) {
    total += numberArray[i];
    count++;
  }
}

if (total > 0) {
  agv = total / count;
  console.log(`Trung bình công của các số nguyên tố  : ${agv}`);
} else {
  console.log(`Không có số nguyên tố nào trong mảng  `);
}

// Bài 3: Lọc trùng
var array = [1, 2, 3, 43, 2, 2, 2, 3, 4, 5, 6, 7, 43];
var newArr = [];

for (var i = 0; i < array.length; i++) {
  if (newArr.includes(array[i])) {
    continue;
  }
  newArr[newArr.length] = array[i];
}
console.log(newArr);

// Bài 4 :
var numbers = [5, 1, 9, 8, 10];

numbers.sort(function (a, b) {
  // a là số sau b là số trước
  return a - b; // nếu ra âm  thi a đứng trước b
});
console.log(numbers);
// Thêm element
var element = 4;
if (element < numbers[0]) {
  numbers.unshift(element);
} else if (element > numbers[numbers.length - 1]) {
  numbers.push(element);
} else {
  var indexInsert;
  for (var i = 0; i < numbers.length; i++) {
    if (element >= numbers[i] && element < numbers[i + 1]) {
      indexInsert = i; // xác định vị trí của element cần thêm
      console.log(i);
      break;
    }
  }
  numbers = [].concat(
    numbers.slice(0, indexInsert + 1), // slice không lấy phần tử end
    element,
    numbers.slice(indexInsert + 1)
  );
}
console.log(numbers);
