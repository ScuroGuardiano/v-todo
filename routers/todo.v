module routers

import nedpals.vex.router
import nedpals.vex.ctx
import json

import services
import database

struct TodoDto {
  name string [required]
  deadline u64 [required]
  description string [required]
  done bool
}

pub fn register_todo(mut app &router.Router, todo_service services.TodoService) {

  app.route(.get, '/todos', fn [todo_service] (req &ctx.Req, mut res &ctx.Resp) {
    todos := todo_service.get_todos()
    res.send_json(todos, 200)
  })

  app.route(.post, '/todos', fn [todo_service] (req &ctx.Req, mut res &ctx.Resp) {
    body := req.parse_form() or {
      res.send('Bad Request', 400)
      return
    }

    // Okey I am parsing from JSON to map and then to JSON, coz I am too lazy to write custom body parsing function and I want convert it to struct.
    // body_jsoned := json.encode(body)
    // todo_dto := json.decode(TodoDto, body_jsoned) or {
    //   res.send('Bad Request', 400)
    //   return
    // }

    todo_dto := json.decode(TodoDto, json.encode(body)) or {
      res.send('Bad Request', 400)
      return
    }
    
    todo := database.Todo {
      name: todo_dto.name,
      description: todo_dto.description,
      deadline: todo_dto.deadline,
      done: todo_dto.done
    }

    created_todo := todo_service.add_todo(todo)
    res.send_json(created_todo, 200)
  }) 
}
