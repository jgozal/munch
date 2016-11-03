'use strict'

let express = require('express');
let rh = require('../routes/requestHandlers');
let router = express.Router();

router.get('/', rh.home);
router.get('/ingredients', rh.sayHi);

module.exports = router;


