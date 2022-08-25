// import required modules and files
const express = require('express');
const hbs = require('express-handlebars');
const bcrypt = require('bcrypt');
const passport = require('passport');
const session = require('express-session');
const flash = require('express-flash');
const initializePassport = require('./passport-config');
let users = [];

initializePassport(
	passport,
	(email) => users.find(user => user.email === email)
);

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
app.use(flash());
app.use(session({
	secret: process.env.SESSION_SECRET
}));

// set routes imported from routes.js
app.use('/', routes);

// index
router.get('/', (req, res) => {
	res.render('index', { title: 'home' });
});

// login
router.get('/login', (req, res) => {
	res.render('login', { title: 'login' });
});

router.post('/login', (req, res) => {
	res.redirect('/protected');
});

// register
router.get('/register', (req, res) => {
	res.render('register', { title: 'register' });
});

router.post('/register', async (req, res) => {
	try {
		const hashedPassword = bcrypt.hash(req.body.password, 10);
		users.push({
			id: Date.now.toString(),
			name: req.body.name,
			email: req.body.email,
			password: hashedPassword
		});

		res.redirect('/login');
	}
	catch {
		res.redirect('/register');
	}
});

// protected
router.get('/protected', (req, res) => {
	res.render('protected', { title: 'protected', name: 'keegan' });
});

// listen for http requests
app.listen(port, () => {
	console.log(`listening on port ${port}...`);
});