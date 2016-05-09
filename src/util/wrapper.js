import createDecorator from './decorator';
import head from 'lodash/fp/head';

const createComponent = createProperties => (engine, options) => (props, children) => {
  const {clone, map} = engine;

  const properties = createProperties(engine, options)(props, children);
  const child = head(map(c => c, children));

  return clone(child, properties);
};

const createWrapper = createProperties => (engine, options) => {
  const wrapper = createComponent(createProperties)(engine, options);
  wrapper.decorate = createDecorator(engine)(wrapper);
  return wrapper;
};

export default createWrapper;
