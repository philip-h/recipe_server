const jwt = require('jsonwebtoken');

module.exports = {
  /**
  * Sends a status 500 error through std response
  *
  * @param {Object} res - A response object
  * @param {String} err - Error message;
  * @param {String} method - The method name where the error occurred;
  */
  sendInternalError: function(res, err, method) {
    res.status(500).send({
      error: `${method} internal error: ${err}`,
    });
  },

  /**
  * Sign a user object using JsonWebTokens
  *
  * @param {Object} user - A user object
  * @return {Object} A serialized user token
  */
  jwtSignUser: function(user) {
    const ONE_WEEK = 60*60*24*7;
    const secret = process.env.JWT_SECRET || 'secret';
    return jwt.sign(user, secret, {
      expiresIn: ONE_WEEK,
    });
  },

  /**
  *  Hash a password using bcrypt
  *
  * @param {String} password User's password
  * @return {String} Hashed password
  */
  hashPassword: async function(password) {
    const SALT_FACTOR = 8;
    const genSalt = await bcrypt.genSalt(SALT_FACTOR);
    const hash = await bcrypt.hash(password, genSalt);
    return hash;
  },

  /**
   * Verify that a user was signed with this server's JWT Token
   *
   * @param {Object} req - A request object
   * @param {Object} res - A response object
   * @return {Integer} user id
   */
  verifyUser: function(req, res) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    const secret = process.env.JWT_SECRET || 'secret';

    if (token === null) return res.status(401).send();

    let decodedUser;
    try {
      decodedUser = jwt.verify(token, secret);
    } catch (e) {
      res.status(401).send('Unauthorized');
    }

    return decodedUser ? decodedUser.id : null;
  },
};
