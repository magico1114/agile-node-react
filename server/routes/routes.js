'use strict'

const routes = require('express').Router();

routes.use("/transactions", require("../components/transactions/transactions.routes"));
routes.use("/", require("../components/panel/panel.routes"));

module.exports = routes;