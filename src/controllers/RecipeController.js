const knex = require('../db/knex');

module.exports = {
  // get all recipes
  async index (req, res) {
    const rows = await knex('recipes').select();
    res.send(rows);
  },

  // Show a whole recipe
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
     recipeInfo,
     ingredients,
     instructions
   }

    res.send(recipe)
  },

  // Create a new recipe
  // 1. Add recipe to the recipes table
  // 2. Add necessary new ingredients to ingredients table
  // 3. Use 1 and 2 to create ingredient measurements
  // 4. Add each instruction
  async post(req, res) {

    // 1. Add recipe to the recipes table -------------------------------------
    const id = await
      knex('recipes')
        .returning('id')
        .insert({ 
          name: req.body.recipeInfo.name,  
          image_url: req.body.recipeInfo.image_url
        });

    const recipe_id = id[0];

    // 2. Add necessary new ingredients to ingredients table ------------------
    // Get each ingredient
    const ingredientList = req.body.ingredients.split('\n')
    const recipe_ingredients = []

    // For each ingredient, only insert if it does not already exist.
    // EIther way, we will need all the id's of the ingredients for the next step
    // TODO: Bwetter way to split ingredients
    for (const ingredient of ingredientList) {
      const ingredientRow = ingredient.split(' ');
      // Name is always the last element
      const ingredientName = ingredientRow.pop();
      let id = await knex('ingredients')
        .where({ name: ingredientName })
        .select('id')
        .first();

      // The ingredients was in the database
      // returns an object { id: n }, convert to number
      if (id) {
        id = id.id;

      // The ingredient was not in the database
      // Insert, and grab the inserted id, which is returned in the form [ id ]
      } else {
        id = await knex('ingredients')
          .returning('id')
          .insert({ name: ingredientName });

        id = id[0];
      }

      // Add the id of the ingredient to the list
      ingredientRow.push(id);
      recipe_ingredients.push(ingredientRow);
    }

    // 3. Add each recipe ingredient ----------------------------
    for (const recipe_ingredient of recipe_ingredients) {
      const ingredient_id = recipe_ingredient.pop();
      const unit = recipe_ingredient.pop();
      const amount = recipe_ingredient.pop();

      await knex('recipe_ingredients')
        .insert({ recipe_id, ingredient_id, amount, unit });
    }

    // 4. Add each instruction --------------------------------------------------
    const instructionList = req.body.instructions.split('\n')
    for (const instruction of instructionList) {
      const instructionRow = instruction.split(' ');
      const step = instructionRow.shift();
      const step_description = instructionRow.join(" ");

      await knex('recipe_instructions')
        .insert({ recipe_id, step, step_description });
    }

    res.status(201).send();
  }
}
