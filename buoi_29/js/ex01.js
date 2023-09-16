var listItem = document.querySelector(".list");
var items = document.querySelectorAll(".list-item");

// console.log(items);
items.forEach(function (item) {
  // Xác định phần tử đang được kéo
  item.addEventListener("dragstart", function () {
    item.classList.add("dragging");
  });
  // Xác định khi ngừng kéo
  item.addEventListener("dragend", function () {
    item.classList.remove("dragging");
  });
});

// Xử lý sự kiện khi kéo qua các phần tử
listItem.addEventListener("dragover", function (e) {
  e.preventDefault();
  // console.log("kéo");
  // Lấy el đang kéo
  var dragging = document.querySelector(".dragging");
  var afterEl = getDragAfterEl(listItem, e.clientY);
  console.log(afterEl);
  listItem.insertBefore(dragging, afterEl);
});

var getDragAfterEl = function (listItem, clientY) {
  // add tất cả các El chưa được kéo vào mảng moi
  var dragEl = [...listItem.querySelectorAll(".list-item:not(.dragging)")];
  return dragEl.reduce(
    function (prev, current) {
      var box = current.getBoundingClientRect();

      // Lấy điểm giữa của el
      var offset = clientY - box.top - box.height / 2;
      console.log(offset);

      if (offset < 0 && offset > prev.offset) {
        return { offset: prev, element: current };
      } else {
        return prev;
      }
    },
    // đặt giá trị ban đầu luôn là nhỏ nhất nếu không sẽ bị lộn phần tử xuống cuối
    { offset: -9999 }
  ).element;
};

listItem.addEventListener("dragend", function (e) {
  var listItem = document.querySelectorAll(".list-item:not(.active)");
  var listActive = document.querySelectorAll(".active");
  listItem.forEach(function (item, index) {
    item.innerHTML = `Bài ${++index}: <span>${
      item.children[0].innerHTML
    }</span>`;
  });
  listActive.forEach(function (item, index) {
    item.innerHTML = `Module ${++index}: <span>${
      item.children[0].innerHTML
    }</span>`;
  });
});
