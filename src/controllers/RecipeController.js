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
  // 3. Add each recipe ingredient
  // 4. Add each instruction
  async post(req, res) {
    const recipe = req.body.recipe

    // 1. Add recipe to the recipes table -------------------------------------
    const id = await
      knex('recipes')
        .returning('id')
        .insert({ 
          name: recipe.recipeInfo.name,  
          image_url: recipe.recipeInfo.image_url
        });

    const recipe_id = id[0];

    // 2. Add necessary new ingredients to ingredients table ------------------
    
    // For each ingredient, only insert if it does not already exist.
    // Either way, we will need all the id's of the ingredients for the next step
    for (const ingredient of recipe.ingredients) {

      let id = await knex('ingredients')
        .where({ name: ingredient.name })
        .select('id')
        .first();

      // The ingredient was in the database
      // returns an object { id: n }, convert to number
      if (id) {
        id = id.id;

      // The ingredient was not in the database
      // Insert, and grab the inserted id, which is returned in the form [ id ]
      } else {
        id = await knex('ingredients')
          .returning('id')
          .insert({ name: ingredient.name });

        id = id[0];
      }

      ingredient.id = id;
      
      // 3. Add each recipe ingredient ----------------------------------------
      await knex('recipe_ingredients')
        .insert({
          recipe_id,
          ingredient_id: ingredient.id,
          amount: ingredient.amount,
          unit: ingredient.unit
        })
    }

    // 4. Add each instruction --------------------------------------------------
    for (const [index, instruction] of recipe.instructions.entries()) {

      await knex('recipe_instructions')
        .insert({
          recipe_id,
          step: index+1,
          step_description: instruction.step_description
        })
    }

    res.status(201).send();
  },

  // Update a new recipe
  // 1. Update recipe in recipes table
  // 2. Remove existing recipe ingredients
  // 3. Add necessary new ingredients to ingredients table
  // 4. Update recipe ingredient
  // 5. Update each instruction
  async put(req, res) {
    const recipe = req.body.recipe
    const recipe_id = req.params.id

    // 1. Update recipe in recipes table -------------------------------------
      await knex('recipes')
        .where('id', '=', recipe_id)
        .update({ 
          name: recipe.recipeInfo.name,  
          image_url: recipe.recipeInfo.image_url
        });

    // 2. Remove existing recipe ingredients ----------------------------------
    await knex('recipe_ingredients')
      .where('recipe_id', '=', recipe_id)
      .del();

    // 3. Add necessary new ingredients to ingredients table ------------------
    
    // For each ingredient, only insert if it does not already exist.
    // Either way, we will need all the id's of the ingredients for the next step
    for (const ingredient of recipe.ingredients) {

      let id = await knex('ingredients')
        .where({ name: ingredient.name })
        .select('id')
        .first();

      // The ingredient was in the database
      // returns an object { id: n }, convert to number
      if (id) {
        id = id.id;

      // The ingredient was not in the database
      // Insert, and grab the inserted id, which is returned in the form [ id ]
      } else {
        id = await knex('ingredients')
          .returning('id')
          .insert({ name: ingredient.name });

        id = id[0];
      }

      ingredient.id = id;
      
      // 4. Update each recipe ingredient ----------------------------------------
      await knex('recipe_ingredients')
        .insert({
          recipe_id,
          ingredient_id: ingredient.id,
          amount: ingredient.amount,
          unit: ingredient.unit
        })
    }

    // 5. Update each instruction --------------------------------------------------

    // Remove all current instructions
    await knex('recipe_instructions')
      .where('recipe_id', '=', recipe_id)
      .del()

    // Add them back in again
    for (const [index, instruction] of recipe.instructions.entries()) {
      await knex('recipe_instructions')
        .insert({
          recipe_id,
          step: index+1,
          step_description: instruction.step_description
        })
    }

    res.status(201).send();
  }
}
