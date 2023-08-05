var text = document.querySelector(".para");
var content = text.textContent;
var splitText = content.trim().replace(/\s+/g, " ").split(" ");
var subText = content.trim().replace(/\s+/g, " ").split(" ");
console.log(splitText);

var i = 0;
function highLight() {
  setInterval(function () {
    splitText[i] = `<span class="red">` + splitText[i] + `</span>`;
    content = splitText.join(" ");
    text.innerHTML = content;
    splitText[i] = subText[i];
    i++;
    if (i === splitText.length) {
      i = 0;
    }
  }, 1000);
}
highLight();
