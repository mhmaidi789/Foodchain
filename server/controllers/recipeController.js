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

//Get specific recipes
recipeController.getRecipe = (req, res, next) => {

  const {recipeName} = req.body;

  Recipe.find({recipeName}, (err, recipe) => {
    if(err) return next({err});
    res.locals.recipe = recipe[0];
    return next();
  })
}



//Create a recipe
recipeController.createRecipe = (req, res, next) => {

  //Receive information from front-end
  const {recipeName, summary, link, ingredients} = req.body;

  Recipe.create({recipeName, summary, link, ingredients}, (err, recipe) =>{
    if(err) return next({err});
    res.locals.recipe = recipe;
    return next();
  })
}



module.exports = recipeController;