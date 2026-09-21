import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';

export default defineConfig({
  plugins: [
    TanStackRouterVite(),
    react(),
  ],
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
