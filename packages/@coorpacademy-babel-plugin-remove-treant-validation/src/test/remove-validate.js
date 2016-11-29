/* eslint-disable promise/no-native */
import fs from 'fs';
import path from 'path';
import pify from 'pify';
import _ from 'lodash/fp';
import test from 'ava';
import glob from 'glob';
import { transform } from 'babel-core';
import plugin from '../index';

const readFile = pify(fs.readFile);

const transformOptions = {
  plugins: [plugin]
};

function testName(testPath) {
  return path.basename(testPath)
    .replace(/\.js$/g, '')
    .split('-')
    .join(' ');
}

glob.sync(path.join(__dirname, 'fixtures/modified/*/')).forEach(testPath => {
  test(`should remove validate call - ${testName(testPath)}`, async t => {
    const actualPath = path.join(testPath, 'actual.js');
    const expectedPath = path.join(testPath, 'expected.js');
    const [actualContent, expected] = await Promise.all([
      readFile(actualPath, 'utf8'),
      readFile(expectedPath, 'utf8')
    ]);

    const actual = transform(actualContent, transformOptions).code;

    t.true(_.trim(actual) === _.trim(expected));
  });
});

glob.sync(path.join(__dirname, 'fixtures/untouched/*.js')).forEach(testPath => {
  test(`should not modify code when ${testName(testPath)}`, async t => {
    const actualContent = await readFile(testPath, 'utf8');

    const actual = transform(actualContent, transformOptions).code;

    t.true(_.trim(actual) === _.trim(actualContent));
  });
});
