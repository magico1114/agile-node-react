'use strict'

const process = require('process');

const { NODE_ENV } = process.env;

const isProduction = NODE_ENV === 'production';
const isDevelopment = !isProduction;
const mode = isProduction ? 'prod' : 'dev';

const env = {
    isProduction,
    isDevelopment,
    mode
  };

module.exports = env;