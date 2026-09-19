import { defineConfig } from 'vite'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [
    TanStackRouterVite(),
    tsconfigPaths(),
  ],
  build: {
    rollupOptions: {
      external: [
        'node:async_hooks',
      ],
    },
  },
  ssr: {
    noExternal: ['@tanstack/start-storage-context'],
  },
})
