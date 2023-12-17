import i18n from 'i18next';
import detector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import * as en from '@/locales/en';

let collator: Intl.Collator;

function initCollator() {
  collator = new Intl.Collator(i18n.language, { numeric: true });
}

i18n.on('languageChanged', initCollator);
initCollator();

function formatCurrency(value: number, currency = 'USD') {
  return new Intl.NumberFormat(i18n.language, {
    style: 'currency',
    currency,
    maximumFractionDigits: 2,
    minimumFractionDigits: 0,
  }).format(value);
}

export async function setupI18n() {
  return i18n
    .use(detector)
    .use(initReactI18next)
    .init({
      ns: ['common', 'cart', 'products'],
      defaultNS: 'common',
      resources: { en },
      nonExplicitSupportedLngs: true,
      fallbackLng: 'en',
      interpolation: {
        escapeValue: false,
        format: (value, format, _language, options) => {
          if (format === 'currency') {
            return formatCurrency(value, options?.currency);
          }

          return value;
        },
      },
      debug: false,
    });
}

export function sortAlphabetically<T>(array: T[], extractLabel = (value: T): string => value as unknown as string) {
  return array.sort((a, b) => collator.compare(extractLabel(a), extractLabel(b)));
}
