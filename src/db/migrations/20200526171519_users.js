
exports.up = function(knex) {
  return knex.schema.createTable('recipes', (table) => {
    table.increments();
    table.text('username').unique();
    table.text('password');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('recipes');
};
