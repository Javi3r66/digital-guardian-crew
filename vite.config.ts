import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      // Le indica a Rollup/Vite que ignore las librerías nativas de Capacitor durante la compilación web
      external: [
        /^@capacitor\/.*/,
      ],
    },
  },
});
