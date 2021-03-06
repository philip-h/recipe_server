const AuthenticationController =
  require('./controllers/AuthenticationController');
const RecipeController = require('./controllers/RecipeController');
const IngredientController = require('./controllers/IngredientController');
const FavouriteController = require('./controllers/FavouriteController');

module.exports = (app) => {
  app.post('/register',
      AuthenticationController.register);

  app.post('/login',
      AuthenticationController.login);

  app.get('/recipes',
      RecipeController.index);

  app.post('/myrecipes',
      RecipeController.indexByUsername);

  app.get('/recipes/:id',
      RecipeController.show);

  app.post('/recipes',
      RecipeController.post);

  app.put('/recipes/:id',
      RecipeController.put);

  app.delete('/recipes/:id',
      RecipeController.delete);

  app.get('/ingredients',
      IngredientController.index);

  app.get('/favourites',
      FavouriteController.index);

  app.get('/favourites/:recipe_id',
      FavouriteController.show);

  app.post('/favourites/:recipe_id',
      FavouriteController.post);

  app.delete('/favourites/:recipe_id',
      FavouriteController.delete);
};
