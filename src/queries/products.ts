import { useQuery, UseQueryResult } from 'react-query';

import { API_URL, USE_GET_PRODUCTS } from '@/constants';
import { Product } from '@/types/models';

// This config will fetch and retry only on page load and when it's not a 200 response
const reactQueryOptions = {
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
};

export interface GetProducts {
  products: Product[];
}

export const useGetProducts = (): UseQueryResult<GetProducts> =>
  useQuery([USE_GET_PRODUCTS], () => fetch(`${API_URL}/products`).then((res) => res.json()), {
    ...reactQueryOptions,
  });
