import {createStore} from 'redux';
import {render} from '@coorpacademy/components/src/@treantjs/engine-virtual-dom';
import * as treant from '@coorpacademy/components/src/@treantjs/core';
import {connectHistory, navigate} from '@coorpacademy/components/src/@coorpacademy/redux-tools/redux-history';
import {Observable} from 'rxjs';
import {createHistory} from 'history';
import identity from 'lodash/fp/identity';
import {connectTransifex} from './modules/redux-transifex';
import createView from './views';
import createReducer from './reducers';
import createMiddleware from './middleware';

const {h} = treant;

const createRenderer = (store, history, update, createViewForRenderer, options) => {
  const state$ = Observable.create(observer =>
    store.subscribe(() =>
      observer.next(store.getState())
    )
  ).startWith(store.getState());

  const View$ = state$.map(
    translate => createViewForRenderer(treant, {
      ...options,
      dispatch: store.dispatch,
      history,
      translate: identity
    })
  );
  const view$ = View$.combineLatest(state$, (View, state) => View(state, options));

  const subscription = view$
    .map(children => <div>{children}</div>)
    .map(update)
    .subscribe();

  if (module.hot) {
    module.hot.accept('./views/index.js', () => {
      subscription.unsubscribe();
      const views = require('./views');

      createRenderer(store, history, update, views.createView, options);
    });
  }
};

export default options => {
  const history = createHistory();

  const store = createStore(
    createReducer(),
    {lang: options.lang},
    createMiddleware(options)
  );

  const unconnectHistory = connectHistory(history, store);
  store.dispatch(navigate(history.getCurrentLocation()));
  const unconnectTransifex = connectTransifex(window.Transifex, store);

  const update = render(options.container);
  createRenderer(store, history, update, createView, options);

  if (module.hot) {
    module.hot.accept('./reducers/index.js', () => {
      const reducers = require('./reducers');

      store.replaceReducer(reducers.createReducer());
    });
  }

  return () => {
    unconnectHistory();
    unconnectTransifex();
  };
};
