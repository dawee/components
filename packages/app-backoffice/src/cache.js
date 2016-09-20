const cacheme = require('cacheme');

module.exports = config =>
  cacheme(config.cache);
