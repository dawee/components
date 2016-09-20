const winston = require('winston');
const winstonLogmatic = require('winston-logmatic');
const _ = require('lodash'); // eslint-disable-line lodash-fp/use-fp
const config = require('./config');

const addTransportErrorHandler = tr => {
  if (!_.isFunction(tr.on)) return tr;
  tr.on('error', _.once(err => console.error('logger error', err.stack))); // eslint-disable-line no-console
  return tr;
};

const getTransport = env => {
  return addTransportErrorHandler(
    env.indexOf('dev') === 0 ?
    new winston.transports.Console({colorize: true, timestamp: false}) :
    new winstonLogmatic({
      logmatic: {
        token: config.logmatic.token,
        defaultProps: {
          brand: 'up',
          apptype: config.logmatic.name,
          platform: env,
          dyno: process.env.DYNO ||
          process.env.DOCKERCLOUD_CONTAINER_HOSTNAME || 'localhost',
          cluster: process.env.CLUSTER_NAME ||
          process.env.DOCKERCLOUD_NODE_FQDN || 'localhost'
        }
      }
    })
  );
};

const mkOpt = () => {
  return {
    timestamp: true,
    level: config.log.level,
    transports: [getTransport(config.env || process.env.NODE_ENV)]
  };
};

const createLogger = opt => {
  return new (winston.Logger)(opt);
};

/** logger instance */
const logger = createLogger(mkOpt());

/** simple winston transport for morgan */
const morganTransport = cli => {
  return {
    write: (...argz) => {
      cli.info.apply(this, argz);
    }
  };
};

module.exports = {
  transport: _.partial(morganTransport, logger),
  create: createLogger,
  instance: logger,
  middleware: (req, res, next) => {
    req.logger = logger;
    next();
  }
};
