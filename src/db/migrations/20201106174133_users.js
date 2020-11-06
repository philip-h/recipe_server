
exports.up = function(knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments();
    table.text('username').unique().notNull();
    table.text('password').notNull();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
