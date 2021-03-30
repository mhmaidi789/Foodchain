const Recipe = require('../models/recipeModel.js');


//Declare recipeController
const recipeController = {};


//Get all recipes
recipeController.getAllRecipes = (req, res, next) => {

  Recipe.find({}, (err, recipes) => {
    if(err) return next({err});
    res.locals.recipes = recipes;
    return next();
  })


}



//Create a recipe
recipeController.createRecipe = (req, res, next) => {

  //Receive information from front-end
  const {recipeName, summary} = req.body;

  Recipe.create({recipeName, summary}, (err, recipe) =>{
    if(err) return next({err});
    res.locals.recipe = recipe;
    return next();
  })
}

module.exports = recipeController;