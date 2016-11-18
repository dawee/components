// import {map, resolve, walker} from '@coorpacademy/treantjs-core';

const transform = vTree => vTree;
const render = el => vTree => {
  return el;
};
const renderToString = vTree => '';

export {
  transform,
  render,
  renderToString
};
