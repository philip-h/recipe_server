
exports.up = function(knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments();
    table.text('username').unique();
    table.text('password');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
