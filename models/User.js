"use strict";
// class user để đại diện thông tin của người dùng
class User {
  constructor(
    firstname,
    lastname,
    username,
    password,

    pageSize = 10,
    category = "business"
  ) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.username = username;
    this.password = password;

    this.pageSize = pageSize;
    this.category = category;
  }
}

// class task để chứa thông tin về task trong todo list

class Task {
  constructor(task, owner, isdone) {
    this.task = task;
    this.owner = owner;
    this.isdone = isdone;
  }
}
