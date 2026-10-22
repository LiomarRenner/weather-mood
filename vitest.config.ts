import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitest/config'

// Pure-function tests only: no React Native runtime, no render tests
export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('.', import.meta.url).href),
    },
  },
  test: {
    environment: 'node',
    include: ['**/*.test.ts'],
    exclude: ['node_modules/**'],
  },
})
