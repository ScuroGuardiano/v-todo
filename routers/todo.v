module routers

import nedpals.vex.router
import nedpals.vex.ctx
import json

import services
import dto
import utils

pub fn register_todo(mut app &router.Router, todo_service services.TodoService) {

  app.route(.get, '/todos', fn [todo_service] (req &ctx.Req, mut res &ctx.Resp) {
    todos := todo_service.get_todos()
    res.send_json(todos, 200)
  })

  app.route(.get, '/todos/:id', fn [todo_service] (req &ctx.Req, mut res &ctx.Resp) {
    id := req.params["id"].i64()
    todo := todo_service.get_todo_by_id(id)
    if todo.id == 0 {
      res.send_json(utils.ApiError{error: "Not found", status_code: 404}, 404)
      return
    }

    res.send_json(todo, 200)
  })

  app.route(.post, '/todos', fn [todo_service] (req &ctx.Req, mut res &ctx.Resp) {
    body := req.body.bytestr()

    todo_dto := json.decode(dto.TodoDtoCreate, body) or {
      res.send_json(utils.ApiError{error: err.str(), status_code: 400}, 400)
      return
    }

    created_todo := todo_service.add_todo(todo_dto)
    res.send_json(created_todo, 201)
  })

  // Well... I can't use another route parameter coz Vex doesn't allow me to do it:
  /*
    V panic: [VEX] Failed to add route `/todos/:id`. Reason: Only one wildcard OR param route in a route list is allowed.
    v hash: 6137ce2
    /tmp/v_1000/v-todo.13107889510296740676.tmp.c:16490: at _v_panic: Backtrace
    /tmp/v_1000/v-todo.13107889510296740676.tmp.c:46453: by Map_string_nedpals__vex__router__Route_ptr_route
    /tmp/v_1000/v-todo.13107889510296740676.tmp.c:46279: by nedpals__vex__router__Router_route
    /tmp/v_1000/v-todo.13107889510296740676.tmp.c:47631: by routers__register_todo
    /tmp/v_1000/v-todo.13107889510296740676.tmp.c:47648: by main__main
    /tmp/v_1000/v-todo.13107889510296740676.tmp.c:48302: by main
  */
  // Help plz.
  app.route(.put, '/todos', fn [todo_service] (req &ctx.Req, mut res &ctx.Resp) {
    body := req.body.bytestr()

    iam := "Sorry, but to update todo you must provide full TodoUpdateDto because V does not support optional values on structs or something yet."
    losing := "Ahh btw you must also give id in the body, coz [VEX] (framework that I use) allows only for one param route on route list."
    my_fucking_mind := "Additional error info:"

    todo_dto := json.decode(dto.TodoDtoUpdate, body) or {
      res.send_json(utils.ApiError{
        error: "$iam $losing $my_fucking_mind $err.str()",
        status_code: 400
      }, 400)
      return
    }

    id := todo_dto.id

    updated_todo := todo_service.update_todo(id, todo_dto) or {
      res.send_json(utils.ApiError{error: "Not found", status_code: 404}, 404)
      return
    }

    res.send_json(updated_todo, 200)
  })

  app.route(.delete, '/todos', fn [todo_service] (req &ctx.Req, mut res &ctx.Resp) {
    lost := "Sorry, but to delete todo you must provide it's ID in request query params."
    sanity := "coz [VEX] (framework that I use) allows only for one param route on route list."

    query := req.parse_query() or {
      res.send_json(utils.ApiError{error: "$lost $sanity Additional error info: $err.str()", status_code: 400}, 400)
      return
    }

    id := query["id"] or {
      res.send_json(utils.ApiError{error: "$lost $sanity", status_code: 400}, 400)
      return
    }

    // I will select to check if it exists and return good error...
    todo := todo_service.get_todo_by_id(id.i64())
    if todo.id == 0 {
      res.send_json(utils.ApiError{error: "Not found", status_code: 404}, 404)
      return
    }

    // ... BECAUSE V ORM DOESN'T RETURN HOW MANY ROWS WAS DELETED OR ANYTHING LIKE THAT
    todo_service.delete_todo(id.i64())

    res.send_json(map[string]string{}, 204)
  })
}
