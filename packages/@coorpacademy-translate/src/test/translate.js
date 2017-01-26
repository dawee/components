import createTranslate from '../translate';

it('should create translate function', () => {
  const translate = createTranslate({
    'f{{oo}}': 'b{{ar}}'
  });

  expect(translate('f{{oo}}', {ar: 'ar'})).toEqual('bar');
});

it('should use key if any locales match', () => {
  const translate = createTranslate({});

  expect(translate('f{{oo}}', {oo: 'oo'})).toEqual('foo');
});

it('shouldn\'t replace if any data match', () => {
  const translate = createTranslate({});

  expect(translate('f{{oo}}')).toEqual('f{{oo}}');
});

it('should trim token', () => {
  const translate = createTranslate({
    'f{{oo}}': 'f{{oo}}'
  });

  expect(translate('f{{ oo }}', {oo: 'oo'})).toEqual('foo');
});
