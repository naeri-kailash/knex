
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('todos').del()
    .then(function () {
      // Inserts seed entries
      return knex('todos').insert([
        {id: 1, tasks: 'vacuum'},
        {id: 2, tasks: 'make spaghetti'},
        {id: 3, tasks: 'feed the chickens'}
      ]);
    });
};
