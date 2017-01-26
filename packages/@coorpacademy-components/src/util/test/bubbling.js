import stopPropagation from '../bubbling';

it('should call stopPropagation', () => {
  const customEvent = {stopPropagation: () => true};
  stopPropagation(customEvent);
});
