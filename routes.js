const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

let users = [];


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

module.exports = router;