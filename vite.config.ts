import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import path from 'path'

export default defineConfig({
  plugins: [
    TanStackRouterVite(),
    react(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'node:async_hooks': 'unenv/runtime/mock/empty',
      'async_hooks': 'unenv/runtime/mock/empty',
    },
  },
  build: {
    rollupOptions: {
      external: ['node:async_hooks', 'async_hooks'],
    },
  },
})
