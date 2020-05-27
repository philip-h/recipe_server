
exports.up = function(knex) {
  return knex.schema.createTable('recipe_ingredients', (table) => {
    table.integer('recipe_id').notNull();
    table.integer('ingredient_id').notNull();
    table.text('amount').notNull();
    table.text('unit').notNull();

    table.foreign('recipe_id').references('id').inTable('recipes');
    table.foreign('ingredient_id').references('id').inTable('ingredients');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('recipe_ingredients');
};
