import hyperx from 'hyperx';
import identity from 'lodash/fp/identity';
import getOr from 'lodash/fp/getOr';
import {checker, createValidate} from '../../util/validation';
import createStarRating from '../star-rating';
import createLink from '../../atom/link';
import HoverFillBehaviour from '../../behaviour/effects/hover-fill';
import createPicture from '../../atom/picture';
import style from './style.css';

const conditions = checker.shape({
  props: checker.shape({
    image: checker.string.optional,
    href: checker.string.optional
  }),
  children: checker.none
});

const getOrBlank = getOr('');

export default (treant, options = {}) => {
  const HoverFill = HoverFillBehaviour(treant, options);
  const Link = createLink(treant, options);
  const Picture = createPicture(treant, options);

  const {translate = identity} = options;

  const CatalogCard = (props, children) => {
    const {h} = treant;
    const hx = hyperx(h);

    const learnMore = hx(`<span>${translate('Learn <span>more</span>')}</span>`);

    const {
      href = '',
      image
    } = props;

    return (
      <li className={style.brandListItem}>
          <Picture src={image} />
          <div className={style.overlay}>
            <HoverFill>
              <Link href={href}>
                {learnMore}
              </Link>
            </HoverFill>
          </div>
      </li>
    );
  };

  CatalogCard.validate = createValidate(conditions);
  return CatalogCard;
};
