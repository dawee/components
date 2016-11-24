import noop from 'lodash/fp/noop';
import {checker, validate} from '../../util/validation';
import style from './style.css';

const conditions = checker.shape({
  props: checker.shape({
    title: checker.string,
    value: checker.bool.optional,
    disabled: checker.bool.optional,
    onChange: checker.func.optional,
    description: checker.string.optional
  }),
  children: checker.none
});

export default (treant, options) => {
  const {h} = treant;

  const InputSwitch = (props, children) => {
    const {
      title,
      value,
      disabled,
      onChange = noop,
      description
    } = props;

    const isDisabled = disabled ? 'disabled' : '';
    const isUnset = value === undefined;

    return (
      <div className={isUnset ? style.unset : style.default}>
        <span className={style.title}>{`${title} `}</span>
        <input
          type='checkbox'
          id={title}
          name={title}
          onChange={e => onChange(e.target.checked)}
          checked={value}
          disabled={isDisabled}
          className={style.checkbox}
        />
        <label htmlFor={title}></label>
        <div className={style.description}>
          {description}
        </div>
      </div>
    );
  };

  return validate(conditions, InputSwitch);
};
