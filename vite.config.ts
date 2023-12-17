import path from 'node:path';

import react from '@vitejs/plugin-react';
import { defineConfig, PluginOption } from 'vite';
import jsonServer from 'vite-plugin-simple-json-server';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const plugins: PluginOption[] = [react()];

  if (mode === 'development') {
    plugins.push(
      jsonServer({
        mockDir: 'mock',
        urlPrefixes: ['/api'],
      }),
    );
  }

  return {
    build: {
      modulePreload: {
        polyfill: true,
      },
    },
    plugins,
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
