
exports.up = function(knex) {
  return knex.schema.createTable('recipes', (table) => {
    table.increments()
    table.text('name')
    table.text('image_url')
  })
  
};

exports.down = function(knex) {
  return knex.schema.dropTable('recipes')
};
