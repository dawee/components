import toPairs from 'lodash/fp/toPairs';
import forEach from 'lodash/fp/forEach';
import {
  LOCATION,
  createLocation,
  NAVIGATE,
  createPushNavigate,
  createReplaceNavigate,
  createGoNavigate,
  createGoBackNavigate,
  createGoForwardNavigate
} from '..';

it('createLocation should create a LOCATION action', () => {
  const action = createLocation({
    pathname: '/'
  });
  expect(action.type).toBe(LOCATION);
  expect(action.payload.pathname).toBe('/');
});

forEach(([nameAction, createAction]) => {
  it(`createNavigate should create a NAVIGATE action with ${nameAction}`, () => {
    const action = createAction('/');
    expect(action.type).toBe(NAVIGATE);
    expect(action.payload.action).toBeTruthy();
    expect(action.payload.args).toEqual(['/']);
  });
}, toPairs({
  createPushNavigate,
  createReplaceNavigate,
  createGoNavigate,
  createGoBackNavigate,
  createGoForwardNavigate
}));
