
exports.up = function(knex) {
  return knex.schema.createTable('recipe_instructions', (table) => {
    table.integer('recipe_id');
    table.integer('step');
    table.text('step_description');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('recipe_instructions');
};
