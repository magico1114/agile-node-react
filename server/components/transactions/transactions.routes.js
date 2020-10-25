'use strict'

const routes = require('express').Router();
const transactionController = require('./transactions.controller');

routes.get('/',  transactionController.getAll);
routes.get('/:id', transactionController.get);
routes.post('/', transactionController.add);

module.exports = routes;