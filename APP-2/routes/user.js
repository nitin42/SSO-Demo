'use strict';
const login = require('./middlewares/login');

// shows user profile
module.exports = function(app) {
 	app.get('/user', login.required, function(req, res) {
 		res.render({
 			user: req.user,
 			url: req.query.targetUrl
 		});
 	});
 }