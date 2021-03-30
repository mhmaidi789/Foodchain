const express = require('express');
// const path = require('path');
// const cookieParser = require('cookie-parser');

//Controllers
const recipeController = require('./controllers/recipeController.js');

const PORT = 3000;

const app = express();

// //Setup database
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true, useUnifiedTopology: true});
// const mongoURI = process.env.NODE_ENV === 'test' ? 'mongodb://localhost/foodchaintest' : 'mongodb://localhost/foodchaindev';
// mongoose.connect(mongoURI);


//Body parser
app.use(express.json());



//Initial Page Request
app.get('/', recipeController.getAllRecipes, (req, res) => {

  res.status(200).send(res.locals.recipes)
});

app.post('/newRecipe', recipeController.createRecipe, (req, res) => {
  res.status(200).send(res.locals.recipe)

})


//Global error handler

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send('Internal Server Error');
});


app.listen(PORT, ()=>{ console.log(`Listening on port ${PORT}...`); });

module.exports = app;