module database

import sqlite

pub fn init(path string) ?sqlite.DB {
  db := sqlite.connect(path)?

  sql db {
    create table Todo
  }

  return db
}
