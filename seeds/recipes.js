
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('recipes').del()
    .then(function () {
      // Inserts seed entries
      return knex('recipes').insert([
        { name: 'Brownies', image_url: 'https://img.taste.com.au/gOpVgvz8/taste/2016/11/classic-chewy-brownie-102727-1.jpeg' },
        { name: 'Carrot Soup', image_url: 'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.simplyrecipes.com%2Fwp-content%2Fuploads%2F2013%2F02%2Fcarrot-ginger-soup-horiz-b-1800.jpg&f=1&nofb=1' },
        { name: 'Aloo Pie', image_url: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2F1.bp.blogspot.com%2F-ZKvIORXHM_8%2FVs8t_KR9T6I%2FAAAAAAAAE1w%2FmuqlCacbIZM%2Fs1600%2FAloo-Pie-6.jpg&f=1&nofb=1' },
      ]);
    });
};
