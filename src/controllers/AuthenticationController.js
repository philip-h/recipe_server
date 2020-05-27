const knex = require('../db/knex');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

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

/**
 * Sign a user object using JsonWebTokens
 *
 * @param {Object} user - A user object
 * @return {Object} A serialized user token
 */
function jwtSignUser(user) {
  const ONE_WEEK = 60*60*24*7;
  const secret = process.env.JWT_SECRET || 'secret';
  return jwt.sign(user, secret, {
    expiresIn: ONE_WEEK,
  });
}

/**
 *  Hash a password using bcrypt
 *
 * @param {String} password User's password
 * @return {String} Hashed password
 */
async function hashPassword(password) {
  const SALT_FACTOR = 8;
  const genSalt = await bcrypt.genSalt(SALT_FACTOR);
  const hash = await bcrypt.hash(password, genSalt);
  return hash;
}

module.exports = {
  async register(req, res) {
    const {username, password} = req.body;

    const hashedPassword = await hashPassword(password);
    const userId = await
    knex('users')
        .insert({
          username,
          password: hashedPassword,
        })
        .catch((err) => sendInternalError(res, err, 'Authentication.register'));

    res.send(userId);
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
      return res.status(403).send({
        error: 'Login information was incorect',
      });
    }

    if (!bcrypt.compare(password, user.password)) {
      return res.status(403).send({
        error: 'Login information was incorrect',
      });
    }

    res.send({
      user,
      token: jwtSignUser(user),
    });
  },
};
