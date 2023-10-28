import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTranslations from './locales/en/translation.json'; // Пример импорта для английского языка
import ruTranslations from './locales/ru/translation.json';
import plTranslations from './locales/pl/translation.json';
import deTranslations from './locales/de/translation.json';
import { DEFAULT_LANGUAGE } from '../constants';
// ... и так для каждого языка

i18n
  .use(initReactI18next)
  .init({
    resources: {
      EN: {
        translation: enTranslations
      },
      RU: {
        translation: ruTranslations
      },
      PL: {
        translation: plTranslations
      },
      DE: {
        translation: deTranslations
      },
      // ... и так для каждого языка
    },
    lng: localStorage.getItem('language') || DEFAULT_LANGUAGE, // текущий язык
    fallbackLng: DEFAULT_LANGUAGE, // язык по умолчанию
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
