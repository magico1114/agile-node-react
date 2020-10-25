'use strict'

const express = require('express');
const app = express();
const config = require('./config');
const routes = require('./routes');
const bodyParser = require('body-parser');
const baseRoute = express.Router();
const path = require('path');

app.use(bodyParser.json());

baseRoute.use(routes);

//Serve the CLIENT build on / 
app.use(express.static(path.join(__dirname, '../client/build')));
app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.use(config.baseURL, baseRoute);

module.exports = app;