
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('favourites').del()
    .then(function () {
      // Inserts seed entries
      return knex('favourites').insert([
        { recipe_id: 1 },
        { recipe_id: 10 },
      ]);
    });
};
