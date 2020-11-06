
exports.up = function(knex) {
  return knex.schema.createTable('recipes', (table) => {
    table.increments();
    table.text('name').notNull();
    table.text('image_url');
    table.integer('user_id').notNull();

    table.foreign('user_id').references('id').inTable('users')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('recipes');
};
