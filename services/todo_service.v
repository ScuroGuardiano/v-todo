module services

import sqlite
import database

struct TodoService {
  db sqlite.DB
}

pub fn new(db sqlite.DB) TodoService {
  return TodoService{db: db}
}

pub fn (this TodoService) add_todo(todo database.Todo) database.Todo {
  sql this.db {
    insert todo into database.Todo
  }
  return todo
}
