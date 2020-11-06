
exports.up = function(knex) {
  return knex.schema.createTable('favourites', (table) => {
    table.increments();
    table.integer('recipe_id').notNull();
    table.integer('user_id').notNull();

    table.foreign('recipe_id').references('id').inTable('recipes')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');

    table.foreign('user_id').references('id').inTable('users')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('favourites');
};

