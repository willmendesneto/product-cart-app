import { renderWithQueryProvider } from '@test/testUtils';
import { screen } from '@testing-library/react';
import i18next from 'i18next';
import { describe, expect, it } from 'vitest';

import { TotalPrice } from '@/components/TotalPrice';

const t = i18next.t.bind(i18next);

describe('TotalPrice', () => {
  it('renders correctly total price amount formatted as GBP, e.g. £100.23', async () => {
    const amount = 10000.23;
    renderWithQueryProvider(<TotalPrice amount={amount} />);
    expect(
      screen.getByText(t('cart:cartTotalLabel', { total: t('{{value, currency}}', { value: amount }) })),
    ).toBeVisible();
  });
});
