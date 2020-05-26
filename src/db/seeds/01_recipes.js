
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('recipes').del()
      .then(function() {
      // Inserts seed entries
        return knex('recipes').insert([
          {
            name: 'Brownies',
            image_url: 'https://cdn.pixabay.com/photo/2016/03/04/03/42/fudge-brownies-1235430_960_720.jpg',
          },
          {
            name: 'Chocolate Chip Cookies',
            image_url: 'https://upload.wikimedia.org/wikipedia/commons/b/b9/Chocolate_Chip_Cookies_-_kimberlykv.jpg',
          },
        ]);
      });
};
