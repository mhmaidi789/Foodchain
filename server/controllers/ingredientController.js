const Ingredient = require('../models/ingredientsModel.js');


//Declare recipeController
const ingredientController = {};


//Check if ingredients in recipe are in database. If not, search for them on amazon. Pass object that contains 
//information on found a missing ingredients 
ingredientController.ingredientSearch = (req, res, next) => {

  //Declare empty object ingredientCheckList to store available ingredients
  const ingredientCheckList = {};

  //Iterate through each ingredient found in res.locals.recipe
  const recipe = res.locals.recipe;
  const ingredients = recipe.ingredients.split(',');
  ingredients.forEach( (item, index) => {

    //Check database for ingredient and update ingredientCheckList
    Ingredient.find({searchTerm: item}, (err, itemIngredient)=>{

      if(err) {
        console.log('error in ingredient.find');
        return next({err});
      }
 
      if(itemIngredient.length >= 1){
        ingredientCheckList[item] = itemIngredient;
        if(index >= ingredients.length-1){
          res.locals.ingredientsCheckList = ingredientCheckList;
          return next()
        }
      }else {
        //Check amazon for ingredient and update ingredientCheckList and create new ingredient in database
        console.log('axios')
        var axios = require("axios").default;

        var options = {
          method: 'GET',
          url: 'https://amazon-price1.p.rapidapi.com/search',
          params: {keywords: item, marketplace: 'US'},
          headers: {
            'x-rapidapi-key': '25bc85f706msh5e563f0c5f0fbcap107099jsn79c93516580e',
            'x-rapidapi-host': 'amazon-price1.p.rapidapi.com'
          }
        };

        axios.request(options)
        .then((response) => {
          if(response.data.length>0){
            //Update checklist
            ingredientCheckList[item] = response.data[1];
            //Create ingredient in database
            createIngredient(item, response.data[1]);
          }else{
            ingredientCheckList[item] = 'N/A'
          }
          if(index >= ingredients.length-1){
            res.locals.ingredientsCheckList = ingredientCheckList;
            return next()
          }
        })
        .catch(function (error) {
          console.log('error in axios')
          next(error);
        });
      }
    });
  })
}

//Create an ingredient
function createIngredient(searchTerm, amazonResult) {
  //Receive information from front-end
  const {title, price, detailPageURL, isPrimeEligible, imageURL} = amazonResult;

  Ingredient.create({searchTerm, title, price, detailPageURL, isPrimeEligible, imageURL}, (err, recipe) =>{
    console.log('creating ' + searchTerm);
    if(err) return next({err});
  })
}



module.exports = ingredientController;