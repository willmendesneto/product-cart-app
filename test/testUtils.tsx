import { ReactNode } from 'react';
import { vi } from 'vitest'
import { renderHook } from '@testing-library/react';
import { QueryClientProvider, QueryClient } from 'react-query';
import { BrowserRouter } from 'react-router-dom';

import { render } from '@testing-library/react';

const createWrapper = (withRouter = false) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
      mutations: {
        retry: false,
      },
    },
  });
  return ({ children }: { children?: ReactNode }) => {
    return withRouter ? (
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      </BrowserRouter>
    ) : (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  };
};

export function testUseQuery<T>(
  hook: () => T,
) {
  return renderHook(() => hook(), { wrapper: createWrapper() });
}

export function mockFetchSuccess(response: unknown): void {
  vi.spyOn(global, 'fetch').mockImplementation(
    () =>
      Promise.resolve({
        ok: true,
        json: () => response,
      }) as Promise<Response>,
  );
}

export function mockServerException(statusText = 'failed'): void {
  vi.spyOn(global, 'fetch').mockResolvedValueOnce({
    ok: false,
    statusText,
  } as Response);
}

export function mockNetworkError(error: Error): void {
  vi.spyOn(global, 'fetch').mockRejectedValueOnce(error);
}

export function mockFetchCleanup(): void {
  vi.spyOn(global, 'fetch').mockRestore();
}

export function mockQueryLoading(useQueryHook: jest.Mock, appendToMockResult = {}): void {
  useQueryHook.mockImplementation(() => ({
    ...appendToMockResult,
    isLoading: true,
    isFetching: false,
    potato: true,
    error: null,
    data: undefined,
  }));
}

export function mockQueryError(useQueryHook: jest.Mock, error: any = {}): void {
  useQueryHook.mockImplementation(() => ({
    error,
    isLoading: false,
    isFetching: false,
    isError: true,
    data: undefined,
  }));
}

export function mockQuerySuccess(useQueryHook: jest.Mock, data: any): void {
  useQueryHook.mockImplementation(() => ({
    isLoading: false,
    isFetching: false,
    isSuccess: true,
    error: false,
    data,
  }));
}

export function mockMutationSuccess(useQueryHook: jest.Mock, data: any): void {
  useQueryHook.mockImplementation(({ onSuccess }) => ({
    mutateAsync: () => onSuccess(data),
    isSuccess: true,
    isLoading: false,
  }));
}

export function mockMutationLoading(useQueryHook: jest.Mock): void {
  useQueryHook.mockImplementation(() => ({
    mutateAsync: () => null,
    isSuccess: false,
    isLoading: true,
  }));
}

export function mockMutationError(useQueryHook: jest.Mock, error: any): void {
  useQueryHook.mockImplementation(({ onError }) => ({
    mutateAsync: () => onError(error),
    isSuccess: false,
    isLoading: false,
  }));
}

export function mockQueryCleanup(useQueryHook: jest.Mock): void {
  useQueryHook.mockImplementation(() => ({}));
}

export function renderWithQueryProvider(ui: JSX.Element) {
  return render(ui, { wrapper: createWrapper(true) });
}


/**
 * Higher order function that takes a method whose responsibility is to create a
 * **single** data fixture object and returns a new generator function that
 * allows you to create 1 or many of those fixtures. Fixture generator function
 * that's returned supports passing optional `num` and `overrides` params.
 *
 * @example
 *
 *    const generateInvoice = (overrides) => ({ id: uuid(), balance: 15799, classification: "Adult Use", ...overrides});
 *    const generateInvoices = createFixtureGenerator(generateInvoice);
 *
 *    generateInvoices()                    // => Single invoice object
 *    generateInvoices(1)                   // => Single invoice object
 *    generateInvoices(1, { foo: 'bar' })   // => Single invoice object, override `foo` to equal `'bar'`
 *    generateInvoices({ foo: 'bar' })      // => Single invoice object, override `foo` to equal `'bar'`
 *    generateInvoices(10)                  // => Array of 10 invoice objects
 *    generateInvoices(10, { foo: 'bar' })  // => Array of 10 invoice objects, override `foo` to equal `'bar'` in each
 *
 * @param fixtureFn - Method that generates a JSON data fixture.
 * @returns A fixture generator that return an array of fixture objects or single object if n = 1.
 */
export default function createFixtureGenerator<T>(fixtureFn: (overrides?: Partial<T>) => T) {
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
