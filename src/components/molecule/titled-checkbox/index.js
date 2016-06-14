import getOr from 'lodash/fp/getOr';
import partial from 'lodash/fp/partial';
import unary from 'lodash/fp/unary';
import { checker, createValidate } from '../../../util/validation';
import style from './style.css';

const conditions = checker.shape({
  props: checker.shape({
    state: checker.shape({
      checked: checker.bool.optional,
      label: checker.string
    }),
    background: checker.color,
    onToggle: checker.func
  }),
  children: checker.none
});

export default (engine, options = {}) => {
  const {h} = engine;
  const {translate, skin} = options;
  const iconSuccess = String.fromCharCode(getOr('v', 'icons.success', skin));

  const TitledCheckbox = (props, children) => {
    const {state, background, onToggle} = props;
    const label = translate ? translate(state.label) : state.label;
    const icon = state.checked ? iconSuccess : '';

    return (
      <div className={style.default}>
        <label className={style.box}
               style={{
                 background: background || '#3d3d3d'
               }}
        >
          <span
            className={style.icon}
            style={{
              color: 'white'
            }}
          >
            {icon}
          </span>
          <input type="checkbox"
                 className={style.input}
                 checked={state.checked}
                 onChange={partial(unary(onToggle), [state])}
          />
        </label>
        <span>{label}</span>
      </div>
    );
  };

  TitledCheckbox.validate = createValidate(conditions);
  return TitledCheckbox;
};
