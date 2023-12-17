
import { expect, afterEach, vi } from 'vitest'
import { cleanup } from '@testing-library/react'
import matchers from '@testing-library/jest-dom/matchers'
import { setLogger } from 'react-query';
import { setupI18n } from './src/lib/i18n';

void setupI18n()

// extends Vitest's expect method with methods from react-testing-library
expect.extend(matchers)


vi.stubGlobal('scrollTo', vi.fn())

setLogger({
  log: console.log,
  warn: console.warn,
  // ✅ no more errors on the console
  error: () => null,
});

// runs a cleanup after each test case (e.g. clearing jsdom)
afterEach(() => {
  cleanup()
})
