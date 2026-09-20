import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      // Ignora la resolución en estático de librerías nativas de Capacitor en la Web
      external: [/^@capacitor\/.*/]
    }
  }
})
