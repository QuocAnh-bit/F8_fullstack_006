/*OPEN MODAL BOX*/
var btn = document.querySelector(".open-modal");
var modelBox = document.querySelector(".modal-box");
var modelOverlay = modelBox.querySelector(".modal-overlay");
btn.addEventListener("click", function () {
  modelBox.classList.add("show");
});
modelOverlay.addEventListener("click", function () {
  modelBox.classList.remove("show");
});

/* CHANGE FORM LOGIN / REGISTER */
var btnLogin = document.querySelector(".login");
var btnRegister = document.querySelector(".register");
var formLogin = document.querySelector(".form-login");
var formRegister = document.querySelector(".form-register");
btnLogin.addEventListener("click", function () {
  btnLogin.classList.add("active-btn");
  btnRegister.classList.remove("active-btn");
  formLogin.classList.add("active");
  formRegister.classList.remove("active");
  messErrNameRegister.innerText = "";
  errName.classList.remove("error");
  messErrEmailRegister.innerText = "";
  errEmailRegister.classList.remove("error");
  messErrPasswordRegister.innerText = "";
  messErrPasswordRegister.classList.remove("error");
});
btnRegister.addEventListener("click", function () {
  btnRegister.classList.add("active-btn");
  btnLogin.classList.remove("active-btn");
  formLogin.classList.remove("active");
  formRegister.classList.add("active");
  messErrEmail.innerText = "";
  errEmail.classList.remove("error");
  messErrPassword.innerText = "";
  errPassword.classList.remove("error");
});

/* CHECK LOGIN */
var errEmail = document.querySelector("#email");
var errPassword = document.querySelector("#password");
var messErrEmail = document.querySelector(".err-email");
var messErrPassword = document.querySelector(".err-password");
function validateEmail(email) {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
}
errEmail.addEventListener("blur", function () {
  if (!errEmail.value && !errPassword.value) {
    messErrEmail.innerText = "Vui lòng nhập thông tin";
    errEmail.classList.add("error");
    messErrPassword.innerText = "Vui lòng nhập thông tin";
    errPassword.classList.add("error");
  } else if (!validateEmail(errEmail.value)) {
    messErrEmail.innerText = "Vui lòng nhập đúng định dạng email";
  } else {
    messErrEmail.innerText = "";
    errEmail.classList.remove("error");
  }
});
errPassword.addEventListener("blur", function () {
  if (!errEmail.value && !errPassword.value) {
    messErrEmail.innerText = "Vui lòng nhập thông tin";
    errEmail.classList.add("error");
    messErrPassword.innerText = "Vui lòng nhập thông tin";
    errPassword.classList.add("error");
  } else if (errPassword.value.length < 8) {
    messErrPassword.innerText = "Vui lòng nhập đủ mật khẩu gồm 8 Ký tự";
    errPassword.classList.add("error");
  } else {
    messErrPassword.innerText = "";
    errPassword.classList.remove("error");
  }
});

/* SHOW HIDE PASSWORD LOGIN */
var changeButtonPassword = document.querySelector(".fa-eye");
var viewPassword = document.querySelector(".view-password");
var typeInputPassword = document.querySelector("#password");
viewPassword.addEventListener("click", function () {
  changeButtonPassword.classList.toggle("fa-eye");
  if (typeInputPassword.type === "password") {
    typeInputPassword.type = "text";
  } else {
    typeInputPassword.type = "password";
  }
});

/* CHECK REGISTER */
var errName = document.querySelector("#full-name");
var errEmailRegister = document.querySelector("#email-register");
var errPasswordRegister = document.querySelector("#password-register");
var messErrNameRegister = document.querySelector(".err-name-register");
var messErrEmailRegister = document.querySelector(".err-email-register");
var messErrPasswordRegister = document.querySelector(".err-password-register");
errName.addEventListener("blur", function () {
  if (!errEmailRegister.value && !errPasswordRegister.value && !errName.value) {
    messErrNameRegister.innerText = "Vui lòng nhập thông tin";
    errName.classList.add("error");
    messErrEmailRegister.innerText = "Vui lòng nhập thông tin";
    errEmailRegister.classList.add("error");
    messErrPasswordRegister.innerText = "Vui lòng nhập thông tin";
    errPasswordRegister.classList.add("error");
  } else {
    messErrNameRegister.innerText = "";
    errName.classList.remove("error");
  }
});
errEmailRegister.addEventListener("blur", function () {
  if (!errEmailRegister.value && !errPasswordRegister.value && !errName.value) {
    messErrNameRegister.innerText = "Vui lòng nhập thông tin";
    errName.classList.add("error");
    messErrEmailRegister.innerText = "Vui lòng nhập thông tin";
    errEmailRegister.classList.add("error");
    messErrPasswordRegister.innerText = "Vui lòng nhập thông tin";
    errPasswordRegister.classList.add("error");
  } else if (!validateEmail(errEmailRegister.value)) {
    messErrEmailRegister.innerText = "Vui lòng nhập đúng định dạng email";
  } else {
    messErrEmailRegister.innerText = "";
    errEmailRegister.classList.remove("error");
  }
});
errPasswordRegister.addEventListener("blur", function () {
  if (!errEmailRegister.value && !errPasswordRegister.value) {
    messErrEmailRegister.innerText = "Vui lòng nhập thông tin";
    errEmailRegister.classList.add("error");
    messErrPasswordRegister.innerText = "Vui lòng nhập thông tin";
    errPasswordRegister.classList.add("error");
  } else if (errPasswordRegister.value.length < 8) {
    messErrPasswordRegister.innerText = "Vui lòng nhập đủ mật khẩu gồm 8 Ký tự";
    errPassword.classList.add("error");
  } else {
    messErrPasswordRegister.innerText = "";
    errPassword.classList.remove("error");
  }
});

/* SHOW HIDE PASSWORD REGISTER */
var changeButtonPasswordRegister = document.querySelector(
  ".view-password-register .fa-eye"
);
console.log(changeButtonPasswordRegister);
var viewPasswordRegister = document.querySelector(".view-password-register");
var typeInputPasswordRegister = document.querySelector("#password-register");
viewPasswordRegister.addEventListener("click", function () {
  changeButtonPasswordRegister.classList.toggle("fa-eye");
  if (typeInputPasswordRegister.type === "password") {
    typeInputPasswordRegister.type = "text";
  } else {
    typeInputPasswordRegister.type = "password";
  }
});
