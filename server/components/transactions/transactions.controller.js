'use strict'

const transactionsModel = require('./transactions.model');
const httpCodes = require('http-status-codes');

exports.add = (req, res) => {
    const { body } = req;
    // TODO: Data must be validated!
    // Really basic posted control -> Improve secure controls to PROD env.  
    if (!body || typeof(body.type) === "undefined" || typeof(body.amount) === "undefined" || body.amount <= 0) {
        res.statusCode = httpCodes.BAD_REQUEST;
        res.json({error : "invalid json data"});
    }
    else {
        transactionsModel.add(body)
            .then((result) => {
                res.statusCode = httpCodes.CREATED;
                res.json({id: result.id});
            });
    }
};

exports.get = (req, res) => {
    // TODO: Data must be validated!
    const { id } = req.params;
    transactionsModel.get(id)
        .then((result) => {
            if (result)
                res.statusCode = httpCodes.OK;
            else 
                res.statusCode = httpCodes.NOT_FOUND;
            res.json(result);
        })
        .catch((err)=>{
            console.log(err);
            res.statusCode = httpCodes.SERVICE_UNAVAILABLE;
            res.json({error: "DB Error"});
        });
};

exports.getAll = (req, res) => {
    // TODO: Data must be validated!
    transactionsModel.getAll()
        .then((result) => {
            res.statusCode = httpCodes.OK;
            res.json(result);
        })
        .catch((err)=>{
            console.log(err)
            res.statusCode = httpCodes.NOT_FOUND;
            res.json({error : "Transactions DB Busy"});
        });
};