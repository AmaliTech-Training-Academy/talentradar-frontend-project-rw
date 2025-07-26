import { defineConfig } from 'vitest/config'
import path from 'path';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: 'vitest.setup.ts',
    include: ['**/*.{test,spec}.{ts,tsx}'],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./"), // Change to "./" if your root is not /src
    },
  }
});