import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      // Ignora todos los paquetes nativos de Capacitor durante la compilación web en Vercel
      external: [/^@capacitor\/.*/]
    }
  }
})
