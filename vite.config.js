import { defineConfig } from 'vite';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

export default defineConfig({
  build: {
    // This is true by default when outDir is inside root, but it's fine to be explicit.
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