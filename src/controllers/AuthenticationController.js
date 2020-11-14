const knex = require('../db/knex');
const bcrypt = require('bcryptjs');
const {sendInternalError, jwtSignUser, hashPassword} = require('../utils.js');

module.exports = {
  async register(req, res) {
    const {username, password} = req.body;

    const hashedPassword = await hashPassword(password);
    const userId = await
    knex('users')
        .returning('id')
        .insert({
          username,
          password: hashedPassword,
        })
        .catch((err) => sendInternalError(res, err, 'Authentication.register'));
    if (!userId || !userId.length) return;

    const user = await
    knex('users')
        .where({id: userId[0]})
        .select()
        .first()
        .catch((err) => sendInternalError(res, err, 'Authentication.register'));
    if (!user) return;

    res.send({
      username: user.username,
      token: jwtSignUser(user),
    });
  },

  async login(req, res) {
    const {username, password} = req.body;
    const user = await
    knex('users')
        .where({username})
        .select()
        .first()
        .catch((err) => sendInternalError(res, err, 'Authentication.login'));

    if (!user) {
      res.status(403).send({
        error: 'Login information was incorect',
      });
      return;
    }

    if (!bcrypt.compare(password, user.password)) {
      res.status(403).send({
        error: 'Login information was incorrect',
      });
      return;
    }

    res.send({
      username: user.username,
      token: jwtSignUser({
        id: user.id,
      }),
    });
  },
};
