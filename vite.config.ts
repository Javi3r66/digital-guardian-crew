import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'

export default defineConfig({
  plugins: [
    TanStackRouterVite(),
    react(),
  ],
  resolve: {
    alias: {
      // Evita que el cliente intente cargar módulos nativos de Node.js
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
