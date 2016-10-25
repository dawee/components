import defaultsDeep from 'lodash/fp/defaultsDeep';
import CreateForm from '../../../../../molecule/brand-create-form/test/fixtures/error';

const {props} = CreateForm;

export default {
  props: defaultsDeep(props, {
    notifications: [{
      type: 'error',
      message: 'There is a problem in your form',
      onClose: () => {}
    }]
  })
};