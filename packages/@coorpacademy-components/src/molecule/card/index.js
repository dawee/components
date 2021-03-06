import React from 'react';
import PropTypes from 'prop-types';
import getOr from 'lodash/fp/getOr';
import keys from 'lodash/fp/keys';
import Loader from '../../atom/loader';
import Provider from '../../atom/provider';
import style from './style.css';

const viewStyle = {
  grid: style.grid,
  list: style.list
};

const Card = (props, context) => {
  const {skin} = context;
  const {
    view = 'grid',
    image,
    time,
    adaptiv,
    disabled,
    certification,
    type,
    title,
    author,
    progress,
    onClick
  } = props;

  const lazyClass = title ? style.default : style.lazy;

  const defaultColor = getOr('#00B0FF', 'common.primary', skin);
  const cardStyle = viewStyle[view];

  const certif = certification ? <div className={style.certification} /> : null;

  const myprogress = !adaptiv
    ? <div className={style.progressWrapper}>
        <div
          className={style.progress}
          style={{
            width: progress,
            backgroundColor: defaultColor
          }}
        />
      </div>
    : null;

  const adaptivIcon = adaptiv
    ? <div
        className={style.adaptiv}
        style={{
          backgroundColor: defaultColor
        }}
      />
    : null;

  const lock = disabled ? <div className={style.lock} /> : null;

  const timer = time ? <span className={style.timer}>{time}</span> : null;
  const loader = title && type ? null : <Loader />;

  return (
    <div className={cardStyle}>
      <div className={lazyClass} disabled={disabled}>
        <div
          className={style.imageWrapper}
          style={{
            backgroundColor: defaultColor,
            backgroundImage: image ? `url('${image}')` : 'none'
          }}
        >
          {loader}
          <div className={style.ctaWrapper} onClick={!disabled && onClick}>
            {certif}
            {adaptivIcon}
            {timer}
          </div>
          {lock}
        </div>
        {myprogress}
        <div className={style.infoWrapper} onClick={!disabled && onClick}>
          <div
            className={style.type}
            style={{
              color: !disabled && defaultColor
            }}
          >
            {type}
          </div>
          <div className={style.title}>
            <div title={title}>
              {title}
            </div>
          </div>
          <div title={author} className={style.author}>
            {author}
          </div>
        </div>
      </div>
    </div>
  );
};

Card.contextTypes = {
  skin: Provider.childContextTypes.skin
};

Card.propTypes = {
  view: PropTypes.oneOf(keys(viewStyle)),
  image: PropTypes.string,
  time: PropTypes.string,
  disabled: PropTypes.bool,
  adaptiv: PropTypes.bool,
  certification: PropTypes.bool,
  type: PropTypes.string,
  title: PropTypes.string,
  author: PropTypes.string,
  progress: PropTypes.string,
  onClick: PropTypes.func
};

export default Card;
