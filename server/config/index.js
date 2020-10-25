'use strict'

const env = require('../env');
const baseConfig = require('./base');
const devConfig = require('./devConfig');
const prodConfig = require('./prodConfig');

const development={
  ...baseConfig,
  ...devConfig,
};

const production={
  ...baseConfig,
  ...prodConfig,
};

const config = env.isProduction ? production : development; 

module.exports = config;