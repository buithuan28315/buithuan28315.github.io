"use strict";

const inputFirstname = document.getElementById("input-firstname");
const inputLastname = document.getElementById("input-lastname");
const inputUsername = document.getElementById("input-username");
const inputPassword = document.getElementById("input-password");
const inputPasswordConfirm = document.getElementById("input-password-confirm");
const btnSubmit = document.getElementById("btn-submit");

// Sự kiện bắt đầu khi ấn vào nút Register
btnSubmit.addEventListener("click", function () {
  const user = new User(
    inputFirstname.value,
    inputLastname.value,
    inputUsername.value,
    inputPassword.value
  );

  // Check validate
  const isValidate = validate(user);

  if (isValidate) {
    // Thêm user vào mảng userArr
    userArr.push(user);

    saveToStorage("userArr", userArr);

    alert("đăng ký thành công !");

    // điều hướng sang trang Login
    window.location.href = "../pages/login.html";
  }
});

// Hàm validate thông tin đăng ký của người dùng đăng nhập vào form

function validate(user) {
  let isValidate = true;
  if (user.firstname.trim().length === 0) {
    alert("vui lòng nhập first name !");
    isValidate = false;
  }
  if (user.lastname.trim().length === 0) {
    alert("vui lòng nhập Last name !");
    isValidate = false;
  }
  if (user.username.trim().length === 0) {
    alert("vui lòng nhập user name !");
    isValidate = false;
  }

  if (user.password === "") {
    alert("vui lòng nhập Password!");
    isValidate = false;
  }

  if (inputPasswordConfirm.value === "") {
    alert("vui lòng nhập lại Password!");
    isValidate = false;
  }

  // UserName ko được trùng với username có sẵn
  for (let i = 0; i < userArr.length; i++) {
    if (userArr[i].username === user.username) {
      alert("User Name đã tồn tại !");
      isValidate = false;
      break;
    }
  }
  // Password và Confirm phải giống nhau
  if (user.password !== inputPasswordConfirm.value) {
    alert("Password phải giống nhau !");
    isValidate = false;
  }

  // password phải có nhiều hơn 8 ký tự > 8 ký tự
  if (user.password.length <= 8) {
    alert("PassWord Phải có nhiều hơn 8 ký tự !");
    isValidate = false;
  }

  return isValidate;
}
