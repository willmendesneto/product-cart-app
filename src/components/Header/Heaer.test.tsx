import { renderWithQueryProvider } from '@test/testUtils';
import { screen } from '@testing-library/react';
import i18next from 'i18next';
import { beforeEach, describe, expect, it } from 'vitest';

import { Header } from '@/components/Header';

const t = i18next.t.bind(i18next);

const setup = () => {
  renderWithQueryProvider(<Header />);
};

describe('Header', () => {
  beforeEach(() => {
    setup();
  });

  it('renders correctly the logo', () => {
    expect(screen.getByAltText(t('common:app'))).toBeInTheDocument();
  });

  it('renders the shopping cart widget', () => {
    expect(screen.getByAltText(t('common:goToCart'))).toBeInTheDocument();
  });
});
