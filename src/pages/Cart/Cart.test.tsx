import { generateProduct } from '@test/fixtures/products';
import { renderWithQueryProvider } from '@test/testUtils';
import { fireEvent, screen, within } from '@testing-library/react';
import i18next from 'i18next';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { CART_LOCAL_STORAGE } from '@/constants';
import { Cart } from '@/pages/Cart';
import { CartProduct } from '@/types/models';

const t = i18next.t.bind(i18next);

const products = generateProduct(2);
const cartProducts: Record<string, CartProduct> = products.reduce(
  (acc, product, index) => ({
    ...acc,
    [product.id]: { ...product, quantity: index + 1 },
  }),
  {},
);

const getTotalPrice = () => {
  const items: Record<string, CartProduct> = JSON.parse(localStorage.getItem(CART_LOCAL_STORAGE) || '{}');
  return Object.values(items || {}).reduce((accumulator, product) => accumulator + product.price * product.quantity, 0);
};

const setup = () => {
  localStorage.setItem(CART_LOCAL_STORAGE, JSON.stringify(cartProducts));
  renderWithQueryProvider(<Cart />);
};

describe('Cart', () => {
  beforeEach(() => {
    setup();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('renders force scroll to top on initial load', async () => {
    expect(window.scrollTo).toHaveBeenCalledTimes(1);
  });

  it('renders the quantity of products added the cart', async () => {
    expect(screen.getAllByTestId('cart-item')).toHaveLength(2);
  });

  it('should render the items from localStorage', () => {
    const cartItems = screen.getAllByTestId('cart-item');

    cartItems.forEach((cartItem, index) => {
      expect(within(cartItem).getByText(products[index].title)).toBeInTheDocument();
    });
  });

  it('removes products from the cart', async () => {
    const firstItem = within(screen.getAllByTestId('cart-item')[0]);

    expect(firstItem.getByText(products[0].title)).toBeInTheDocument();
    fireEvent.click(firstItem.getByRole('button', { name: t('common:minusSign') }));

    expect(screen.queryByText(products[0].title)).not.toBeInTheDocument();
  });

  it('updates the quantity of products in the cart', async () => {
    const firstItem = within(screen.getAllByTestId('cart-item')[0]);

    expect(firstItem.getByRole('spinbutton')).toHaveValue(1);
    expect(firstItem.getByText(products[0].title)).toBeInTheDocument();
    const value = getTotalPrice();
    expect(screen.getByText(t('cart:cartTotalLabel', { total: t('{{value, currency}}', { value }) }))).toBeVisible();

    fireEvent.click(firstItem.getByRole('button', { name: t('common:plusSign') }));

    const increasedTotalPrice = getTotalPrice();
    expect(firstItem.getByRole('spinbutton')).toHaveValue(2);
    expect(value !== increasedTotalPrice).toBe(true);
    expect(
      screen.getByText(t('cart:cartTotalLabel', { total: t('{{value, currency}}', { value: increasedTotalPrice }) })),
    ).toBeVisible();

    fireEvent.click(firstItem.getByRole('button', { name: t('common:minusSign') }));

    const decreasedTotalPrice = getTotalPrice();
    expect(value === decreasedTotalPrice).toBe(true);
    expect(
      screen.getByText(t('cart:cartTotalLabel', { total: t('{{value, currency}}', { value: decreasedTotalPrice }) })),
    ).toBeVisible();
  });

  it('calculates the total price correctly', () => {
    const value = getTotalPrice();
    expect(screen.getByText(t('cart:cartTotalLabel', { total: t('{{value, currency}}', { value }) }))).toBeVisible();
  });
});
