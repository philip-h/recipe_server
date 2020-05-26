
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('recipe_ingredients').del()
    .then(function () {
      // Inserts seed entries
      return knex('recipe_ingredients').insert([
        { recipe_id: 1, ingredient_id: 1, amount: '3/4', unit: 'cup' },
        { recipe_id: 1, ingredient_id: 2, amount: '1', unit: 'cup' },
        { recipe_id: 1, ingredient_id: 3, amount: '1/4', unit: 'tsp.' },
        { recipe_id: 1, ingredient_id: 4, amount: '1/3', unit: 'cup' },
        { recipe_id: 1, ingredient_id: 5, amount: '1/2', unit: 'cup' },
        { recipe_id: 1, ingredient_id: 6, amount: '3', unit: 'tbsp.' },
        { recipe_id: 1, ingredient_id: 7, amount: '1', unit: 'tsp.' },
        { recipe_id: 1, ingredient_id: 8, amount: '2', unit: '' },
        { recipe_id: 1, ingredient_id: 9, amount: '1/2', unit: 'cup' },

        { recipe_id: 2, ingredient_id: 1, amount: '1', unit: 'cup' },
        { recipe_id: 2, ingredient_id: 10, amount: '1/2', unit: 'tsp.' },
        { recipe_id: 2, ingredient_id: 3, amount: '1/2', unit: 'tsp.' },
        { recipe_id: 2, ingredient_id: 5, amount: '1/2', unit: 'cup' },
        { recipe_id: 2, ingredient_id: 2, amount: '5', unit: 'tbsp.' },
        { recipe_id: 2, ingredient_id: 8, amount: '1', unit: '' },
        { recipe_id: 2, ingredient_id: 7, amount: '1', unit: 'tsp.' },
        { recipe_id: 2, ingredient_id: 11, amount: '1', unit: 'cup' },
      ]);
    });
};
