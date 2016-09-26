import {combineReducers} from 'redux';
import {historyReducer} from '@coorpacademy/redux-history';
import {createLanguageReducer} from '../modules/redux-transifex';
import api from './api';

export default ({lang} = {}) => combineReducers({
  api,
  route: historyReducer,
  lang: createLanguageReducer(lang)
});
