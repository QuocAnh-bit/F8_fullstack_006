// Bài 1
function sum(...args) {
  var total = 0;

  for (var i in args) {
    if (args[i] === 0 || (args[i] && args[i].constructor.name === "Number")) {
      total += args[i];
    } else {
      return console.log(`Dữ liệu không hợp lệ `);
    }
  }
  return total;
}
var total = sum(NaN, 1, 1);
var total2 = sum(1, 2, 3, 5, 6, 9, 7, 5, 8, 10, 1000);
console.log(total);
console.log(total2);
// Bai 2
Object.prototype.getCurrency = function (currency) {
  var changeString = JSON.stringify(this); // Chuyển sang string
  var number = Number(changeString.replaceAll(`"`, ``)); // ép kiểu số bỏ đi 2 dấu ""
  var result = number.toLocaleString().replaceAll(".", ",") + " " + currency;
  return result;
};
var price = 200000000;
var price2 = "20000";
console.log(price.getCurrency("đ"));
console.log(price2.getCurrency("đ"));
// Bai 3
var categories = [
  {
    id: 1,
    name: "Chuyên mục 1",
    parent: 0,
  },
  {
    id: 2,
    name: "Chuyên mục 2",
    parent: 0,
  },
  {
    id: 3,
    name: "Chuyên mục 3",
    parent: 0,
  },
  {
    id: 4,
    name: "Chuyên mục 2.1",
    parent: 2,
  },
  {
    id: 5,
    name: "Chuyên mục 2.2",
    parent: 2,
  },
  {
    id: 6,
    name: "Chuyên mục 2.3",
    parent: 2,
  },
  {
    id: 7,
    name: "Chuyên mục 3.1",
    parent: 3,
  },
  {
    id: 8,
    name: "Chuyên mục 3.2",
    parent: 3,
  },
  {
    id: 9,
    name: "Chuyên mục 3.3",
    parent: 3,
  },
  {
    id: 10,
    name: "Chuyên mục 2.2.1",
    parent: 5,
  },
  {
    id: 11,
    name: "Chuyên mục 2.2.2",
    parent: 5,
  },
];

function getNestedArr(categories) {
  var result = [];
  categories.forEach(function (element) {
    element["children"] = [];
    if (element["parent"] === 0) {
      result.push(element);
    } else {
      var parentElements = categories.find(function (category) {
        return category["id"] === element["parent"];
      });
      if (parentElements) {
        delete element["parent"];
        parentElements.children.push(element);
      }
    }
  });
  return result;
}
console.log(getNestedArr(categories));
// Bài 4
Array.prototype.reduce2 = function (callback, startValue) {
  var current = startValue !== undefined ? startValue : this[0];
  for (var i = 0; i < this.length; i++) {
    current = callback(current, this[i]);
  }
  return current;
};
var arr = [1, 2, 3, 4];
var result = arr.reduce2((pre, current) => {
  return pre + current;
}, 0);
var result2 = arr.reduce2((pre, current) => {
  return pre + current;
});

console.log(result);
console.log(result2);
