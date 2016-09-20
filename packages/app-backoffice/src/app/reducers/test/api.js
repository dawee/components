import test from 'ava';
import reducer from '../api';

test('should return initial state when passed undefined state', t => {
  const action = {type: `INIT_${Math.random()}`};

  t.deepEqual(reducer(undefined, action), {});
});
