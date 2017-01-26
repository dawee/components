import isArray from 'lodash/fp/isArray';
import isFunction from 'lodash/fp/isFunction';
import toHelpers from '..';

it('toHelpers should transform factories as helpers', () => {
  const components = {
    StarRating: () => true,
    CatalogCard: () => true
  };

  const helpers = toHelpers(components);

  expect(isArray(helpers)).toBe(true);
  expect(helpers.length === 2).toBe(true);
  expect(isFunction(helpers[0])).toBe(true);
  expect(isFunction(helpers[1])).toBe(true);
});
