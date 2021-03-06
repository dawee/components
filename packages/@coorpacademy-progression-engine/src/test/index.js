// @flow
import test from 'ava';
import {checkAnswer, computeNextStep, updateState, createProgression} from '..';

test('should export checkAnswer', t => {
  t.is(typeof checkAnswer, 'function');
});

test('should export computeNextStep', t => {
  t.is(typeof computeNextStep, 'function');
});

test('should export updateState', t => {
  t.is(typeof updateState, 'function');
});

test('should export createProgression', t => {
  t.is(typeof createProgression, 'function');
});
