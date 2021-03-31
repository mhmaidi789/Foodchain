const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const recipeSchema = new Schema({
  recipeName: {type: String, required: true},
  notes: {type: String},
  cookTime: {type: String},
  link: {type: String},
  ingredients: {type: String, required: true},
});

module.exports = mongoose.model('Recipe', recipeSchema);
