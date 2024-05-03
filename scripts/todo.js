"use strict";
if (userActive) {
  const todoList = document.getElementById("todo-list");
  const btnAdd = document.getElementById("btn-add");
  const inputTask = document.getElementById("input-task");

  displayTodoList();
  //  hàm hiển thị todo list
  function displayTodoList() {
    let html = "";

    todoArr
      .filter((todo) => todo.owner === userActive.username)
      .forEach(function (todo) {
        html += `
      <li class=${todo.isdone ? "checked" : ""} >${
          todo.task
        } <span class="close">x</span></li>
      `;
      });
    todoList.innerHTML = html;
    // bắt các sự kiện
    eventToggleTasks();
    eventDeleteTasks();
  }

  // Nút add để thêm task
  btnAdd.addEventListener("click", function () {
    // kiểm tra người dùng đã nhập tên nhiệm vụ cần add ?
    if (inputTask.value.trim().length === 0) {
      alert("Vui lòng nhập nhiệm vụ !");
    } else {
      const todo = new Task(inputTask.value, userActive.username, false);

      // thêm task mới vào mảng todoArr
      todoArr.push(todo);
      // Lưu dữ liệu
      saveToStorage("todoArr", todoArr);
      // hiển thị lại list nhiệm vụ
      displayTodoList();
      // reset dự liệu từ form nhập
      inputTask.value = "";
    }
  });

  // Bắt đầu sự kiện toggle task
  function eventToggleTasks() {
    document.querySelectorAll("#todo-list li").forEach(function (liEl) {
      liEl.addEventListener("click", function (e) {
        if (e.target !== liEl.children[0]) {
          // toggle class checked
          liEl.classList.toggle("checked");
          // tìm task vừa click vào (toggle)
          const todo = todoArr.find(
            (todoItem) =>
              todoItem.owner === userActive.username &&
              todoItem.task === liEl.textContent.slice(0, -1)
          );
          // Thuộc tính isDone
          todo.isdone = liEl.classList.contains("checked") ? true : false;
          // Lưu
          saveToStorage("todoArr", todoArr);
        }
      });
    });
  }

  // Bắt đầu sự kiện Xóa các task
  function eventDeleteTasks() {
    document.querySelectorAll("#todo-list .close").forEach(function (closeEl) {
      closeEl.addEventListener("click", function () {
        // Hỏi xác nhận xóa
        const isDelete = confirm("Bạn Có chắc chắn xóa chứ ?");

        if (isDelete) {
          // tìm vị trí của task đước ấn xóa trong mảng todoArr
          const index = todoArr.findIndex(
            (item) =>
              item.owner === userActive.username &&
              item.task === closeEl.parentElement.textContent.slice(0, -1)
          );

          // Xóa task đó khỏi mảng todoArr
          todoArr.splice(index, 1);
          // Lưu (cập nhập Lại) dữ liệu
          saveToStorage("todoArr", todoArr);
          // Hiển thị lại todo list
          displayTodoList();
        }
      });
    });
  }
  // Nếu chưa đăng nhập thì thông báo người dùng đăng nhập vào trang
} else {
  alert("Vui Lòng đăng nhập / đăng ký để truy cập ứng dụng");
  window.location.assign("../index.html");
}
