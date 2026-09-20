import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: [/^@capacitor\/.*/],
    },
  },
  ssr: {
    // Evita que el paquete SSR de TanStack Start intente procesar o empaquetar Capacitor
    external: [
      '@capacitor/core',
      '@capacitor/haptics',
      '@capacitor/preferences',
      '@capacitor/camera',
      '@capacitor/geolocation',
      '@capacitor/push-notifications',
      '@capacitor/status-bar',
      '@capacitor/keyboard',
    ],
    noExternal: [],
  },
});
