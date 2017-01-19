const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const BabiliPlugin = require('babili-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const CSSWrapper = require('@coorpacademy/css-wrapper-webpack-plugin');

const hash = '[folder]__[local]';
const componentCSS = new ExtractTextPlugin('bundle.css');

const NODE_ENV = process.env.NODE_ENV || 'development';

const config = cssScope => ({
  devtool: NODE_ENV === 'production' ? false : 'eval',

  stats: {
    children: false
  },

  output: {
    library: 'Coorponents',
    filename: '[name].js',
    path: path.join(__dirname, 'dist')
  },

  module: {
    loaders: [{
      test: /\.json$/,
      loader: 'json-loader'
    }, {
      test: /\.(ttf|otf|eot|svg|woff)$/,
      loader: 'file-loader'
    }, {
      test: /\.css$/,
      loader: NODE_ENV === 'production' ? componentCSS.extract({
        fallbackLoader: 'style-loader',
        loader: `css-loader?minimize&modules&importLoaders=1&localIdentName=${hash}!postcss-loader`
      }) : `style-loader!css-loader?minimize&modules&importLoaders=1&localIdentName=${hash}!postcss-loader`
    }]
  },

  plugins: (() => {
    const plugins = [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(NODE_ENV)
        }
      })
    ];

    if (NODE_ENV === 'production')
      plugins.push(
        new CompressionPlugin({
          asset: '[path].gz',
          algorithm: 'gzip',
          regExp: /\.js$|\.css$/,
          threshold: 10240,
          minRatio: 0.8
        }),
        new webpack.LoaderOptionsPlugin({
          options: {
            postcss: {
              plugins: [autoprefixer({
                browsers: ['last 2 versions']
              })]
            },
            context: __dirname
          },
          minimize: true,
          debug: false
        }),
        // new BabiliPlugin({
        //   comments: false,
        //   sourceMap: false
        // }),
        componentCSS
      );

    if (cssScope) {
      plugins.push(
        new CSSWrapper('bundle.css', cssScope)
      );
    }

    return plugins;
  })()
});

module.exports = config;
