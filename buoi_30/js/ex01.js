var content = document.querySelector(".content");
var boldBtn = document.querySelector("#bold-btn");

var underlineBtn = document.querySelector("#underline-btn");
var italicBtn = document.querySelector("#italic-btn");
var colorBtn = document.querySelector("#color-btn");

boldBtn.addEventListener("click", function () {
  document.execCommand("bold");
});

underlineBtn.addEventListener("click", function () {
  document.execCommand("underline");
});

italicBtn.addEventListener("click", function () {
  document.execCommand("italic");
});

colorBtn.addEventListener("input", function () {
  document.execCommand("foreColor", false, colorBtn.value);
});

var countWord = document.querySelector(".count-word");
var countChar = document.querySelector(".count-char");

var spanWord = document.createTextNode(0);
var spanChar = document.createTextNode(0);

countWord.append(spanWord);
countChar.append(spanChar);

content.addEventListener("input", function () {
  var checkWord = this.innerText.trim().replace(/\s+/g, " ").split(" ");
  spanWord.textContent = checkWord.length;
  console.log(checkWord);
  var checkChar = checkWord.join("");
  spanChar.textContent = checkChar.length;
  console.log(checkWord.join(""));
  if (this.innerText.length === 0 || checkWord[0] === "") {
    spanWord.textContent = 0;
  }
});

var btnFile = document.querySelector(".btn-file");
var dropDownMenu = document.querySelector(".dropdown-menu");

btnFile.addEventListener("click", function () {
  dropDownMenu.classList.toggle("show");
});

var fileNameInput = document.querySelector("#filename-input");
var controlsFile = document.querySelectorAll(".dropdown-item");

controlsFile.forEach(function (btn) {
  btn.addEventListener("click", function () {
    if (btn.id === "new-btn") {
      content.innerText = "";
      fileNameInput.value = "untitled";
      spanWord.textContent = 0;
      spanChar.textContent = 0;
    } else if (btn.id === "txt-btn") {
      var blob = new Blob([content.innerText]);
      var url = URL.createObjectURL(blob);
      var link = document.createElement("a");
      link.href = url;
      link.download = `${fileNameInput.value}.txt`;
      link.click();
    } else if (btn.id === "pdf-btn") {
      html2pdf(content).save(fileNameInput.value);
    }
  });
});
