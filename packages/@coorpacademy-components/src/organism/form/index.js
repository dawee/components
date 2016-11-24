import noop from 'lodash/fp/noop';
import {checker, validate} from '../../util/validation';
import createFormGroup from '../../molecule/form-group';
import createButton from '../../atom/button';
import style from './style.css';

const conditions = checker.shape({
  props: checker.shape({
    title: checker.string,
    groups: checker.array,
    submitValue: checker.string.optional,
    resetValue: checker.string.optional,
    onSubmit: checker.func.optional,
    onReset: checker.func.optional
  }),
  children: checker.none
});

export default (treant, options = {}) => {
  const {h} = treant;
  const FormGroup = createFormGroup(treant, options);
  const Button = createButton(treant, options);

  const Form = (props, children) => {
    const {
      groups,
      submitValue = '',
      resetValue = '',
      onSubmit = noop,
      onReset = noop
    } = props;

    const prevent = fun => (e, ...argz) => {
      e.preventDefault();
      fun(e, ...argz);
    };

    return (
      <form
        className={style.form}
        onSubmit={prevent(onSubmit)}
        onReset={prevent(onReset)}
      >
        {groups.map((group, index) => (
          <FormGroup {...group}/>
        ))}
        <div className={style.buttons}>
          <Button
            type="reset"
            submitValue={submitValue}
            className={style.cancel}
          />
          <Button
            type="submit"
            submitValue={resetValue}
            className={style.save}
          />
        </div>
      </form>
    );
  };

  return validate(conditions, Form);
};
