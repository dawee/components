import {readFileSync} from 'fs';
import {join} from 'path';
import generatedContent from '../../scripts/generate-components-index';

it('index should be up to date', () => {
  const content = readFileSync(join(__dirname, '../index.js'), 'utf8');

  expect(content).toEqual(generatedContent);
});
