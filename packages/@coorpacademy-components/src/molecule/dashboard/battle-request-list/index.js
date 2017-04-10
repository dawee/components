import React from 'react';
import PropTypes from 'prop-types';
import map from 'lodash/fp/map';
import BattleRequest from '../../battle-request';
import style from './style.css';

const BattleRequestList = (props, context) => {
  const skin = context;
  const {
    requests
  } = props;

  const cards = requests.map((request, key) => {
    return (
      <div className={style.card}
        key={key}
      >
        <BattleRequest
          {...request}
        />
      </div>
    );
  });

  return requests && requests.length > 0 ? (
    <div className={style.list}>
      {cards}
    </div>
  ) : null;
};

BattleRequestList.contextTypes = {
  skin: PropTypes.object
};

BattleRequestList.propTypes = {
  requests: PropTypes.array
};

export default BattleRequestList;