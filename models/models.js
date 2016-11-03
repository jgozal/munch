let mongoose = require('mongoose');

// Create a Schema
let Ingredients = mongoose.Schema({
  name: String
});


let models =  {
  Ingredients : mongoose.model("ingredients", Ingredients)
}

module.exports = models;