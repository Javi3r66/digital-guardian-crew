import { defineConfig } from 'vite'
import { TanStackStartVite } from '@tanstack/start-vite-plugin'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [
    TanStackStartVite(),
    tsconfigPaths(),
  ],
})
