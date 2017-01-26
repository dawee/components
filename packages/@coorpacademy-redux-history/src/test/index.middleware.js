import {createMemoryHistory} from '@coorpacademy/history';
import {createStore, applyMiddleware} from 'redux';
import {
  historyReducer,
  historyMiddleware,
  createPushNavigate,
  createReplaceNavigate,
  createGoNavigate,
  createGoBackNavigate,
  createGoForwardNavigate
} from '..';

let store;

beforeEach(() => {
  const history = createMemoryHistory({
    initialEntries: ['/foo', '/bar', '/baz'],
    initialIndex: 1
  });

  store = createStore(
    historyReducer,
    history.location,
    applyMiddleware(
      historyMiddleware({history})
    )
  );
});

it('should navigate on push', () => {
  store.dispatch(createPushNavigate('/qux?quux#quuz'));
  const state = store.getState();

  expect(state.pathname).toBe('/qux');
  expect(state.search).toBe('?quux');
  expect(state.hash).toBe('#quuz');
  expect(state.key).toBeTruthy();
});

it('should navigate on replace', () => {
  store.dispatch(createReplaceNavigate('/qux?quux#quuz'));
  const state = store.getState();

  expect(state.pathname).toBe('/qux');
  expect(state.search).toBe('?quux');
  expect(state.hash).toBe('#quuz');
  expect(state.key).toBeTruthy();
});

it('should navigate on go', () => {
  store.dispatch(createGoNavigate(0));
  const state = store.getState();

  expect(state.pathname).toBe('/bar');
});

it('should navigate on goBack', () => {
  store.dispatch(createGoBackNavigate());
  const state = store.getState();

  expect(state.pathname).toBe('/foo');
});

it('should navigate on goForward', () => {
  store.dispatch(createGoForwardNavigate());
  const state = store.getState();

  expect(state.pathname).toBe('/baz');
});
