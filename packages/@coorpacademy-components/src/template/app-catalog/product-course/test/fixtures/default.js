import take from 'lodash/fp/take';
import disciplineHeader from '../../../../../molecule/discipline-header/test/fixtures/default';
import disciplinePartners from '../../../../../molecule/discipline-partners/test/fixtures/default';
import disciplineScope from '../../../../../molecule/discipline-scope/test/fixtures/default';
import catalogCards from '../../../../../organism/catalog-cards/test/fixtures/default';

const {title, description, video} = disciplineHeader.props;
const {authors} = disciplinePartners.props;
const {content, levels} = disciplineScope.props;
const {products} = catalogCards.props;

export default {
  props: {
    selected: 2,
    title,
    description,
    video,
    authors,
    changeLevel: () => true,
    relatedDisciplines: take(3, products),
    level: content,
    levels
  }
};
