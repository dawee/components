import React from 'react';
import isArray from 'lodash/fp/isArray';
import contains from 'lodash/fp/contains';
import createDirectives from '..';

it('createDirectives should wrap factories as directive factories', () => {
  const factories = {
    StarRating: props => true,
    CatalogCard: props => true
  };

  const app = {
    directives: [],
    directive: (_name, options) => app.directives.push(_name)
  };

  const Provider = (
    <div />
  );

  createDirectives(app, Provider, factories);

  expect(isArray(app.directives)).toBe(true);
  expect(contains('coorpStarRating', app.directives)).toBe(true);
  expect(contains('coorpCatalogCard', app.directives)).toBe(true);
});
