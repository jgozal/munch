'use strict'

let express = require('express');
let path = require('path');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let exphbs = require('express-handlebars');
let mongoose = require('mongoose');

let routes = require('./routes/routes');

let app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.engine('.hbs', exphbs({
	extname: '.hbs',
	defaultLayout: 'main'
}));
app.set('view engine', '.hbs');

let port = process.env.PORT || 8080; 

app.use('/', routes);
mongoose.connect('mongodb://localhost/ingredients');

app.listen(port);
console.log('Server listening on port ' + port)
