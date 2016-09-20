// TODO Move redux-transifex into a separate package
export const CHANGE_LANGUAGE = '@@language/CHANGE';

export const createLanguageChange = lang => ({
  type: CHANGE_LANGUAGE,
  payload: lang
});

export const connectTransifex = (Transifex, store) => {
  if (!Transifex) return () => {};

  const onChange = lang => {
    store.dispatch(createLanguageChange(lang));
  };

  Transifex.live.onReady(() => onChange(Transifex.live.getSelectedLanguageCode()));
  Transifex.live.onTranslatePage(onChange);

  return () => {
    Transifex.live.unBind(onChange);
  };
};

export const createLanguageReducer = (defaultLang = null) => (state = defaultLang, action) => {
  if (action.type === CHANGE_LANGUAGE)
    return action.payload;
  return state;
};
