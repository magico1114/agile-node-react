'use strict'

const routes = require('express').Router();
const panelController = require('./panel.controller');

routes.get('/', panelController.get);

module.exports = routes;