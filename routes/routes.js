'use strict'

let express = require('express');
let rh = require('../routes/requestHandlers');
let router = express.Router();

router.get('/', rh.home);
router.get('/ingredients', rh.sayHi);
router.post('/ingredients/add', rh.sayHi);
router.post('/ingredients/disable', rh.sayHi);
router.post('/ingredients/edit', rh.sayHi);
router.get('/order/', rh.sayHi);
router.post('/order/make', rh.sayHi);
router.get('/kitchen', rh.sayHi);
router.delete('/kitchen/complete', rh.sayHi);


module.exports = router;


