import {checker, validate} from '../../util/validation';

const conditions = checker.shape({
  props: checker.none,
  children: checker.oneOrMore
});

export default (treant, options) => {
  const {h} = treant;
  const Title = (props, children) => (
    <h1>
      {children}
    </h1>
  );

  return validate(conditions, Title);
};
