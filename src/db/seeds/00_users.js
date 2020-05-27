
exports.seed = function(knex) {
  return knex('users').del()
      .then(function() {
        return knex('users').insert([
          {username: 'philiph', password: 'password'},
        ]);
      });
};
