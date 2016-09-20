import {combineReducers} from 'redux';
import {historyReducer} from '@coorpacademy/components/src/@coorpacademy/redux-tools/redux-history';
import {createLanguageReducer} from '../modules/redux-transifex';
import api from './api';

export default ({lang} = {}) => combineReducers({
  api,
  route: historyReducer,
  lang: createLanguageReducer(lang)
});
