'use strict'

let models = require('../models/models.js');

// Models

let Ingredient = models.Ingredients;
let Order = models.Orders;

//

let ingredients = function (req, res) {
    Ingredient
        .find()
        .exec(function (err, result) {
            res.render("ingredients", { ingredients: result });
        })
};

//

let addNewIngredient = function (req, res) {
    let newIngredient = new Ingredient({
        name: req.body.ingredientName,
        price: req.body.ingredientPrice,
        inStock: true
    });

    newIngredient.save(function (err, ingredient) {
        if (err) return console.error(err);
        res.send(ingredient)
    });
};

let voidFun = function (req, res) {
    return
}

//

let requestHandlers = {
    ingredients,
    addNewIngredient,
    voidFun
}

module.exports = requestHandlers;