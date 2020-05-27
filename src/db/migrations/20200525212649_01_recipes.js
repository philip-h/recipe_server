
exports.up = function(knex) {
  return knex.schema.createTable('recipes', (table) => {
    table.increments();
    table.text('name').notNull();
    table.text('image_url');
    table.text('username').notNull();

    table.foreign('username').references('username').inTable('users');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('recipes');
};
