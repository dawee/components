import React from 'react';
import addClassName from '../add-class-name';

it('should merge classNames', () => {
  const result = addClassName('bar')({className: 'foo'});
  expect(result.className).toBe('foo bar');
});

it('should init classNames', () => {
  const result = addClassName('foo')({});
  expect(result.className).toBe('foo');
});

it('should add a className to an element', () => {
  const className = 'foo';
  const element = <h1 {...addClassName('bar')({className})} />;
  expect(element.props.className).toBe('foo bar');
});
