
exports.up = function(knex) {
  return knex.schema.createTable('favourites', (table) => {
    table.increments();
    table.integer('recipe_id').notNull();
    table.text('username').notNull();

    table.foreign('recipe_id').references('id').inTable('recipes');
    table.foreign('username').references('username').inTable('users');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('favourites');
};

