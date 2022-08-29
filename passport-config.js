const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');


function initializePassport(passport, getUserByEmail) {
	const authenticateUser = async (email, password, done) => {
		const user = getUserByEmail(email);

		if (user == null) {
			return done(null, false, { message: 'no user with that email was found.' });
		}

		try {
			if (await bcrypt.compare(password, '' + user.password)) {
				return done(null, user);
			}
			else {
				return done(null, false, { message: 'password is incorrect.' });
			}
		}
		catch(e) {
			return done(e);
		}
	}

	passport.use(new LocalStrategy({ usernameField: 'email'	}, authenticateUser));
	
	passport.serializeUser((user, done) => {

	});

	passport.deserializeUser((id, done) => {

	});
}

module.exports = initializePassport;