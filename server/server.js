const express = require('express');
const fetch = require('node-fetch')
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

// const db = mongoose.connection
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function callback () {
//     console.log('Conntected To Mongo Database');
// });

// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://sigfigs789:Fakepassword789@cluster0.cj7jm.mongodb.net/foodchain?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

//Body parser
app.use(express.json());

var axios = require("axios").default;

var options = {
  method: 'GET',
  url: 'https://amazon-price1.p.rapidapi.com/search',
  params: {keywords: 'Onion', marketplace: 'US'},
  headers: {
    'x-rapidapi-key': '',
    'x-rapidapi-host': ''
  }
};

axios.request(options).then(function (response) {
	console.log(response.data);
}).catch(function (error) {
  console.log('error')
	console.error(error);
});



//Initial Page Request
app.get('/', recipeController.getAllRecipes, (req, res) => {

  res.status(200).send(res.locals.recipes)
});

app.get('/amazonEligible', recipeController.getAllRecipes, recipeController.getAmazonIngredients, (req, res) => {

  res.status(200).send(rers.locals.recipes)
})

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