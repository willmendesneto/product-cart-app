import { generateProduct } from '@test/fixtures/products';
import {
  mockQueryCleanup,
  mockQueryError,
  mockQueryLoading,
  mockQuerySuccess,
  renderWithQueryProvider,
} from '@test/testUtils';
import { fireEvent, screen, waitFor, within } from '@testing-library/react';
import i18next from 'i18next';
import { describe, expect, it } from 'vitest';

import { CART_LOCAL_STORAGE } from '@/constants';
import { Products } from '@/pages/Products';
import { useGetProducts } from '@/queries/products';

const t = i18next.t.bind(i18next);

vi.mock('@/queries/products', () => ({
  useGetProducts: vi.fn(),
}));

const products = generateProduct(5);
const cartProducts = products.slice(0, 2).reduce(
  (acc, product, index) => ({
    ...acc,
    [product.id]: { ...product, quantity: index + 1 },
  }),
  {},
);

const useGetProductsMock = useGetProducts as jest.Mock;

const setup = () => {
  localStorage.setItem(CART_LOCAL_STORAGE, JSON.stringify(cartProducts));

  renderWithQueryProvider(<Products />);
};

describe('Products', () => {
  beforeEach(() => {
    mockQuerySuccess(useGetProductsMock, { products });
  });

  afterEach(() => {
    mockQueryCleanup(useGetProductsMock);
    vi.resetAllMocks();
  });

  it('should render a loader if available products endpoint is on loading state', async () => {
    mockQueryLoading(useGetProductsMock);
    setup();

    await waitFor(() => {
      expect(screen.getByTestId('app-loader')).toBeInTheDocument();
    });
  });

  it('should render an empty message if products API returns empty', async () => {
    mockQuerySuccess(useGetProductsMock, { products: [] });
    setup();

    await waitFor(() => {
      expect(screen.getByText(`${t('products:noProductsFound')}`)).toBeInTheDocument();
    });
  });

  it('should render error message if API is down', async () => {
    mockQueryError(useGetProductsMock);
    setup();

    await waitFor(() => {
      expect(screen.getByText(`${t('products:apiError')}`)).toBeInTheDocument();
    });
  });

  it('should disable button if product is already on cart', async () => {
    setup();
    await waitFor(() => {
      expect(screen.getAllByTestId('product-item')).toHaveLength(products.length);
    });

    const [firstProduct, secondProduct] = screen.getAllByTestId('product-item');

    expect(within(firstProduct).getByRole('button')).toHaveAttribute('disabled');
    expect(within(secondProduct).getByRole('button')).toHaveAttribute('disabled');
  });

  it('should NOT disable button if product is NOT on cart', async () => {
    setup();
    await waitFor(() => {
      expect(screen.getAllByTestId('product-item')).toHaveLength(products.length);
    });

    const [_firstProduct, _secondProduct, ...otherProducts] = screen.getAllByTestId('product-item');

    for (const productItem of otherProducts) {
      expect(within(productItem).queryByRole('button')).not.toHaveAttribute('disabled');
    }
  });

  it('should disable Add to Cart button once the product is added to the cart', async () => {
    setup();

    const [firstItemButton] = await screen.findAllByRole('button');
    fireEvent.click(firstItemButton);

    expect(firstItemButton).toBeDisabled();
  });
});
