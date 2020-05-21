
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('recipe_instructions').del()
    .then(function () {
      // Inserts seed entries
      return knex('recipe_instructions').insert([
        { recipe_id: 1, step: 1, step_description: 'Cry a little' },
        { recipe_id: 1, step: 2, step_description: 'Mix ingredients' },
        { recipe_id: 1, step: 3, step_description: 'Have a good eats' },
        { recipe_id: 2, step: 1, step_description: 'Don\'t even try' },
      ]);
    });
};
