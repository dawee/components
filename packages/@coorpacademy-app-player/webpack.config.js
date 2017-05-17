const path = require('path');
const pipe = require('lodash/fp/pipe');
const set = require('lodash/fp/set');
const update = require('lodash/fp/update');
const config = require('@coorpacademy/webpack-config');
const {RootMostResolvePlugin} = require('webpack-dependency-suite');

const entry = {
  player: ['babel-polyfill', './src'],
  scenarios: './src/scenarios'
};

const output = {
  library: ['Player', '[name]'],
  path: path.resolve(__dirname, 'dist'),
  publicPath: '/dist',
  filename: '[name].js',
  libraryTarget: 'umd'
};

module.exports = pipe(
  set('entry', entry),
  set('output', output),
  update('plugins', plugins => [new RootMostResolvePlugin(__dirname, true), ...plugins]),
  set('resolve.modules', [path.join(__dirname, 'node_modules'), 'node_modules'])
)(config);
