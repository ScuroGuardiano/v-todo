module main

import nedpals.vex.server
import nedpals.vex.router
import nedpals.vex.ctx

import database

fn main() {
  mut app := router.new()
  db := database.init('data.db') or {
    println(err)
    exit(1)
  }


  app.route(.get, '/', fn (req &ctx.Req, mut res &ctx.Resp) {
    res.send("Hewwo uwu", 200)
  })

	server.serve(app, 8000)
}
