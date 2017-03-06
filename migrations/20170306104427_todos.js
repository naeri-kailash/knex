
exports.up = function (knex, Promise) {
  return knex.schema.createTableIfNotExists('todos', function (table) {
    table.increments()
    table.string('tasks')
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('todos')
}
