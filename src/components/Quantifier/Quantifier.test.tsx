import { renderWithQueryProvider } from '@test/testUtils';
import { screen } from '@testing-library/react';
import i18next from 'i18next';
import { beforeEach, describe, expect, it } from 'vitest';

import { Quantifier } from '@/components/Quantifier';

const t = i18next.t.bind(i18next);

const setup = () => {
  const handleClick = vi.fn();
  renderWithQueryProvider(
    <Quantifier handleUpdateQuantity={handleClick} productId={1} removeProductCallback={handleClick} />,
  );
};

describe('Quantifier', () => {
  beforeEach(() => {
    setup();
  });

  it('should render required fields correctly', () => {
    expect(screen.getByText(t('common:minusSign'))).toBeInTheDocument();
    expect(screen.getByText(t('common:plusSign'))).toBeInTheDocument();
    expect(screen.getByRole('spinbutton')).toHaveValue(1);
  });
});
