const express = require('express');
const router = express.Router();


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

router.post('/register', (req, res) => {
	res.redirect('/login');
});


// protected
router.get('/protected', (req, res) => {
	res.render('protected', { title: 'protected', name: 'keegan' });
});

module.exports = router;