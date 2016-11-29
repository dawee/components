import test from 'ava';
import isFunction from 'lodash/fp/isFunction';
import * as treant from '@coorpacademy/treantjs-core';
import {checker, validate} from '../../validation';

const {h, resolve} = treant;

test('should extend children properties', t => {
  const Title = (props, children) => <h1 style={{color: props.color}}>{children}</h1>;
  const Color = createWrapper(() => props => ({color: props.color}))(treant);

  const tree = (
    <Color color="blue">
      <Title>foo</Title>
    </Color>
  );

  t.deepEqual(resolve(tree), resolve(<Title color="blue">foo</Title>));
  t.deepEqual(resolve(tree), <h1 style={{color: 'blue'}}>foo</h1>);
});

test('should create a function wrapping a component', t => {
  const conditions = checker.shape({value: checker.string});
  const Component = (props, children) => 'success';

  t.true(isFunction(validate(conditions, Component)));
});

test('should create a function wrapping a component', t => {
  const conditions = checker.shape({value: checker.string});
  const Component = (props, children) => 'success';

  t.true(isFunction(validate(conditions, Component)));
});

test('should provide a validate function with throw', t => {

  const conditions = checker.shape({});
  const validate = createValidate(conditions, true);
  t.true(isFunction(validate));
});
