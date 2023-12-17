import { useQuery, UseQueryResult } from 'react-query';

import { USE_GET_PRODUCTS } from '@/constants';
import { Product } from '@/types/models';

const apiUrl = 'https://dummyjson.com';

// This config will fetch and retry only on page load and when it's not a 200 response
const reactQueryOptions = {
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
};

export interface GetProducts {
  products: Product[];
}

export const useGetProducts = (): UseQueryResult<GetProducts> =>
  useQuery([USE_GET_PRODUCTS], () => fetch(`${apiUrl}/products`).then((res) => res.json()), {
    ...reactQueryOptions,
  });
