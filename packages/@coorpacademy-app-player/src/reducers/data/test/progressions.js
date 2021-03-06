import test from 'ava';
import reducer from '../progressions';
import {
  PROGRESSION_FETCH_REQUEST,
  PROGRESSION_FETCH_SUCCESS,
  PROGRESSION_FETCH_FAILURE,
  PROGRESSION_CREATE_ANSWER_SUCCESS
} from '../../../actions/api/progressions';
import macro from '../../test/helpers/macro';

test('should have initial value', macro, reducer, undefined, {}, {entities: {}});

test(
  'should set entities to null on request',
  macro,
  reducer,
  {},
  {
    type: PROGRESSION_FETCH_REQUEST,
    meta: {id: 'foo'}
  },
  {entities: {foo: null}}
);

test(
  "should set entities to null if doesn't exist on request",
  macro,
  reducer,
  {},
  {
    type: PROGRESSION_FETCH_REQUEST,
    meta: {id: 'foo'}
  },
  {entities: {foo: null}}
);

test(
  'should do nothing if entity already exists on request',
  macro,
  reducer,
  {entities: {foo: 'foo'}},
  {
    type: PROGRESSION_FETCH_REQUEST,
    meta: {id: 'foo'}
  },
  {entities: {foo: 'foo'}}
);

test(
  'should set entities on success',
  macro,
  reducer,
  {},
  {
    type: PROGRESSION_FETCH_SUCCESS,
    meta: {id: 'foo'},
    payload: 'foo'
  },
  {entities: {foo: 'foo'}}
);

test(
  'should remove null on failure',
  macro,
  reducer,
  {entities: {foo: null}},
  {
    type: PROGRESSION_FETCH_FAILURE,
    meta: {id: 'foo'},
    error: true,
    payload: {}
  },
  {entities: {}}
);

test(
  'should do nothing is entity already exists on failure',
  macro,
  reducer,
  {entities: {foo: 'foo'}},
  {
    type: PROGRESSION_FETCH_FAILURE,
    meta: {id: 'foo'},
    error: true,
    payload: {}
  },
  {entities: {foo: 'foo'}}
);

test(
  'should merge answer result with progression',
  macro,
  reducer,
  {entities: {foo: {foo: 'foo'}}},
  {
    type: PROGRESSION_CREATE_ANSWER_SUCCESS,
    meta: {progressionId: 'foo'},
    payload: {bar: 'bar'}
  },
  {entities: {foo: {foo: 'foo', bar: 'bar'}}}
);
