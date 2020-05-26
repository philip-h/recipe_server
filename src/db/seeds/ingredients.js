
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('ingredients').del()
    .then(function () {
      // Inserts seed entries
      return knex('ingredients').insert([
        { name: 'flour' },
        { name: 'sugar' },
        { name: 'salt' },
        { name: 'cocoa powder' },
        { name: 'melted butter' },
        { name: 'water' },
        { name: 'vanilla' },
        { name: 'eggs' },
        { name: 'chopped walnuts'},
        { name: 'baking soda'},
        { name: 'chocolate chips'},
      ]);
    });
};
