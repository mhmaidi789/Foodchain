const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ingredientSchema = new Schema({
  searchTerm: {type: String, required: true},
  title: {type: String},
  price: {type: String},
  detailPageURL: {type: String},
  isPrimeEligible: {type: String},
  imageURL: {type: String},
});

module.exports = mongoose.model('Ingredient', ingredientSchema);
