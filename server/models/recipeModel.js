const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const recipeSchema = new Schema({
  recipeName: {type: String, required: true},
  summary: {type: String},
  link: {type: String},
  ingredients: {type: Array, required: true},
});

module.exports = mongoose.model('Recipe', recipeSchema);
