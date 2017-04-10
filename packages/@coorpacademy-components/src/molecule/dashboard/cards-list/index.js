import React from 'react';
import PropTypes from 'prop-types';
import map from 'lodash/fp/map';
import Card from '../../card';
import style from './style.css';

const CardsList = (props, context) => {
  const skin = context;
  const {
    title,
    cards
  } = props;

  const cardsView = cards.map((card, key) => {
    return (
      <div className={style.card}
        key={key}
      >
        <Card
          {...card}
        />
      </div>
    );
  });

  return (
    <div className={style.wrapper}>
      <div className={style.list}>
        <div className={style.title}>
          {title}
        </div>
        <div className={style.cards}>
          {cardsView}
        </div>
        <div className={style.left} />
        <div className={style.right} />
      </div>
    </div>
  );
};

CardsList.contextTypes = {
  skin: PropTypes.object
};

CardsList.propTypes = {
  title: PropTypes.string,
  cards: PropTypes.array
};

export default CardsList;