import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      // Permite que Vite complete el empaquetado web aunque falte alguna API nativa de móvil
      external: [/^@capacitor\/(?!core).*/]
    }
  }
})
