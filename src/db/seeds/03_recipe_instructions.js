
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('recipe_instructions').del()
    .then(function () {
      // Inserts seed entries
      return knex('recipe_instructions').insert([
        { recipe_id: 1, step: 1, step_description: 'In a large bowl, combine flour, sugar, salt and cocoa powder.' },
        { recipe_id: 1, step: 2, step_description: 'Add butter, water, vanilla and eggs and beat for 2 minutes at medium speed.' },
        { recipe_id: 1, step: 3, step_description: 'Add nuts and pour in an 8" greased square pan.' },
        { recipe_id: 1, step: 4, step_description: 'Bake at 350°F for 25-30 minutes.' },
        { recipe_id: 1, step: 5, step_description: 'Cool in pan and cut in squares.' },

        { recipe_id: 2, step: 1, step_description: 'Combine flour, baking soda and salt.' },
        { recipe_id: 2, step: 2, step_description: 'Cream butter and sugar until fluffy.' },
        { recipe_id: 2, step: 3, step_description: 'Beat in egg and vanilla. Add four mixture and stir until well blended.' },
        { recipe_id: 2, step: 4, step_description: 'Stir in chocolate chips.' },
        { recipe_id: 2, step: 5, step_description: 'Drip by teaspoons 2" apart on a greased baking sheet and bake at 375°F in a greheated oven for 10-15 minutes until lightly browned.' },
      ]);
    });
};
