/**
 * The API response is mapped. However, some fields are not mapped at this stage:
 *
 * - discountPercentage
 * - rating
 * - stock
 */
export interface Product {
  id: number;
  description: string;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  images: string[];
  title: string;
  price: number;
  thumbnail: string;
}

export interface CartProduct extends Product {
  quantity: number;
}

export type CartOperation = 'decrease' | 'increase';
