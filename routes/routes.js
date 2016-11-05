'use strict'

let express = require('express');
let rh = require('../routes/requestHandlers');
let router = express.Router();

router.get('/', rh.home);

router.get('/ingredients', rh.ingredients); // Shows list of ingredients (name & price) with Out-of-Stock, add, and edit buttons
router.post('/ingredients/add', rh.addNewIngredient); // Adds a new ingredient to the database and displays it
router.post('/ingredients/disable', rh.sayHi); // Assigns False boolean to inStock property of Ingredient in database and shows ingredient as out-of-stock on page
router.post('/ingredients/edit', rh.sayHi); // Updates name and price for the ingredient and reflects this change on the page

router.get('/order/', rh.sayHi); // Shows a form with a checklist of ingredients to submit orders
router.post('/order/make', rh.sayHi); // Creates and order

router.get('/kitchen', rh.sayHi); // Shows all pending orders
router.delete('/kitchen/complete', rh.sayHi); // Deletes order from pending orders


module.exports = router;


