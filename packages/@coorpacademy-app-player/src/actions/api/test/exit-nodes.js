import test from 'ava';
import set from 'lodash/fp/set';
import macro from '../../test/helpers/macro';
import {
  fetchExitNode,
  EXIT_NODE_FETCH_REQUEST,
  EXIT_NODE_FETCH_SUCCESS,
  EXIT_NODE_FETCH_FAILURE
} from '../exit-nodes';

test(
  'should fetch slide',
  macro,
  {},
  t => ({
    ExitNodes: {
      findById: id => {
        t.is(id, 'foo');
        return id;
      }
    }
  }),
  fetchExitNode('foo'),
  [
    {
      type: EXIT_NODE_FETCH_REQUEST,
      meta: {id: 'foo'}
    },
    {
      type: EXIT_NODE_FETCH_SUCCESS,
      meta: {id: 'foo'},
      payload: 'foo'
    }
  ]
);

test(
  'should prevent request if slide already fetched',
  macro,
  set('data.exitNodes.entities.foo', 'foo', {}),
  t => ({
    ExitNodes: {
      findById: id => {
        t.is(id, 'foo');
        return id;
      }
    }
  }),
  fetchExitNode('foo'),
  [
    {
      type: EXIT_NODE_FETCH_REQUEST,
      meta: {id: 'foo'}
    }
  ]
);

test(
  'should return error if request failed',
  macro,
  {},
  t => ({
    ExitNodes: {
      findById: id => {
        t.is(id, 'foo');
        throw new Error();
      }
    }
  }),
  fetchExitNode('foo'),
  [
    {
      type: EXIT_NODE_FETCH_REQUEST,
      meta: {id: 'foo'}
    },
    {
      type: EXIT_NODE_FETCH_FAILURE,
      meta: {id: 'foo'},
      error: true,
      payload: new Error()
    }
  ]
);
