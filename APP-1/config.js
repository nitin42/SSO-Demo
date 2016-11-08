'use strict';

const logger = require('morgan'), 
		express = require('express');

exports.template = function(app) {
	app.set('views', __dirname + '/views');
	app.engine('html', require('ejs').renderFile);	
	app.set('view engine', 'ejs');
}

exports.log = function(app) {
	if (process.env.NODE_ENV === 'development') {
		app.use(express.logger('dev'));
	}
}

exports.static = function(app) {
	app.use('/public', express.static(__dirname + '/public'));
}
