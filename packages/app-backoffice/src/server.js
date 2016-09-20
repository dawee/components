const path = require('path');
const adaro = require('adaro');
const morgan = require('morgan');
const express = require('express');
const bodyParser = require('body-parser');
const cache = require('./cache');
const logger = require('./logger');
const addAppRoutes = require('./app-routes');

const boom = () => {
  throw new Error('boom');
};

const accessLog = (format = 'combined', output = process.stdout) =>
  morgan(format, {stream: output});

const notFoundHandler = (req, res) =>
  res.status(404).render('404');

const err500Handler = (err, req, res, next) => {
  console.error(err.stack); // eslint-disable-line no-console
  res.append('X-coorpacademy-err', err.message);
  if (req.xhr) {
    return res.status(500).send({
      success: false,
      err: err.message
    });
  }
  res.status(500).render('500', { err });
};

const addCoreSettings = app => {
  const dustEngineOptions = {};

  return app
    .enable('trust proxy')
    .engine('dust', adaro.dust(dustEngineOptions))
    .set('view engine', 'dust')
    .set('views', path.resolve(__dirname, './', 'views'))
    .set('x-powered-by', false);
};

const addCoreMiddleware = config => app => {
  return app.use(accessLog('combined', logger.transport()))
    .use(bodyParser.urlencoded({ extended: false }))
    .use(bodyParser.json())
    .use(cache(config))
    .use(logger.middleware); /** adds a winston req.logger */
};

const addFinalMiddleware = app => {
  return app.get('/boom', boom)
    .use(err500Handler)
    .use(notFoundHandler);
};

module.exports = config => {
  const app = express();

  app.logger = logger.instance;
  app.locals = config;

  addCoreSettings(app);
  addCoreMiddleware(config)(app);
  addAppRoutes(app);
  addFinalMiddleware(app);

  return app;
};
