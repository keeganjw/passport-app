const bcrypt = require('bcrypt');

let users = [];

async function addUser(newUser) {
	const hashedPassword = await bcrypt.hash(newUser.password, 10);

	users.push({
		id: Date.now().toString(),
		name: newUser.name,
		email: newUser.email,
		password: hashedPassword
	});
}

async function authenticateUser(email, password, done) {
	// search for user in user array
	const user = users.find((user) => user.email === email);

	// if user doesn't exist, return error message
	if (!user) {
		return done(null, false, 'email not found');
	}
	else {
		// check if passwords match
		const passwordsMatch = await bcrypt.compare(password, user.password);

		// if passwords match, authenticate user
		if (passwordsMatch) {
			return done(null, user);
		}
		// if password doesn't match, return error message
		else {
			return done(null, false, 'password incorrect');
		}
	}
}

function allowIfAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	else {
		res.redirect('/login');
	}
}

function allowIfNotAuthenticated(req, res, next) {
	if (!req.isAuthenticated()) {
		return next();
	}
	else {
		res.redirect('/protected');
	}
}

module.exports = {
	addUser,
	authenticateUser,
	allowIfAuthenticated,
	allowIfNotAuthenticated
}