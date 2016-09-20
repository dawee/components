import test from 'ava';
import reducer from '../';

test('should return initial state when passed undefined state', t => {
  const action = {type: `INIT_${Math.random()}`};

  const newState = Object.keys(reducer()(undefined, action));

  t.deepEqual(newState, ['api', 'route', 'lang']);
});
