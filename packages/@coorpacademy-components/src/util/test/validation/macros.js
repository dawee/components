import test from 'ava';
import {checker, validate} from '../../validation';

const createFailure = conditions => {
  const validator = validate(conditions);
  return (t, props, children) => {
    t.throws(() => {
      validator(props, children);
    });
  };
};

const createSuccess = conditions => {
  const validator = validate(conditions, () => 'success');
  return (t, props, children) => validator(props, children);
};

const noShape = checker.shape({});
const success = createSuccess(noShape);
test('should provide a success macro', success);

const shape = checker.shape({foo: checker.string});
const failure = createFailure(shape);
test('should provide a failure macro', failure);

export {
  createFailure,
  createSuccess
};
