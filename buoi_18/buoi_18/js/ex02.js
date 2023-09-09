// Dùng mảng để xử lý
// var text = document.querySelector(".para");
// var content = text.textContent;
// var splitText = content.trim().replace(/\s+/g, " ").split(" ");
// var subText = content.trim().replace(/\s+/g, " ").split(" ");
// console.log(splitText);

// var i = 0;
// function highLight() {
//   setInterval(function () {
//     splitText[i] = `<span class="red">` + splitText[i] + `</span>`;
//     content = splitText.join(" ");
//     text.innerHTML = content;
//     splitText[i] = subText[i];
//     i++;
//     if (i === splitText.length) {
//       i = 0;
//     }
//   }, 1000);
// }
// highLight();

// Dùng chuỗi
var content = `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque laboriosam
sint culpa beatae placeat sapiente praesentium, consectetur dolorum impedit
iusto voluptatibus eius, vel fugiat, eos molestiae consequatur unde eaque
delectus.`;
// Xử lý các dấu cách bằng replaceAll

content = content.replaceAll(" ", "</span> <span>");

// Xử lý từ đầu và từ cuối

content = `<span>${content}</span>`;

var index = 0;
setInterval(function () {
  var char = content.charAt(index); // Ký tự index
  var charNext = content.charAt(index) + 1; // Ký tự tiếp theo của index
  if (char === ">" && charNext !== " ") {
    var html = content.slice(0, index) + ` class="red"` + content.slice(index);

    document.body.innerHTML = html;
  }
  index++;
  if (index === content.length) {
    index = 0;
  }
}, 50);
document.write(content);
