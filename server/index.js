'use strict'

const app = require('./app');
const config = require('./config');
const env = require('./env');

if (env.isDevelopment){
  console.log("--- env ---");
  console.log(env);
  console.log("-----------");
  console.log(config);
}

let port = config.port;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;