const RecipeController = require('./controllers/RecipeController')

module.exports = (app) => {
  app.get('/recipes',
    RecipeController.index)
  
  app.get('/recipes/:id',
    RecipeController.show)

  app.post('/recipes',
    RecipeController.post)
}
