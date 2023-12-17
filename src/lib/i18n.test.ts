import i18next from 'i18next';
import { describe, expect, it } from 'vitest';

const t = i18next.t.bind(i18next);

describe('i18n utilities', () => {
  it('formats currencies as USD by default', () => {
    expect(t('{{value, currency}}', { value: 1234567 })).toEqual('$1,234,567');
  });

  it('formats currencies in a given currency', () => {
    expect(t('{{value, currency}}', { value: 1234567, currency: 'EUR' })).toEqual('€1,234,567');
  });
});
