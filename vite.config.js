import { defineConfig } from 'vite';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

export default defineConfig({
  build: {
    outDir: 'dist', // <--- CORRECTED
    emptyOutDir: true
  },
  server: {
    host: '0.0.0.0',
    port: 5000,
    strictPort: true,
    allowedHosts: true
  },
  plugins: [
    ViteImageOptimizer(),
  ],
});