
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('recipe_ingredients').del()
    .then(function () {
      // Inserts seed entries
      return knex('recipe_ingredients').insert([
        { recipe_id: 1, ingredient_id: 1, amount: '1/2', unit: 'cups' },
        { recipe_id: 1, ingredient_id: 2, amount: '1/4', unit: 'tbs' },
        { recipe_id: 1, ingredient_id: 3, amount: '1/2', unit: 'lb' },
        { recipe_id: 2, ingredient_id: 4, amount: '1/2', unit: 'lb' },
      ]);
    });
};
