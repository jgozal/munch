'use strict'

let models = require('../models/models.js');

// Models

let Ingredient = models.Ingredients;
let Order = models.Orders;

// Lists all ingredients

let listIngredients = function (req, res) {
    let view;
    (req.originalUrl === '/ingredients') ? view = 'ingredients' : view = 'order';
    Ingredient
        .find()
        .exec(function (err, result) {
            res.render(view, { ingredients: result });
        })
};

// Adds new ingredient to the db

let inStockHandler = function (ingredientName) {
    return new Promise(function (resolve, reject) {
        Ingredient.find({ name: ingredientName }, function (error, result) {
            if (error) {
                reject(error);
                return;
            }
            resolve(result[0].inStock);
        })
    })
}


let updateHandler = function (prop, data, req, res, done) {
    Ingredient.update({ name: req.body.ingredientName }, {
        [prop]: data
    }, function (err, raw) {
        if (err) {
            console.log(err);
            res.send('/error');
        } else {
            console.log(raw);
            if (done) res.send('/ingredients');
        }
    })
}

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
    if (req.originalUrl === '/ingredients/edit') {
        // I do realize this won't scale very well'
        updateHandler('price', req.body.ingredientNewPrice, req, res, false);
        updateHandler('name', req.body.ingredientNewName, req, res, true);
    } else if (req.originalUrl === '/ingredients/disable') {
        inStockHandler(req.body.ingredientName).then(function (bool) { updateHandler('inStock', !bool, req, res, true) });
    }
}

let addNewOrder = function (req, res) {
    let newOrder = new Order({
        name: req.body.customerName,
        ingredients: JSON.parse(req.body.ingredientName)
    });

    newOrder.save(function (err, order) {
        if (err) return console.error(err);
        res.send('/order'); // route to load content
    });
}


// Lists all pending orders

let listOrders = function (req, res) {
    Order
        .find()
        .exec(function (err, result) {
            res.render('kitchen', { orders: result });
        })
};

// Deletes completed order

let completeOrder = function (req, res) {
    Order
        .find()
        .exec(function (err, result) {
            Order
                .remove(result[req.body.orderNumber])
                .exec(function (err, result) {
                    res.send('/kitchen'); // route to load content
                })
        })
};

let requestHandlers = {
    listIngredients,
    addNewIngredient,
    updateIngredient,
    addNewOrder,
    listOrders,
    completeOrder
}

module.exports = requestHandlers;