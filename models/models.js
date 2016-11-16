'use strict'

let mongoose = require('mongoose');

// Create a Schema
let Ingredients = mongoose.Schema({
  name: String,
  price: Number,
  inStock: Boolean
});

let Orders = mongoose.Schema({
  name: String,
  ingredients: [String]
});


let models =  {
  Ingredients : mongoose.model("ingredients", Ingredients),
  Orders : mongoose.model("orders", Orders)
}

module.exports = models;