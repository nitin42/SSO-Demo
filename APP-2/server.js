'use strict';

const express = require('express'),
		dotenv = require('dotenv'),
		config = require('./config'),
		walker = require('node-sync-walker');

const app = express();
const port = process.env.PORT || 3000;

dotenv.load();

app.set('showStackError', true);

app.locals.pretty = true;

config.log(app);

config.template(app);

config.static(app);

config.parsers(app);

config.session(app);

config.passport(app);

walker.routeWalker(__dirname + '/routes', app);

app.listen(port, function() {
	console.log("Server is listening on port ", port);
});
