// import required modules and files
const express = require('express');
const hbs = require('express-handlebars');
const routes = require('./routes');

// set app constants
const app = express();
const port = 4000;

// set view engine to handlebars (hbs)
app.engine('hbs', hbs.engine({
	extname: 'hbs',
	layoutsDir: __dirname + '/views/layouts'
}));
app.set('view engine', 'hbs');
app.set('views', './views');

// configure middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// set routes imported from routes.js
app.use('/', routes);

// listen for http requests
app.listen(port, () => {
	console.log(`listening on port ${port}...`);
});