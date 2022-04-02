module services

import sqlite
import database
import dto

pub struct TodoService {
  db sqlite.DB
}

pub fn new_todo_service(db sqlite.DB) TodoService {
  return TodoService{db: db}
}

pub fn (this TodoService) add_todo(todo_dto dto.TodoDtoCreate) database.Todo {
  todo := database.Todo {
    name: todo_dto.name,
    description: todo_dto.description,
    deadline: todo_dto.deadline,
    done: todo_dto.done
  }

  sql this.db {
    insert todo into database.Todo
  }

  // Yea I know, it's not a transaction and this could give bad result
  // I don't know if making transaction with this ORM is possible
  // It's simple todo app, whatever.
  last_inserted_id := this.db.last_insert_rowid()

  inserted_todo := database.Todo {
    id: last_inserted_id,
    name: todo.name,
    description: todo.description,
    deadline: todo.deadline,
    done: todo.done
  }

  return inserted_todo
}

pub fn (this TodoService) get_todos() []database.Todo {
  todos := sql this.db { 
    select from database.Todo
  }
  return todos
}

pub fn (this TodoService) update_todo(id i64, todo_dto dto.TodoDtoUpdate) ?database.Todo {
  mut todo := sql this.db {
    select from database.Todo
    where id == id
  }

  if todo.id == 0 {
    return none
  }

  todo.set_name(todo_dto.name)
  todo.set_deadline(todo_dto.deadline)
  todo.set_description(todo_dto.description)
  todo.set_done(todo_dto.done)

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

pub fn (this TodoService) delete_todo(id i64) {
  sql this.db {
    delete from database.Todo where id == id
  }
}

pub fn (this TodoService) get_todo_by_id(id i64) database.Todo {
  todo := sql this.db {
    select from database.Todo where id == id
  }
  return todo
}
