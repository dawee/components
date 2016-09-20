import {applyMiddleware, compose} from 'redux';
import {apiMiddleware} from 'redux-api-middleware';

export default options => {
  const middlewares = [
    apiMiddleware
  ];

  return compose(
    applyMiddleware(...middlewares),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  );
};
