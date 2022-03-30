module services

import sqlite
import database

pub struct TodoService {
  db sqlite.DB
}

pub fn new_todo_service(db sqlite.DB) TodoService {
  return TodoService{db: db}
}

pub fn (this TodoService) add_todo(todo database.Todo) database.Todo {
  sql this.db {
    insert todo into database.Todo
  }
  return todo
}

pub fn (this TodoService) get_todos() []database.Todo {
  todos := sql this.db { 
    select from database.Todo
  }
  return todos
}

pub fn (this TodoService) update_todo(todo database.Todo) database.Todo {
  sql this.db {
    update database.Todo
    set name = todo.name,
        deadline = todo.deadline,
        description = todo.description,
        done = todo.done
    where id == todo.id
  }
  return todo
}

pub fn (this TodoService) delete_todo(id int) {
  sql this.db {
    delete from database.Todo where id == id
  }
}

pub fn (this TodoService) get_todo_by_id(id int) database.Todo {
  todo := sql this.db {
    select from database.Todo where id == id
  }
  return todo
}
