
exports.up = function(knex) {
  return knex.schema.createTable('favourites', (table) => {
    table.increments()
    table.integer('recipe_id')
    // username

    table.foreign('recipe_id').references('id').inTable('recipes')
  })
  
};

exports.down = function(knex) {
  return knex.schema.dropTable('favourites')
};

