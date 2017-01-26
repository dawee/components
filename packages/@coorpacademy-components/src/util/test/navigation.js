import noop from 'lodash/fp/noop';
import pushToHistory from '../navigation';

const createEvent = ({href, button = 0, ...props}) => ({
  target: {
    href
  },
  button,
  preventDefault: noop,
  ...props
});

it('should push to history navigation event', () => {
  expect.assertions(1);

  const options = {
    history: {
      push: href => expect(href).toBe('/foo')
    }
  };
  const props = {
    href: '/foo'
  };
  const onClick = pushToHistory(options);
  const customEvent = createEvent(props);

  onClick(props)(customEvent);
});

it('should not do anything if history is not in the options', () => {
  const props = {
    href: '/foo'
  };
  const onClick = pushToHistory({});
  const customEvent = createEvent(props);

  onClick(props)(customEvent);
});

// it('should not do anything if event does not contain a target href', done => {
//   const options = {
//     history: {
//       push: href => done.fail()
//     }
//   };
//   const onClick = pushToHistory(options);

//   onClick({})({});
// });

// it('should not do anything if href contain domain name', done => {
//   const props = {
//     href: 'http://foo.bar/baz'
//   };
//   const options = {
//     history: {
//       push: href => done.fail()
//     }
//   };
//   const onClick = pushToHistory(options);

//   onClick(props)({});
// });

// it('should not do anything if event is prevented', done => {
//   const options = {
//     history: {
//       push: href => done.fail()
//     }
//   };

//   const props = {
//     href: '/foo',
//     defaultPrevented: true
//   };
//   const onClick = pushToHistory(options);
//   const customEvent = createEvent(props);

//   onClick(props)(customEvent);
// });

// it('should not do anything if event is mouse click but not left click', done => {
//   const options = {
//     history: {
//       push: href => done.fail()
//     }
//   };

//   const props = {
//     href: '/foo',
//     button: 1
//   };
//   const onClick = pushToHistory(options);
//   const customEvent = createEvent(props);

//   onClick(props)(customEvent);
// });

// it('should not do anything if event is mouse click used with keyboard modifiers', done => {
//   const options = {
//     history: {
//       push: href => done.fail()
//     }
//   };

//   const props = {
//     href: '/foo'
//   };

//   const createEventWithModifier = modifier =>
//     createEvent({...props, [modifier]: true});

//   const onClick = pushToHistory(options);
//   onClick(props)(createEventWithModifier('altKey'));
//   onClick(props)(createEventWithModifier('metaKey'));
//   onClick(props)(createEventWithModifier('ctrlKey'));
//   onClick(props)(createEventWithModifier('shiftKey'));
// });
