import T from 'i18n-react';


export const defaultLanguage = 'en';


const languages = {
  'en': require('./en.yml')
};


/**
 * @param {string} lang Language
 */
export function setLanguage(lang) {
  if (!(lang in languages)) {
    lang = defaultLanguage;
  }
  T.setTexts(Object.assign({}, languages[defaultLanguage], languages[lang]));
}
