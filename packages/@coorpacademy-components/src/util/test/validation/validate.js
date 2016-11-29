import test from 'ava';
import isFunction from 'lodash/fp/isFunction';
// import * as treant from '@coorpacademy/treantjs-core';
import {checker, validate} from '../../validation';

// const {h, resolve} = treant;

test.only('should create a function wrapping a component', t => {
  const conditions = checker.shape({
    props: {
      value: checker.string
    },
    children: checker.none
  });
  const Component = (props, children) => 'success';

  t.true(isFunction(validate(conditions, Component)));
});

// test.only('validate should return component called with props/children when conditions are met', t => {
//   const conditions = checker.shape({
//     props: {
//       value: checker.string
//     },
//     children: checker.none
//   });
//   const Component = (props, children) => 'success';
//   const wrapped = validate(conditions, Component);
//
//   const givenProps = {value: 'foo'};
//
//   t.true(wrapped(givenProps, []) === 'success');
// });

test.only('wrapped component should throw when passed incompatible props', t => {
  const conditions = checker.shape({
    props: {
      value: checker.string
    },
    children: checker.none
  });
  const Component = (props, children) => 'success';
  const wrapped = validate(conditions, Component);

  t.throws(() => {
    wrapped({}, []);
  });

  t.throws(() => {
    wrapped({value: 100}, []);
  });
  // const conditions = checker.shape({});
  // const validate = createValidate(conditions, true);
  // t.true(isFunction(validate));
});
