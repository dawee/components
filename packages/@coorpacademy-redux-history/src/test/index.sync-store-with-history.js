import {createMemoryHistory} from '@coorpacademy/history';
import {createStore, applyMiddleware} from 'redux';
import {
  LOCATION,
  historyReducer,
  historyMiddleware,
  syncStoreWithHistory
} from '..';

it('should navigate on push', () => {
  const history = createMemoryHistory({
    initialEntries: ['/foo']
  });

  const store = createStore(
    historyReducer,
    applyMiddleware(
      historyMiddleware({history})
    )
  );

  const action = syncStoreWithHistory(store, history);
  const state = store.getState();

  expect(action.type).toBe(LOCATION);
  expect(action.payload.pathname).toBe('/foo');
  expect(action.payload).toBe(state);
});
