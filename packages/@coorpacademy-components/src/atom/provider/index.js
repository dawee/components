import React from 'react';
import PropTypes from 'prop-types';
import * as CustomPropTypes from '../../util/proptypes';

class Provider extends React.Component {
  constructor(props, context) {
    const {history, skin, translate} = props;
    super(props, context);
    this.state = {history, skin, translate};
  }

  getChildContext() {
    return this.state;
  }

  componentWillReceiveProps(nextProps) {
    const {history, skin, translate} = nextProps;
    this.setState({
      history,
      skin,
      translate
    });
  }

  render() {
    return React.Children.only(this.props.children);
  }
}

const historyShape = PropTypes.shape({
  createHref: PropTypes.func,
  push: PropTypes.func
});

const skinShape = PropTypes.shape({
  common: PropTypes.objectOf(CustomPropTypes.color),
  images: PropTypes.shape({
    'logo-mobile': CustomPropTypes.url,
    logo: CustomPropTypes.url,
    'logo-email': CustomPropTypes.url,
    login: CustomPropTypes.url
  }),
  icons: PropTypes.objectOf(CustomPropTypes.hex),
  mod: PropTypes.objectOf(CustomPropTypes.color),
  courses: PropTypes.arrayOf(CustomPropTypes.color),
  texts: PropTypes.objectOf(CustomPropTypes.color)
});

const translateShape = PropTypes.func;

Provider.propTypes = {
  history: historyShape,
  skin: skinShape,
  translate: translateShape,
  children: PropTypes.element.isRequired
};

Provider.childContextTypes = {
  history: historyShape,
  skin: skinShape,
  translate: translateShape.isRequired
};

export default Provider;
