'use strict'

const httpCodes = require('http-status-codes');

exports.get = (req, res) => {
    const { body } = req;
    console.log(body);
    res.statusCode = httpCodes.OK;
    res.json({'response' : "ok"});   
};