import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import enTranslation from './langs/en';

export const resources: {[lang: string]: {translation: any; label: string}} = {
  en: {translation: enTranslation, label: 'English'},
};

i18n.use(initReactI18next).init({
  resources,
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
