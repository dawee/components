import map from 'lodash/fp/map';
import toPairs from 'lodash/fp/toPairs';
import kebabCase from 'lodash/fp/kebabCase';
import * as treant from '@coorpacademy/treantjs-core';
import {renderToString} from '@coorpacademy/treantjs-engine-virtual-dom';

const toHelpers = (factories, skin) => {
  const toHelper = ([key, factory]) => {
    const isFactory = key.split('create')[1];
    if (!isFactory) return;

    const componentName = kebabCase(isFactory);
    const Component = factory(treant, {skin});

    return (dust, options) => {
      dust.helpers[componentName] = (chunk, context, bodies, props) => {
        const vTree = Component(props);
        const html = renderToString(vTree);
        chunk.write(html);
      };
    };
  };

  return map(toHelper, toPairs(factories));
};

export default toHelpers;