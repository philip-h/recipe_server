const knex = require('../db/knex');
const {sendInternalError} = require('../utils.js');

module.exports = {
  // get all ingredients
  async index(req, res) {
    const rows = await knex('ingredients')
        .select('name')
        .catch((err) => sendInternalError(res, err, 'Favourite.index'));
    if (!rows) return;

    res.send(rows);
  },
};

