"use strict";
//  Hàm lấy dữ liệu
function getFromStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

// Hàm lưu dũ liệu
function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

// Lấy dữ liệu userArr từ LocalStorage
const user = getFromStorage("userArr") ? getFromStorage("userArr") : [];

// chuyển đổi về dạng class instance
const userArr = user.map((user) => parseUser(user));

// Lấy dữ liệu user đăng nhập

let userActive = getFromStorage("userActive")
  ? parseUser(getFromStorage("userActive"))
  : null;

// Lấy dữ liệu todoarr từ local

const todos = getFromStorage("todoArr") ? getFromStorage("todoArr") : [];

// chuyển đổi về dạng class intance
const todoArr = todos.map((todo) => parseTask(todo));

// hàm : chuyển từ JS object sang class íntance
function parseUser(userData) {
  const user = new User(
    userData.firstname,
    userData.lastname,
    userData.username,
    userData.password,
    userData.category
  );
  return user;
}

// hàm chuyển đổi từ js object sang class instance của task class

function parseTask(taskData) {
  const task = new Task(taskData.task, taskData.owner, taskData.isdone);
  return task;
}
