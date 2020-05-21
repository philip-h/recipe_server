const knex = require('../db/knex');

module.exports = {
  // get all recipes
  async index (req, res) {
    const rows = await knex('recipes').select();
    res.send(rows);
  },

 async show(req, res) {
   const id = req.params.id;
   const recipeInfo = await knex('recipes').where({ id }).select('name', 'image_url').first();

   const ingredients = await 
     knex('recipe_ingredients')
      .join('ingredients', 'recipe_ingredients.ingredient_id', '=', 'ingredients.id')
      .where({ recipe_id: id })
      .select('amount', 'unit', 'name')

   const instructions = await 
     knex('recipes')
      .join('recipe_instructions', 'recipes.id', '=', 'recipe_instructions.recipe_id')
      .where({ id })
      .select('step', 'step_description')

   const recipe = {
     id,
     recipeInfo,
     ingredients,
     instructions
   }

    res.send(recipe)
  }
}
