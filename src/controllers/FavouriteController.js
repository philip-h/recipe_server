const knex = require('../db/knex');
const {sendInternalError, verifyUser} = require('../utils.js');

module.exports = {
  // get all favourites
  async index(req, res) {
    const userId = verifyUser(req, res);

    const rows = await knex('recipes')
        .whereIn('id', function() {
          this.select('recipe_id')
              .where({user_id: userId})
              .from('favourites');
        })
        .catch((err) => sendInternalError(res, err, 'Favourite.index'));
    if (!rows) return;

    res.send(rows);
  },

  async show(req, res) {
    const userId = verifyUser(req, res);
    const rows = await knex('favourites')
        .where({
          recipe_id: req.params.recipe_id,
          user_id: userId,
        })
        .select()
        .catch((err) => sendInternalError(res, err, 'Favourite.show'));
    if (!rows) return;

    res.send(rows);
  },

  async post(req, res) {
    const userId = verifyUser(req, res);

    await knex('favourites')
        .insert({
          recipe_id: req.params.recipe_id,
          user_id: userId,
        })
        .catch((err) => sendInternalError(res, err, 'Favourite.post'));

    res.sendStatus(201);
  },

  async delete(req, res) {
    await knex('favourites')
        .where({recipe_id: req.params.recipe_id})
        .del()
        .catch((err) => sendInternalError(res, err, 'Favourite.delete'));

    res.sendStatus(203);
  },
};
