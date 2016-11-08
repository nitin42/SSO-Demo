'use strict';

const passport = require('passport');

// After authenticating from auth0 and coming from the callback
module.exports = function(app) {
	app.get('/callback', passport.authenticate('auth0'), function(req, res) {
		if (req.query.state) {
			res.redirect('/user?targetUrl=' + req.query.state);
		} else {
			res.redirect('/user');
		}
	});
}
