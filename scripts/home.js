"use strict";

const loginModal = document.getElementById("login-modal");
const mainContent = document.getElementById("main-content");
const welcomeMessage = document.getElementById("welcome-message");
const btnLogout = document.getElementById("btn-logout");

displayHome();

// Hàm hiển thị nội dung trên trang home một cách hợp lý tùy vào trường hợp
function displayHome() {
  if (userActive) {
    loginModal.style.display = "none";
    mainContent.style.display = "block";
    // thêm thông báo welcomemasse
    welcomeMessage.textContent = `Welcome ${userActive.firstname}`;

    // Nếu không ai đăng nhập
  } else {
    loginModal.style.display = "block";
    mainContent.style.display = "none";
  }
}

// Khi ấn vào nút Logout
btnLogout.addEventListener("click", function () {
  const isLogout = confirm("Bạn Chắc chắn muốn Logout chứ ?");
  if (isLogout) {
    userActive = null;
    saveToStorage("userActive", userActive);
    displayHome();
  }
});
