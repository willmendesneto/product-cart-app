import { renderWithQueryProvider } from '@test/testUtils';
import { screen } from '@testing-library/react';
import i18next from 'i18next';
import { describe, expect, it } from 'vitest';

import { NotFound } from '@/pages/NotFound/NotFound';

const t = i18next.t.bind(i18next);

describe('NotFound', () => {
  it('should render a message to the user', () => {
    renderWithQueryProvider(<NotFound />);
    expect(screen.getByText(`${t('common:titleNotFound')}`)).toBeInTheDocument();
  });
});
