import {relative} from 'path';
import sinon from 'sinon';
import React from 'react';
import ReactDOM from 'react-dom/server';
import identity from 'lodash/fp/identity';
import map from 'lodash/fp/map';
import pipe from 'lodash/fp/pipe';
import keys from 'lodash/fp/keys';
import get from 'lodash/fp/get';
import toPairs from 'lodash/fp/toPairs';
import Provider from '../atom/provider';
import componentsList from '../util/list-components';
import fixturesList from '../util/list-fixtures';

const _require = file => require(relative(__dirname, file)).default; // eslint-disable-line import/no-dynamic-require
const mapObject = fn => pipe(toPairs, map(([key, value]) => fn(value, key)));

const fullOptions = {
  skin: {
    images: {
      tree: 'dummy.url'
    }
  },
  translate: identity
};

beforeAll(() => {
  sinon.stub(console, 'error', warning => {
    throw new Error(warning);
  });
});

afterAll(() => console.error.restore());

mapObject((components, componentType) => mapObject((componentPath, componentName) => {
  const Component = _require(componentPath);
  const fixtures = get([componentType, componentName], fixturesList);

  it(`[${componentType}] ${componentName} › should have at least one fixture`, () => {
    expect(keys(fixtures).length > 0).toBe(true);
  });

  return mapObject((fixturePath, fixtureName) => {
    const _it = `[${componentType}] ${componentName} › ${fixtureName}`;
    const fixture = _require(fixturePath);

    it(`${_it} › should have props or children in every fixture`, () => {
      expect(undefined !== fixture.props || undefined !== fixture.children).toBe(true);
    });

    const children = fixture.children;

    it(`${_it} › should be instanciated as shallowTree`, () => {
      const vTree = (
        <Provider {...{skin: {}}}>
          <Component {...fixture.props}>
            {children}
          </Component>
        </Provider>
      );
      expect(ReactDOM.renderToString(vTree)).toBeTruthy();
    });

    it(`${_it} › instanciated and resolved | no options`, () => {
      const vTree = (
        <Component {...fixture.props}>
          {children}
        </Component>
      );
      expect(ReactDOM.renderToString(vTree)).toBeTruthy();
    });

    it(`${_it} › instanciated and resolved | options = {skin, translate}`, () => {
      const vTree = (
        <Provider {...fullOptions}>
          <Component {...fixture.props}>
            {children}
          </Component>
        </Provider>
      );
      expect(ReactDOM.renderToString(vTree)).toBeTruthy();
    });
  })(fixtures);
})(components))(componentsList);
