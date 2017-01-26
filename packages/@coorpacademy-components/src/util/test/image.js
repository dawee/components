import extractor from '../image';

const skin = {
  images: {
    foo: 'fooz',
    fooplup: 'fooplupz',
    custom: 'customz'
  },
  properties: {
    foo: {
      bar: 'barz'
    },
    'foo-2': {
      bar: 'barz2'
    },
    custom: {
      bar: 'custombarz',
      plop: 'plopz'
    }
  }
};

it('should return null when no image and no default provided', () => {
  const extract = extractor(skin);
  const style = extract('none');
  expect(style).toBe(null);
});

it('should return default when no image and default provided', () => {
  const extract = extractor(skin, 'foo');
  const style = extract('none');
  expect(style.backgroundImage).toBe('url(fooz)');
  expect(style.bar).toBe('barz');
});

it('should extract image with properties', () => {
  const extract = extractor(skin);
  const style = extract('foo');
  expect(style.backgroundImage).toBe('url(fooz)');
  expect(style.bar).toBe('barz');
});

it('should extract custom image with default properties', () => {
  const extract = extractor(skin, 'foo');
  const style = extract('fooplup');
  expect(style.backgroundImage).toBe('url(fooplupz)');
  expect(style.bar).toBe('barz');
});

it('should extract default image and override with custom properties', () => {
  const extract = extractor(skin, 'foo');
  const style = extract('foo-2');
  expect(style.backgroundImage).toBe('url(fooz)');
  expect(style.bar).toBe('barz2');
});

it('should extract custom image with properties', () => {
  const extract = extractor(skin, 'foo');
  const style = extract('custom');
  expect(style.backgroundImage).toBe('url(customz)');
  expect(style.bar).toBe('custombarz');
  expect(style.plop).toBe('plopz');
});

it('should extract default image when undefined custom', () => {
  const extract = extractor(skin, 'foo');
  const style = extract('void');
  expect(style.backgroundImage).toBe('url(fooz)');
  expect(style.bar).toBe('barz');
  expect(style.plop).toBe(undefined);
});

