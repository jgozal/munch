'use strict'

let models = require('../models/models.js');

// Models

let Ingredient = models.Ingredients;
let Order = models.Orders;

// Lists all ingredients

let listIngredients = function (req, res) {
    Ingredient
        .find()
        .exec(function (err, result) {
            res.render("ingredients", { ingredients: result });
        })
};

// Adds new ingredient to the db

let addNewIngredient = function (req, res) {
    let newIngredient = new Ingredient({
        name: req.body.ingredientName,
        price: req.body.ingredientPrice,
        inStock: true
    });

    Ingredient.find({ name: req.body.ingredientName }, function (err, docs) {
        if (docs.length) {
            console.log(req.body.ingredientName + ' already exists.');
            res.send('/ingredients');
        } else {
            newIngredient.save(function (err, ingredient) {
                if (err) return console.error(err);
                res.send('/ingredients'); // route to load content
            });
        }
    });
};

let updateIngredient = function (req, res) {
    let prop, data;
    if(req.originalUrl === '/ingredients/edit') {
        prop = 'price'; 
        data = req.body.ingredientPrice;
    } else if(req.originalUrl === '/ingredients/disable'){
        prop = 'inStock';
        data =  !(Ingredient.find({name: req.body.ingredientName}, 'inStock')._fields.inStock);
    }
    Ingredient.update({ name: req.body.ingredientName }, {
        [prop]: data
    }, function (err, raw) {
        if(err){ 
            console.log(err);
            res.send('/ingredients');
        }else{
            console.log(raw);
            res.send('/ingredients');
        }
    })
}


let voidFun = function (req, res) {
    return
}

//

let requestHandlers = {
    listIngredients,
    addNewIngredient,
    updateIngredient,
    voidFun
}

module.exports = requestHandlers;