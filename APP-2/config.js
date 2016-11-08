'use strict';

const passport = require('passport'),
		logger = require('morgan'),
		express = require('express'),
		cors = require('cors'),
		Auth0Strategy = require('passport-auth0'),
		cookieParser = require('cookie-parser'),
		session = require('express-session'),
		bodyParser = require('body-parser'),
		swig = require('swig');

exports.template = function(app) {
	app.engine('html', swig.renderFile); // Python-Django like templating engine
	app.set('view engine', 'html');
	app.set('views', __dirname + '/views');
}

exports.log = function(app) {
	if (process.env.NODE_ENV === 'development') {
		app.use(express.logger('dev'));
	}
}

exports.static = function(app) {
	app.use('/public', express.static(__dirname + '/public'));
}

exports.parsers = function(app) {
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded());
	app.use(cookieParser());
}

exports.session = function(app) {
	app.use(session({
		secret: 'Narendra Modi Rocks!'
	}));
}

exports.passport = function(app) {
	let strategy = new Auth0Strategy({
		domain: process.env['AUTH0_DOMAIN'],
		clientID: process.env['AUTH0_CLIENT_ID'],
		clientSecret: process.env['AUTH0_CLIENT_SECRET'],
		callbackURL: process.env['AUTH0_CALLBACK_URL'] || 'http://localhost:3000/callback'
	}, function(accessToken, refreshToken, profile, done) {
		console.log(profile);
		return done(null, profile);
	});

	passport.use(strategy);

	passport.serializeUser(function(user, done) {
		done(null, user);
	});

	passport.deserializeUser(function(user, done) {
		done(null, user);
	});

	app.use(passport.initialize());
	app.use(passport.session());
}


