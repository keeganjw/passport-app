// import required modules and files
const express = require('express');
const hbs = require('express-handlebars');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const LocalStrategy = require('passport-local');
const auth = require('./auth');

if(process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}

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
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy({
	usernameField: 'email',
	passwordField: 'password',
	session: true
}, auth.authenticateUser));

passport.serializeUser((user, done) => {
	done(null, user);
});

passport.deserializeUser((user, done) => {
	done(null, user);
});

// index
app.get('/', (req, res) => {
	res.render('index', { title: 'home' });
});

// login
app.get('/login', auth.allowIfNotAuthenticated, (req, res) => {
	res.render('login', { title: 'login' });
});

app.post('/login', auth.allowIfNotAuthenticated, passport.authenticate('local', {
	successRedirect: '/protected',
	failureRedirect: '/login',
	failureFlash: true
}));

// register
app.get('/register', auth.allowIfNotAuthenticated, (req, res) => {
	res.render('register', { title: 'register' });
});

app.post('/register', auth.allowIfNotAuthenticated, async (req, res) => {
	try {
		await auth.addUser({
			name: req.body.name,
			email: req.body.email,
			password: req.body.password
		});

		res.redirect('/login');
	}
	catch {
		res.redirect('/register');
	}
});

// protected
app.get('/protected', auth.allowIfAuthenticated, (req, res) => {
	res.render('protected', { title: 'protected', name: req.user.name });
});

app.get('/logout', auth.allowIfAuthenticated, (req, res, next) => {
	req.logout((error) => {
		if(error) {
			return next(error);
		}

		res.redirect('/');
	});	
});

// listen for http requests
app.listen(port, () => {
	console.log(`listening on port ${port}...`);
});