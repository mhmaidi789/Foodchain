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

  const {_id} = req.query;

  Recipe.find({_id}, (err, recipe) => {
    if(err) return next({err});
    res.locals.recipe = recipe[0];
    return next();
  })
}


//Create a recipe
recipeController.createRecipe = (req, res, next) => {

  //Receive information from front-end
  const {recipeName, notes, link, ingredients, imageURL} = req.body;

  Recipe.create({recipeName, notes, link, ingredients, imageURL}, (err, recipe) =>{
    if(err) return next({err});
    res.locals.recipe = recipe;
    return next();
  })
}

//Update recipe 
recipeController.updateRecipe = (req, res, next) => {

  const {originalRecipeName, newRecipeName, notes, link, ingredients} = req.body;

  Recipe.updateOne({recipeName: originalRecipeName}, {recipeName: newRecipeName, notes, link, ingredients},  (err, output) => {
    if(err) return next({err});
    res.locals.output = output[0];
    return next();
  });
}

//Delete recipes by id
recipeController.deleteOne = (req, res, next) => {

  // console.log('req body in delete', req.body)

  const {_id} = req.body;

  // Recipe.find({_id}, (err, response) => {
  //   if (err) next({err})
  //   res.locals.response = response[0]
  //   next()
  // })

  Recipe.deleteOne({_id}, (err) => {
    if (err) return next({err});
    return next();
  })


}



module.exports = recipeController;