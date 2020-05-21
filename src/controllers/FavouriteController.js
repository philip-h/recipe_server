const knex = require('../db/knex');

module.exports = {
  // get all favourites
  async index (req, res) {
    const rows = await knex('recipes')
      .whereIn('id', function() {
        this.select('recipe_id').from('favourites');
      });
    res.send(rows);
    
  },

  async show (req, res) {
    const rows = await knex('favourites')
      .where({ recipe_id: req.params.recipe_id })
      .select();

    res.send(rows);
  },

  async post (req, res) {
    await knex('favourites')
      .insert( { recipe_id: req.params.recipe_id } );

    res.sendStatus(201);
  },

  async delete (req, res) {
    await knex('favourites')
      .where({ recipe_id: req.params.recipe_id })
      .del();

    res.sendStatus(203);
  },
}
