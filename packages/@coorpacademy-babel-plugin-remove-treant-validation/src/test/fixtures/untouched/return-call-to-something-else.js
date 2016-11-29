import { checker, validate } from '../../util/validation';

const conditions = checker.shape({
  props: checker.none,
  children: checker.oneOrMore
});

export default ((treant, options) => {
  const { h } = treant;

  const Label = (props, children) => {};

  validate(conditions, Label);
});
