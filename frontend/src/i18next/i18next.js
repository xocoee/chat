import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import resources from './index';

const initializeI18n = () => {
  i18next
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'en',
      interpolation: {
        escapeValue: false,
      },
    });

  return i18next;
};

export default initializeI18n();
