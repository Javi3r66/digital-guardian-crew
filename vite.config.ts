import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      // Ignora los paquetes nativos de Capacitor durante la compilación Web en Vercel
      external: [
        /^@capacitor\/.*/,
      ],
    },
  },
});
