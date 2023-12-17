import { generateProduct } from '@test/fixtures/products';
import { mockFetchSuccess, mockNetworkError, mockServerException, testUseQuery } from '@test/testUtils';
import { waitFor } from '@testing-library/react';

import { GetProducts, useGetProducts } from '@/queries/products';

const product = generateProduct();

const getProductsResponse: GetProducts = {
  products: [product],
};

afterEach(() => {
  vi.resetAllMocks();
});

describe('useGetProducts', () => {
  it('handles mutate async request with no errors if mutation receives specified value', async () => {
    mockFetchSuccess(getProductsResponse);

    const { result } = testUseQuery(() => useGetProducts());

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.isError).toBe(false);
    expect(result.current.data).toBeDefined();
  });

  it('handles request error when calling API', async () => {
    mockServerException('API Error');
    const { result } = testUseQuery(() => useGetProducts());

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.isSuccess).toBe(false);
    expect(result.current.data).not.toBeDefined();
  });

  it('handles network error when calling API', async () => {
    mockNetworkError(new Error('network error'));
    const { result } = testUseQuery(() => useGetProducts());

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.isSuccess).toBe(false);
    expect(result.current.data).not.toBeDefined();
  });
});
