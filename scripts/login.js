"use strict";

const inputUsername = document.getElementById("input-username");
const inputPassword = document.getElementById("input-password");
const btnSubmit = document.getElementById("btn-submit");

// bắt sự kiện click vào nút login
btnSubmit.addEventListener("click", function () {
  const isValidate = validate();
  if (isValidate) {
    // Tìm kiếm trong userArr thông tin user người dùng nhập vào có đúng hay ko
    const user = userArr.find(
      (item) =>
        item.username === inputUsername.value &&
        item.password === inputPassword.value
    );

    if (user) {
      alert("Đăng nhập thành công!");
      // lưu thông tin user hiện tại đang đăng nhập trên trang
      saveToStorage("userActive", user);
      // chuyển hướng về trang chủ
      window.location.assign("../index.html");
    } else {
      alert("Thông tin đăng nhập không đúng, vui lòng kiểm tra lại !");
    }
  }
});

// hàm validate dữ liệu nhập vào của người dùng
function validate() {
  let isValidate = true;
  if (inputUsername.value === "") {
    alert("Vui lòng nhập UserName");
    isValidate = false;
  }

  if (inputPassword.value === "") {
    alert("Vui lòng nhập Password");
    isValidate = false;
  }

  return isValidate;
}
