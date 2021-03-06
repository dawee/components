import defaultsDeep from 'lodash/fp/defaultsDeep';
import Default from './default';

const {props} = Default;

export default {
  props: defaultsDeep(props, {
    disabled: true,
    adaptiv: true,
    time: '14mn',
    progress: '0%'
  })
};
