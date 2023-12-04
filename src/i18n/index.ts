import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import intervalPlural from 'i18next-intervalplural-postprocessor';
import {COUNTRY} from '@env';
import enTranslation from './langs/en';
import ptTranslation from './langs/pt';
import npTranslation from './langs/np';

export const resources: {[lang: string]: {translation: any; label: string}} = {
  en: {translation: enTranslation, label: 'English (US)'},
  pt: {translation: ptTranslation, label: 'Krio'},
  kr: {translation: ptTranslation, label: 'Portuguese (BR)'},
  ne: {translation: npTranslation, label: 'Nepali'},
};

i18n
  .use(initReactI18next)
  .use(intervalPlural)
  .init({
    compatibilityJSON: 'v3',
    resources,
    fallbackLng: COUNTRY === 'np' ? 'ne' : 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
