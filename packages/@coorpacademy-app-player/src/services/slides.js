import reduce from 'lodash/fp/reduce';
import slidesData from './slides.data';

const slides = reduce((slideMap, slide) => slideMap.set(slide._id, slide), new Map(), slidesData);

export const findById = id => {
  if (slides.has(id)) return Promise.resolve(slides.get(id));
  return Promise.reject(new Error('Slide not found'));
};

export const findAll = () => {
  return Promise.resolve(Array.from(slides.values()));
};
