import identity from 'lodash/fp/identity';
import {checker, validate} from '../../../util/validation';
import createCursusHeader from '../../../molecule/cursus-header';
import createCursusRightaside from '../../../organism/cursus-rightaside';
import createCatalogCards from '../../../organism/catalog-cards';
import layout from '../layout.css';
import style from './style.css';

const conditions = checker.shape({
  props: checker.shape({
    title: checker.string.optional,
    description: checker.string.optional,
    image: checker.url.optional,
    badge: checker.url.optional,
    linkBuy: checker.string.optional,
    linkTry: checker.string.optional,
    rating: checker.number.optional,
    maxRating: checker.number.optional,
    assets: checker.arrayOf(checker.string).optional,
    disciplines: checker.oneOfType([checker.arrayOf(checker.object), checker.null]).optional
  }),
  children: checker.none
});

export default (treant, options = {}) => {
  const {h} = treant;
  const {translate = identity} = options;

  const CursusHeader = createCursusHeader(treant, options);
  const CursusRightaside = createCursusRightaside(treant, options);
  const CatalogCards = createCatalogCards(treant, options);
  const cardsTitle = translate('This course contains:');

  const ProductCursus = (props, children) => {
    const {
      disciplines = null,
      maxRating,
      image,
      badge,
      title = '',
      description = '',
      rating = 0,
      assets,
      linkBuy,
      linkTry
    } = props;

    return (
      <div className={layout.wrapper}>
        <div className={layout.container}>
          <CursusHeader
            image={image}
            title={title}
            description={description}
          />
        </div>
        <div className={layout.colContainer}>
          <CursusRightaside
            badge={badge}
            assets={assets || []}
            rating={rating}
            maxRating={maxRating}
            linkBuy={linkBuy}
            linkTry={linkTry}
          />
        </div>
        <div className={style.productsContainer}>
          <span className={layout.cardsTitle}>
            {cardsTitle}
          </span>

          <div className={style.productsWrapper}>
            <CatalogCards
              products={disciplines}
            />
          </div>
        </div>
      </div>
    );
  };

  return validate(conditions, ProductCursus);
};
