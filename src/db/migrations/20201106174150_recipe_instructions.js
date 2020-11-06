
exports.up = function(knex) {
  return knex.schema.createTable('recipe_instructions', (table) => {
    table.integer('recipe_id').notNull();
    table.integer('step').notNull();
    table.text('step_description').notNull();

    table.foreign('recipe_id').references('id').inTable('recipes')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('recipe_instructions');
};
