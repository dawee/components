const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const defaultConfig = require('@coorpacademy/components/webpack.config.default.js');
const styleConfig = require('@coorpacademy/components/webpack.config.style.js');
const pkg = require('./package');

const backofficeCSSLoader = styleConfig.module.loaders[0];

const NODE_ENV = process.env.NODE_ENV || 'development';

const jsLoader = {
  test: /\.js$/,
  loader: 'babel',
  query: {
    babelrc: false,
    extends: path.join(__dirname, './.babelrc'),
    presets: [['es2015', {modules: false}]]
  },
  include: [
    path.join(__dirname, 'src'),
    path.join(__dirname, '.node_modules/@coorpacademy/components')
  ]
};

const cssLoader = Object.assign(backofficeCSSLoader, {
  include: [
    path.join(__dirname, 'src')
  ].concat(backofficeCSSLoader.include)
});

const loaders = [
  jsLoader,
  cssLoader
];

const plugins = [];

if (NODE_ENV === 'production')
  plugins.push(
    new webpack.BannerPlugin([pkg.name, pkg.version].join('@'))
  );
else
  plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  );

if (NODE_ENV === 'production') {
  const backofficeCSS = styleConfig.plugins[0];
  backofficeCSS.filename = 'backoffice.css';
  plugins.unshift(backofficeCSS);
}

const backofficeConfig = {
  context: __dirname,

  entry: {
    backoffice: [
      'babel-polyfill',
      path.join(__dirname, 'src/app/bundle')
    ]
  },

  output: {
    library: 'backoffice',
    path: path.join(__dirname, 'public')
  },

  plugins,
  module: {
    loaders
  }
};

module.exports = merge.smart(
  backofficeConfig,
  defaultConfig
);
