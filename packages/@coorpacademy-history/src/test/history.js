import {useBasename} from '../history';

[
  [{basename: '/foo'}, '/bar', '/foo/bar'],
  [undefined, '/bar', '/bar'],
  [{}, '/bar', '/bar'],
  [{basename: '/foo'}, 'http://foo/bar', 'http://foo/bar'],
  [{basename: '/foo'}, '#', '#']
].forEach(([options, input, expected]) => {
  it(`should add createHref with ${JSON.stringify(options)} and return '${expected}'`, () => {
    const historyFactory = () => {
      return {};
    };

    const history = useBasename(historyFactory)(options);

    expect(history.createHref).toBeTruthy();
    expect(history.createHref(input)).toBe(expected);
  });
});
