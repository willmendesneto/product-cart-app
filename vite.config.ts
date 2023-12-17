import path from 'node:path';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import jsonServer from 'vite-plugin-simple-json-server';

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    build: {
      modulePreload: {
        polyfill: true,
      },
    },
    plugins: [
      react(),
      jsonServer({
        mockDir: 'mock',
        urlPrefixes: ['/api'],
      }),
    ],
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './setupTests.ts',
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@test': path.resolve(__dirname, './test'),
      },
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', 'scss', 'css'],
    },
  };
});
