import {
  createLocation,
  INITAL_STATE,
  historyReducer
} from '..';

it('should have initial state', () => {
  const action = {type: 'foo'};
  const state = historyReducer(undefined, action);
  expect(state).toEqual(INITAL_STATE);
});

it('should store payload of location action', () => {
  const location = {
    pathname: '/foo'
  };
  const action = createLocation(location);
  const state = historyReducer(undefined, action);
  expect(state).toEqual(location);
});
