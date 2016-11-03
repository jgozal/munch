'use strict'

let models = require('../models/models.js');

// Models

let Ingredients = models.Ingredients;

//

let home = function (req, res) {
    res.render('home');
}

//

let sayHi = function (req, res) {
    res.send("<h3>Ready to Munch?</h3>");
};

//

let requestHandlers = {
    sayHi,
    home
}

module.exports = requestHandlers;