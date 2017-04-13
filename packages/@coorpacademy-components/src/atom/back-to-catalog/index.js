import React, {PropTypes} from 'react';
import style from './style.css';

const BackToCatalogButton = props => (
  <div
    className={style.backToCatalogButton}
    onClick={props.onBackToCatalogButtonClick}
  >
    {props.children}
  </div>
);

BackToCatalogButton.PropTypes = {
  handleBackToCatalogButtonClick: PropTypes.func,
  translations: PropTypes.object
};

export default BackToCatalogButton;