/**
 * Higher order function that takes a method whose responsibility is to create a
 * **single** data fixture object and returns a new generator function that
 * allows you to create 1 or many of those fixtures. Fixture generator function
 * that's returned supports passing optional `num` and `overrides` params.
 *
 * @example
 *
 *    const generateProduct = (overrides) => ({ id: 15799, ...overrides});
 *    const generateProducts = createFixture(generateProduct);
 *
 *    generateProducts()                    // => Single invoice object
 *    generateProducts(1)                   // => Single invoice object
 *    generateProducts(1, { foo: 'bar' })   // => Single invoice object, override `foo` to equal `'bar'`
 *    generateProducts({ foo: 'bar' })      // => Single invoice object, override `foo` to equal `'bar'`
 *    generateProducts(10)                  // => Array of 10 invoice objects
 *    generateProducts(10, { foo: 'bar' })  // => Array of 10 invoice objects, override `foo` to equal `'bar'` in each
 *
 * @param fixtureFn - Method that generates a JSON data fixture.
 * @returns A fixture generator that return an array of fixture objects or single object if n = 1.
 */
export function createFixtureGenerator<T>(fixtureFn: (overrides?: Partial<T>) => T) {
  function _generator(): T;
  function _generator<TNum extends 1>(num: TNum, overrides?: Partial<T>): T;
  function _generator(num: Partial<T>): T;
  function _generator<TNum extends number>(num: TNum, overrides?: Partial<T>): T[];
  function _generator(num: number | Partial<T> = 1, overrides = {}) {
    // if the first param is not a number, it must be the overrides
    if (typeof num !== 'number') {
      return fixtureFn(num);
    } else if (num === 1) {
      // If num is 1, then we don't want to return an array, so just generate one with any potential overrides
      return fixtureFn(overrides);
    } else {
      // Otherwise, let's generate however many requested data objects
      // eslint-disable-next-line prefer-spread
      return Array.apply(null, Array(num)).map(() => fixtureFn(overrides));
    }
  }

  return _generator;
}
