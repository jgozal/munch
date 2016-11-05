'use strict'

let models = require('../models/models.js');

// Models

let Ingredient = models.Ingredients;
let Order = models.Orders;

//

let home = function (req, res) {
    res.render('home');
}

//

let sayHi = function (req, res) {
    res.send("<h3>Ready to Munch?</h3>");
};

//

let ingredients = function (req, res) {
    res.render("ingredients");
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

//

let requestHandlers = {
    sayHi,
    home,
    ingredients,
    addNewIngredient
}

module.exports = requestHandlers;