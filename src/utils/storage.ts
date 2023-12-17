import useLocalStorageState from 'use-local-storage-state';

import { CART_LOCAL_STORAGE } from '@/constants';
import { CartProduct } from '@/types/models';

export interface CartProps {
  [productId: string]: CartProduct;
}

export const useCartStorage = () => {
  return useLocalStorageState<CartProps>(CART_LOCAL_STORAGE, {});
};
