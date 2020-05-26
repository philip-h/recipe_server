
exports.up = function(knex) {
  return knex.schema.createTable('ingredients', (table) => {
    table.increments();
    table.text('name');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('ingredients');
};
