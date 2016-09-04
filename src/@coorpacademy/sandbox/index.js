import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import map from 'lodash/fp/map';
import config from './webpack.config';

import ssrMiddleware from './src/ssr';

const engines = [
  'Virtualdom',
  'React',
  'Snabbdom'
];

const app = express();

const compiler = webpack(config);
app.use(
  webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }),
  webpackHotMiddleware(compiler)
);

app.get('/angular', (req, res) => {
  res.send(`
    <body ng-app="app" ng-controller="main">
      <input ng-model="props.value"/>
      ${map(name => `
        <${name}-title props="props"></${name}-title>
      `, engines).join('')}
      <script type="text/javascript" src="/dist/angular.js"></script>
    </body>
  `);
});

app.use('/:engine', ssrMiddleware);

app.get('/', (req, res) => {
  res.send(`
    <h1>Sandbox</h1>
    <ul>
      ${map(name => `<li><a href="/${name}/">${name}</a></li>`, engines).join('')}
    </ul>
    <h2>Adapteur</h2>
    <ul>
      <li><a href="/angular">angular</a></li>
    </lu>
  `);
});

app.listen(3004);
