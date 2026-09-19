import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  base: "/",
  plugins: [
    TanStackRouterVite(),
    react(),
    tsconfigPaths(),
  ],
  build: {
    rollupOptions: {
      external: ["node:async_hooks"],
    },
  },
  ssr: {
    external: ["node:async_hooks"],
  },
});
