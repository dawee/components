import {join} from 'path';
import last from 'lodash/fp/last';

it('createConfig should override defaUlt wbpack config', () => {
  const createConfig = require('../../webpack.bundler.config');

  const config = createConfig('foo', 'bar', 'baz');
  expect(config.entry.bundle).toBe('bar');
  expect(config.output.library).toBe('Coorponents');
  expect(config.output.path).toBe('baz');

  const babelInclude = last(config.module.rules).include;
  expect(babelInclude).toBe(join(process.cwd(), 'foo'));
});
