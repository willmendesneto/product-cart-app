import { renderWithQueryProvider } from '@test/testUtils';
import { fireEvent, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Basket } from '@/components/Basket';

const setup = (productsCount = 0) => {
  renderWithQueryProvider(<Basket productsCount={productsCount} />);
};

const navigate = vi.fn();

vi.mock('react-router-dom', async (importOriginal) => {
  return {
    ...(await importOriginal<Record<string, unknown>>()),
    useNavigate: vi.fn(() => navigate),
  };
});

describe('Basket', () => {
  it('renders correctly when no products are added to the cart', async () => {
    setup();
    expect(screen.getByTestId('products-count').textContent).toBe('0');
  });

  it('renders correctly when products are added to the cart', () => {
    setup(3);
    expect(screen.getByTestId('products-count').textContent).toBe('3');
  });

  it('should go to the cart page when clicked', () => {
    setup(3);

    expect(navigate).not.toHaveBeenCalled();

    fireEvent.click(screen.getByRole('button'));

    expect(navigate).toHaveBeenNthCalledWith(1, '/cart');
  });
});
