// window.addEventListener("scrollend", function () {
//   console.log("hihwwwi");
// });

// /*
// window.scrollY  => lay toa do cua vi tri scroll so voi top
// window.scrollX  => lay toa do cua vi tri scroll so voi left
// window.scroll(x,y) => Thiet lap vi tri scroll theo truc x,y

// */
// var backTop = document.querySelector(".back-to-top");
// window.addEventListener("scroll", function () {
//   var positive = window.scrollY;
//   if (positive > 100) {
//     backTop.classList.add("show");
//   } else if (positive < 100) {
//     backTop.classList.remove("show");
//   }
// });

// backTop.addEventListener("click", function (e) {
//   e.preventDefault();
//   e.stopPropagation();
//   //   window.scroll(0, 0);
//   scrollTo(0);
// });

// var scrollTo = function (positive) {
//   var current = window.scrollY;
//   var id = setInterval(function () {
//     current -= 100;
//     window.scroll(0, current);
//     if (current < positive) {
//       clearInterval(id);
//     }
//   }, 15);
// };
var header = document.querySelector(".header");

var body = document.body;
var currentY = 0;
var scrollType;
var headerHeight = header.clientHeight;

window.addEventListener("scroll", function () {
  var y = this.window.scrollY;
  if (y > currentY) {
    scrollType = `down`;
  } else {
    scrollType = `up`;
  }
  currentY = y;
  console.log(scrollType);
  if (y >= headerHeight) {
    header.classList.add("fixed");
    body.style.paddingTop = `${headerHeight + 15}px `;
  }
  if (scrollType === "up") {
    header.classList.remove("fixed");
    body.style.paddingTop = 0;
  }
});

var navItems = document.querySelectorAll(".menu li a");
navItems.forEach(function (a) {
  console.log(a);
  a.addEventListener("click", function (e) {
    e.preventDefault();
    var hash = this.getAttribute("href");
    var section = document.querySelector(hash);
    var sectionOffsetTop = section.offsetTop;
    window.scroll(0, sectionOffsetTop - headerHeight - 15);
  });
});
