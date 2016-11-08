'use strict';

const passport = require('passport');

// If the user is authenticated and the target url is not relative then redirect to the user profile
module.exports = function(app) {
	app.get('/sso', function(req, res, next) {
		if (req.isAuthenticated()) {
			if (/^http/.test(req.query.targetUrl)) {
				return res.send(400, 'Provide a relative path');
			}

			res.redirect('/user?targetUrl=' + req.query.targetUrl);
		} else {
			console.log('Authenticating with OAuth for SSO');
			passport.authenticate('auth0', {
				state: req.query.targetUrl,
				connection: 'github'
			})(req, res, next);
		}
	});
}