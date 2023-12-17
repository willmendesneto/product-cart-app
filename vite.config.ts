import { defineConfig } from 'vite'
import path from 'node:path'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './setupTests.ts',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      "@test": path.resolve(__dirname, './test'),
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', 'scss', 'css']
  }
})
