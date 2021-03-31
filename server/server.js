const express = require('express');
const fetch = require('node-fetch')
// const path = require('path');
// const cookieParser = require('cookie-parser');

//Controllers
const recipeController = require('./controllers/recipeController.js');
const ingredientController = require('./controllers/ingredientController.js');

const PORT = 3000;

const app = express();

// //Setup database
const mongoose = require('mongoose');
const uri = "mongodb+srv://sigfigs789:Fakepassword789@cluster0.cj7jm.mongodb.net/Foodchain?retryWrites=true&w=majority"
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});


const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
    console.log('Conntected To Mongo Database');
});

// Body parser
app.use(express.json());


// Initial Page Request
app.get('/', recipeController.getAllRecipes, (req, res) => {

  res.status(200).send(res.locals.recipes)
});

// Get recipe, check if amazon eligible
app.get('/getRecipeSearchAmazon', recipeController.getRecipe, ingredientController.ingredientSearch, (req, res) => {

  res.status(200).send({
    recipe: res.locals.recipe,
    ingredientsCheckList: res.locals.ingredientsCheckList
  });
})

// Post recipe
app.post('/newRecipe', recipeController.createRecipe, (req, res) => {
  res.status(200).send(res.locals.recipe)

});

// Update recipe 
app.put('/updateRecipe', recipeController.updateRecipe, (req, res) => {

  res.status(200).send('request complete');
});

// Delete Recipe
app.delete('/deleteRecipe', recipeController.deleteOne, (req, res) => {

  res.status(200).send('Delete successful');
})

// Global error handler

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send('Internal Server Error');
});


app.listen(PORT, ()=>{ console.log(`Listening on port ${PORT}...`); });

module.exports = app;