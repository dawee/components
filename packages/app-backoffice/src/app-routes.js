const url = require('url');
const {join} = require('path');
const querystring = require('querystring');
const express = require('express');

const serveStatic = (folder = 'public') => express.static(folder);

const setBaseUrl = function(req, res, next) {
  res.locals = res.locals || {};
  const urlParsed = url.parse(req.url);
  const parsedQs = querystring.parse(urlParsed.query);
  let lang = 'fr';
  if (parsedQs.lang) {
    lang = parsedQs.lang;
  }
  const baseUrlWithoutQs = `${req.protocol}://${req.get('host')}${urlParsed.pathname}`;
  parsedQs.lang = 'en';
  const searchEn = querystring.stringify(parsedQs);
  const baseUrlEn = `${baseUrlWithoutQs}?${searchEn}`;
  delete parsedQs.lang;
  const searchFr = querystring.stringify(parsedQs);
  const baseUrlFR = searchFr === '' ? baseUrlWithoutQs : `${baseUrlWithoutQs}?${searchFr}`;
  res.locals.baseUrlFr = baseUrlFR;
  res.locals.baseUrlEn = baseUrlEn;
  res.locals.lang = lang;
  next();
};

module.exports = function(app) {
  return app
    .use(serveStatic(join(__dirname, '../public')))
    .use(serveStatic(join(__dirname, '../dist')))
    .use(setBaseUrl)
    .use('/assets/catalog', serveStatic(
      join(__dirname, '../node_modules/@coorpacademy/app-catalog/dist'))
    )
    .get('/', (req, res, next) => res.render('index'));
};
