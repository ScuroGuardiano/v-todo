module database

[table: 'todos']
pub struct Todo {
pub:
  id i64 [primary; sql: serial]
pub mut:
  name string [nonull]
  deadline u64 [nonull]
  description string [nonull]
  done bool [nonull;default: false]
}

pub fn (mut this Todo) set_name(name string) {
  this.name = name
}

pub fn (mut this Todo) set_deadline(deadline u64) {
  this.deadline = deadline
}

pub fn (mut this Todo) set_description(description string) {
  this.description = description
}

pub fn (mut this Todo) set_done(done bool) {
  this.done = done
}
