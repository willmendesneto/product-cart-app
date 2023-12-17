import { Product } from '@/types/models';
import { faker } from '@faker-js/faker';
import {createFixtureGenerator} from '@test/createFixture';

export const generateProduct = createFixtureGenerator((overrides?: Partial<Product>): Product => ({
  id: faker.number.int(),
  title: faker.commerce.productName(),
  description: faker.commerce.productDescription(),
  images: [faker.internet.url()],
  rating: faker.number.int({ min: 5, max: 10 }),
  stock: faker.number.int({ min: 10, max: 30 }),
  price: faker.number.int({ min: 1000, max: 3000 }),
  discountPercentage: faker.number.int({ min: 0, max: 20 }),
  category: faker.helpers.arrayElement(['computer', 'cellphone']),
  // Enforcing here in purpose of be aligned with real data as much as possible
  brand: 'Samsung',
  thumbnail: faker.internet.url(),
  ...overrides,
}));
