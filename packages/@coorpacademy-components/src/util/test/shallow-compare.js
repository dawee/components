import shallowCompare from '../shallow-compare';

it('should shallow compare', () => {
  const _this = {
    props: 'foo',
    state: 'bar',
    context: 'baz'
  };

  expect(shallowCompare(_this, 'foo', 'bar', 'baz')).toBe(false);
  expect(shallowCompare(_this, 'plop', 'bar', 'baz')).toBe(true);
});
