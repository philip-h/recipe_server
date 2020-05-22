const knex = require('../db/knex');

function sendInternalError(res, err, method) {
  res.status(500).send({
    error:`${method} internal error: ${err}`
  })
}

module.exports = {
  // get all favourites
  async index (req, res) {
    const rows = await knex('recipes')
      .whereIn('id', function() {
        this.select('recipe_id').from('favourites')
      })
      .catch(err => sendInternalError(res, err, 'Favourite.index'))

    res.send(rows);
    
  },

  async show (req, res) {
    const rows = await knex('favourites')
      .where({ recipe_id: req.params.recipe_id })
      .select()
      .catch(err => sendInternalError(res, err, 'Favourite.index'))

    res.send(rows);
  },

  async post (req, res) {
    await knex('favourites')
      .insert( { recipe_id: req.params.recipe_id } )
      .catch(err => sendInternalError(res, err, 'Favourite.index'))

    res.sendStatus(201);
  },

  async delete (req, res) {
    await knex('favourites')
      .where({ recipe_id: req.params.recipe_id })
      .del()
      .catch(err => sendInternalError(res, err, 'Favourite.index'))

    res.sendStatus(203);
  },
}