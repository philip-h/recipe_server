const knex = require('../db/knex');

/**
 * Sends a status 500 error through std response
 *
 * @param {Object} res - A response object
 * @param {String} err - Error message;
 * @param {String} method - The method name where the error occurred;
 */
function sendInternalError(res, err, method) {
  res.status(500).send({
    error: `${method} internal error: ${err}`,
  });
}

module.exports = {
  // get all favourites
  async index(req, res) {
    const rows = await knex('recipes')
        .whereIn('id', function() {
          this.select('recipe_id')
              .where({username: req.body.username})
              .from('favourites');
        })
        .catch((err) => sendInternalError(res, err, 'Favourite.index'));
    if (!rows) return;

    res.send(rows);
  },

  async show(req, res) {
    const rows = await knex('favourites')
        .where({
          recipe_id: req.params.recipe_id,
          username: req.body.username,
        })
        .select()
        .catch((err) => sendInternalError(res, err, 'Favourite.show'));
    if (!rows) return;

    res.send(rows);
  },

  async post(req, res) {
    await knex('favourites')
        .insert({
          recipe_id: req.params.recipe_id,
          username: req.body.username,
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
