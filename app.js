const express = require('express');
const hbs = require('express-handlebars');
const routes = require('./routes');

const app = express();
const port = 4000;

app.engine('hbs', hbs.engine({
	extname: 'hbs',
	layoutsDir: __dirname + '/views/layouts'
}));
app.set('view engine', 'hbs');
app.set('views', './views');

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/', routes);

app.listen(port, () => {
	console.log(`listening on port ${port}...`);
});