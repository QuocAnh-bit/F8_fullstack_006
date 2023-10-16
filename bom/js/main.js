const btn = document.querySelector(".btn");
const btnClose = document.querySelector(".btn-close");
// let website;
// btn.addEventListener("click", () => {
//   //   window.open(
//   //     "https://fullstack.edu.vn/",
//   //     "",
//   //     "width=100,height=100,top=100px"
//   //   );
//   website = window.open("https://fullstack.edu.vn/");
// });

// btnClose.addEventListener("click", () => {
//   website.close();
// });

console.log(window.location);
btn.addEventListener("click", () => {
  window.history.pushState({}, "", "product");
});
