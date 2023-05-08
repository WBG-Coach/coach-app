import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import enTranslation from './langs/en';
import ptTranslation from './langs/pt';

export const resources: {[lang: string]: {translation: any; label: string}} = {
  en: {translation: enTranslation, label: 'English (US)'},
  pt: {translation: ptTranslation, label: 'Krio'},
  kr: {translation: ptTranslation, label: 'Portuguese (BR)'},
};

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources,
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
