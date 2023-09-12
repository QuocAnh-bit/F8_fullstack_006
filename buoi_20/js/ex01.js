// Bai 1 :
var arrA = [1, 4, 3, 2, 7, 9];
var arrB = [5, 2, 6, 7, 1, 9];
var check = arrA.reduce(function (prev, current) {
  console.log(prev, current);
  if (arrB.includes(current)) {
    // kiểm tra xem current của mảng a có nằm trong mảng b không
    prev.push(current);
  }
  return prev;
}, []);
console.log(check);
//  bài2 :

var arr = [0, 1, [2, 3], [4, 5, [6, 7]], [8, [9, 10, [11, 12]]]];

console.log(arr);
var flatArr = function (arr) {
  var newArr = arr.reduce(function (prev, current) {
    console.log(prev, current);
    if (!Array.isArray(current)) {
      return prev.concat(current);
    }
    console.log(`prev: ${prev}`);
    return prev.concat(flatArr(current));
  }, []);
  console.log(`a: ${newArr}`);
  return newArr;
};
console.log(flatArr(arr));
// // Bài 3
// var arr = [
//   ["a", 1, true],
//   ["b", 2, false],
// ];
// var arrFlatten = flatten(arr);
// var strArray = [];
// var numberArray = [];
// var boolArray = [];
// var result = [strArray, numberArray, boolArray];

// arrFlatten.forEach(function (element) {
//   if (typeof element === "string") {
//     strArray.push(element);
//   }
//   if (typeof element === "boolean") {
//     numberArray.push(element);
//   }
//   if (typeof element === "number") {
//     boolArray.push(element);
//   }
// });
// console.log(result);
// // Bài 4

// var datas = [
//   {
//     title: "Tiêu Đề 1",
//     img: "./imgs/data-img.jpg",
//     content:
//       "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
//   },
//   {
//     title: "Tiêu Đề 2",
//     img: "./imgs/data-img.jpg",
//     content:
//       "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
//   },
//   {
//     title: "Tiêu Đề 3",
//     img: "./imgs/data-img.jpg",
//     content:
//       "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
//   },
// ];
// document.write('<div class = "container">');
// for (var index in datas) {
//   if (index % 2 === 0) {
//     document.write(`<div class="item">
//     <div class="content-item">
//     <h2 class="title-item">${datas[index].title}</h2>
//     <p class="para-item">${datas[index].content}</p>
//     </div>
//     <div class="img-item">
//     <img src="${datas[index].img}" alt="">
//     </div>
//   </div>`);
//   } else {
//     document.write(`<div class="item reverse">
//     <div class="content-item">
//     <h2 class="title-item">${datas[index].title}</h2>
//     <p class="para-item">${datas[index].content}</p>
//     </div>
//     <div class="img-item">
//     <img src="${datas[index].img}" alt="">
//     </div>
//   </div>`);
//   }
// }
// document.write("</div>");
