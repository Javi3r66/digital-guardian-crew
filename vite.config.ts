import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
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
    },
  },
  ssr: {
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
  },
});
