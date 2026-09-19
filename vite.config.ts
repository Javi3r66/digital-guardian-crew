import { defineConfig } from 'vite'
import { TanStackStartVite } from '@tanstack/react-start/vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [
    TanStackStartVite(),
    tsconfigPaths(),
  ],
})
