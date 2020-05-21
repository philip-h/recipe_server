const RecipeController = require('./controllers/RecipeController')
const FavouriteController = require('./controllers/FavouriteController')

module.exports = (app) => {
  app.get('/recipes',
    RecipeController.index)
  
  app.get('/recipes/:id',
    RecipeController.show)

  app.post('/recipes',
    RecipeController.post)

  app.put('/recipes/:id',
    RecipeController.put)


  app.get('/favourites',
    FavouriteController.index)

  app.get('/favourites/:recipe_id',
    FavouriteController.show)

  app.post('/favourites/:recipe_id',
    FavouriteController.post)

  app.delete('/favourites/:recipe_id',
    FavouriteController.delete)
}
